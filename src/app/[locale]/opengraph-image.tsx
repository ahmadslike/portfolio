import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ImageResponse } from "next/og";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import enMessages from "@/messages/en.json";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// `alt` must be a static export (per-locale function form isn't supported
// for this file convention), so it's composed from the English copy in
// messages/en.json to stay bilingual-safe rather than hardcoded.
export const alt = `${enMessages.hero.headline} — ${enMessages.hero.eyebrow}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const fontsDir = path.join(process.cwd(), "src/assets/fonts");

// ---------------------------------------------------------------------------
// Arabic shaping (HarfBuzz/WASM)
//
// satori (the layout engine behind next/og's ImageResponse) does no Arabic
// text shaping — Arabic letters get drawn in isolated form and in the wrong
// (unreversed) order. To fix this for the /ar OG image we shape the Arabic
// copy ourselves at build time with HarfBuzz, turn the shaped glyphs into SVG
// paths, and embed them as data-URI <img> elements instead of raw text nodes.
// The EN locale is untouched and keeps rendering as plain satori text.
//
// harfbuzzjs only publishes its self-initializing package entry via
// package.json "exports" (which resolves its own .wasm relative to
// import.meta.url). To make wasm resolution deterministic under Next's build
// bundling (and safe to run on a Netlify build machine), we locate the
// package's shipped `dist/` folder on disk ourselves (see `loadHarfBuzz` for
// why that isn't done via `require.resolve`), read the .wasm file directly,
// and hand it to the raw Emscripten loader via the `wasmBinary` option — no
// implicit path guessing involved. Because that public package entry doesn't
// expose the low-level glyph/shaping primitives we need (only its own
// pre-initialized Blob/Face/Font/Buffer helpers), we talk to the raw wasm
// exports directly through a small typed wrapper below.
// ---------------------------------------------------------------------------

interface HbExports {
  malloc(size: number): number;
  free(ptr: number): void;
  hb_blob_create(
    dataPtr: number,
    length: number,
    mode: number,
    userData: number,
    destroy: number,
  ): number;
  hb_face_create(blobPtr: number, index: number): number;
  hb_face_get_upem(facePtr: number): number;
  hb_font_create(facePtr: number): number;
  hb_font_get_h_extents(fontPtr: number, extentsPtr: number): number;
  hb_buffer_create(): number;
  hb_buffer_add_utf16(
    bufferPtr: number,
    textPtr: number,
    textLength: number,
    itemOffset: number,
    itemLength: number,
  ): void;
  hb_buffer_set_direction(bufferPtr: number, direction: number): void;
  hb_buffer_set_script(bufferPtr: number, script: number): void;
  hb_buffer_guess_segment_properties(bufferPtr: number): void;
  hb_script_from_string(strPtr: number, len: number): number;
  hb_shape(
    fontPtr: number,
    bufferPtr: number,
    featuresPtr: number,
    featuresLen: number,
  ): void;
  hb_buffer_get_length(bufferPtr: number): number;
  hb_buffer_get_glyph_infos(bufferPtr: number, lengthPtr: number): number;
  hb_buffer_get_glyph_positions(bufferPtr: number, lengthPtr: number): number;
  hb_draw_funcs_create(): number;
  hb_draw_funcs_set_move_to_func(
    ptr: number,
    fn: number,
    userData: number,
    destroy: number,
  ): void;
  hb_draw_funcs_set_line_to_func(
    ptr: number,
    fn: number,
    userData: number,
    destroy: number,
  ): void;
  hb_draw_funcs_set_cubic_to_func(
    ptr: number,
    fn: number,
    userData: number,
    destroy: number,
  ): void;
  hb_draw_funcs_set_quadratic_to_func(
    ptr: number,
    fn: number,
    userData: number,
    destroy: number,
  ): void;
  hb_draw_funcs_set_close_path_func(
    ptr: number,
    fn: number,
    userData: number,
    destroy: number,
  ): void;
  hb_font_draw_glyph(
    fontPtr: number,
    glyphId: number,
    drawFuncsPtr: number,
    drawData: number,
  ): void;
}

type HbCallback = (...args: number[]) => number | void;

interface HbModule {
  wasmExports: HbExports;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAP32: Int32Array;
  HEAPU32: Uint32Array;
  addFunction(fn: HbCallback, signature: string): number;
}

type CreateHarfBuzz = (options: { wasmBinary: Uint8Array }) => Promise<HbModule>;

const HB_DIRECTION_LTR = 4;
const HB_DIRECTION_RTL = 5;
const HB_MEMORY_MODE_DUPLICATE = 0;

async function loadHarfBuzz(): Promise<HbModule> {
  // `require.resolve("harfbuzzjs")` (via `createRequire`) is the documented
  // way to locate a package's real on-disk entry, but under this project's
  // Turbopack build it is intercepted unconditionally: a literal specifier
  // gets rewritten to Turbopack's own internal numeric module id (not a
  // filesystem path — confirmed by inspecting the resolved value at build
  // time), and a non-literal/computed specifier hard-fails the build with
  // "Cannot find module as expression is too dynamic". Neither form can
  // reach real Node module resolution from here, with or without the
  // `turbopackIgnore` magic comment (which only affects dynamic `import()`
  // bundling, not `require.resolve`). We fall back to a plain filesystem
  // path: pnpm always creates a `node_modules/harfbuzzjs` symlink for a
  // direct dependency (which harfbuzzjs now is), so this is a reliable,
  // non-module-resolution way to locate the package's shipped `dist/`
  // folder (containing both the wasm binary and its Emscripten loader) and
  // `readFile`/dynamic-`import()` it directly.
  const distDir = path.join(process.cwd(), "node_modules/harfbuzzjs/dist");
  const wasmBinary = new Uint8Array(
    await readFile(path.join(distDir, "harfbuzz.wasm")),
  );
  const loaderUrl = pathToFileURL(path.join(distDir, "harfbuzz.js")).href;
  const { default: createHarfBuzz } = (await import(
    /* turbopackIgnore: true */ loaderUrl
  )) as {
    default: CreateHarfBuzz;
  };
  return createHarfBuzz({ wasmBinary });
}

function writeUtf16(hb: HbModule, text: string): { ptr: number; length: number } {
  const ptr = hb.wasmExports.malloc(text.length * 2);
  const words = hb.HEAPU16.subarray(ptr / 2, ptr / 2 + text.length);
  for (let i = 0; i < text.length; i += 1) words[i] = text.charCodeAt(i);
  return { ptr, length: text.length };
}

function writeAsciiZ(hb: HbModule, text: string): number {
  const ptr = hb.wasmExports.malloc(text.length + 1);
  for (let i = 0; i < text.length; i += 1) hb.HEAPU8[ptr + i] = text.charCodeAt(i);
  hb.HEAPU8[ptr + text.length] = 0;
  return ptr;
}

interface HbFont {
  ptr: number;
  upem: number;
}

function loadHbFont(hb: HbModule, fontData: Buffer): HbFont {
  const dataPtr = hb.wasmExports.malloc(fontData.byteLength);
  hb.HEAPU8.set(fontData, dataPtr);
  // DUPLICATE mode: HarfBuzz copies the bytes into its own buffer, so our
  // temporary allocation can be freed immediately afterwards.
  const blobPtr = hb.wasmExports.hb_blob_create(
    dataPtr,
    fontData.byteLength,
    HB_MEMORY_MODE_DUPLICATE,
    0,
    0,
  );
  hb.wasmExports.free(dataPtr);
  const facePtr = hb.wasmExports.hb_face_create(blobPtr, 0);
  const upem = hb.wasmExports.hb_face_get_upem(facePtr);
  const fontPtr = hb.wasmExports.hb_font_create(facePtr);
  return { ptr: fontPtr, upem };
}

function getFontExtents(hb: HbModule, font: HbFont) {
  const ptr = hb.wasmExports.malloc(16);
  hb.wasmExports.hb_font_get_h_extents(font.ptr, ptr);
  const ascender = hb.HEAP32[ptr / 4];
  const descender = hb.HEAP32[ptr / 4 + 1];
  const lineGap = hb.HEAP32[ptr / 4 + 2];
  hb.wasmExports.free(ptr);
  return { ascender, descender, lineGap };
}

// --- Minimal bidi run splitting ---------------------------------------------
// HarfBuzz shapes a buffer uniformly in one direction; it doesn't run the
// Unicode Bidi Algorithm. Our Arabic copy embeds Latin/digit substrings ("AI",
// "17") that must NOT be reversed the way a whole-buffer RTL shape would
// reverse them. We split the text into per-script runs, shape each run in its
// own direction, then lay the runs out right-to-left in logical order — since
// HarfBuzz always returns a run's glyphs in left-to-right *drawing* order
// (regardless of the run's shaping direction), this reproduces correct visual
// order without a full bidi reordering pass.
//
// Neutral characters (spaces, the em dash, punctuation) get their own
// dedicated run rather than being folded into whichever strong run happens
// to be "open" at that point. A neutral run's placement is unambiguous
// (single/symmetric glyphs, direction doesn't affect how they render) and
// slotting it in as an independent run between its two neighbors is what
// makes the boundary gap land exactly once, in the right place: merging a
// neutral into an RTL run's trailing edge and into the following LTR run's
// trailing edge (as an earlier version of this function did) double-counts
// the gap on one side of an embedded LTR run ("AI") and drops it on the
// other, since HarfBuzz places an RTL run's *last-typed* character at its
// own visual left while an (unreversed) LTR run's last-typed character sits
// at its own visual right.

type RunDirection = "rtl" | "ltr";
interface BidiRun {
  text: string;
  direction: RunDirection;
}

// Arabic, Arabic Supplement, Arabic Extended-A, Arabic Presentation Forms A/B.
const ARABIC_CHAR =
  /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const LATIN_OR_DIGIT_CHAR = /[A-Za-z0-9]/;

type CharClass = RunDirection | "neutral";

function classifyChar(ch: string): CharClass {
  if (ARABIC_CHAR.test(ch)) return "rtl";
  if (LATIN_OR_DIGIT_CHAR.test(ch)) return "ltr";
  return "neutral";
}

function splitBidiRuns(text: string): BidiRun[] {
  const runs: BidiRun[] = [];
  let currentClass: CharClass | null = null;
  let currentText = "";
  const flush = () => {
    if (currentText.length === 0) return;
    // A neutral-only run has no intrinsic direction; default to RTL (the
    // paragraph's base direction) purely to pick a shaping buffer direction
    // — symmetric runs like a bare space or dash render identically either way.
    const direction: RunDirection = currentClass === "ltr" ? "ltr" : "rtl";
    runs.push({ text: currentText, direction });
  };
  for (const ch of text) {
    const cls = classifyChar(ch);
    if (cls !== currentClass) {
      flush();
      currentClass = cls;
      currentText = ch;
    } else {
      currentText += ch;
    }
  }
  flush();
  return runs;
}

interface ShapedGlyph {
  glyphId: number;
  x: number;
  y: number;
}
interface ShapedRun {
  width: number;
  glyphs: ShapedGlyph[];
}

function shapeRun(hb: HbModule, font: HbFont, run: BidiRun): ShapedRun {
  const bufferPtr = hb.wasmExports.hb_buffer_create();
  const { ptr: textPtr, length } = writeUtf16(hb, run.text);
  hb.wasmExports.hb_buffer_add_utf16(bufferPtr, textPtr, length, 0, length);
  hb.wasmExports.hb_buffer_set_direction(
    bufferPtr,
    run.direction === "rtl" ? HB_DIRECTION_RTL : HB_DIRECTION_LTR,
  );
  if (run.direction === "rtl") {
    const scriptPtr = writeAsciiZ(hb, "Arab");
    const scriptTag = hb.wasmExports.hb_script_from_string(scriptPtr, 4);
    hb.wasmExports.hb_buffer_set_script(bufferPtr, scriptTag);
    hb.wasmExports.free(scriptPtr);
  }
  hb.wasmExports.hb_buffer_guess_segment_properties(bufferPtr);
  hb.wasmExports.hb_shape(font.ptr, bufferPtr, 0, 0);

  const glyphCount = hb.wasmExports.hb_buffer_get_length(bufferPtr);
  const infosPtr = hb.wasmExports.hb_buffer_get_glyph_infos(bufferPtr, 0);
  const positionsPtr = hb.wasmExports.hb_buffer_get_glyph_positions(bufferPtr, 0);
  const infos = hb.HEAPU32.subarray(infosPtr / 4, infosPtr / 4 + glyphCount * 5);
  const positions = hb.HEAP32.subarray(
    positionsPtr / 4,
    positionsPtr / 4 + glyphCount * 5,
  );

  const glyphs: ShapedGlyph[] = [];
  let penX = 0;
  let penY = 0;
  for (let i = 0; i < glyphCount; i += 1) {
    const glyphId = infos[i * 5];
    const xAdvance = positions[i * 5];
    const yAdvance = positions[i * 5 + 1];
    const xOffset = positions[i * 5 + 2];
    const yOffset = positions[i * 5 + 3];
    glyphs.push({ glyphId, x: penX + xOffset, y: penY + yOffset });
    penX += xAdvance;
    penY += yAdvance;
  }

  hb.wasmExports.free(textPtr);
  return { width: penX, glyphs };
}

function measureWidthPx(
  hb: HbModule,
  font: HbFont,
  text: string,
  fontSizePx: number,
): number {
  const scale = fontSizePx / font.upem;
  const total = splitBidiRuns(text).reduce(
    (sum, run) => sum + shapeRun(hb, font, run).width,
    0,
  );
  return total * scale;
}

function wrapTagline(
  hb: HbModule,
  font: HbFont,
  text: string,
  fontSizePx: number,
  maxWidthPx: number,
): string[] {
  const words = text.split(" ");
  const spaceWidthPx = measureWidthPx(hb, font, " ", fontSizePx);
  const lines: string[] = [];
  let current: string[] = [];
  let currentWidth = 0;
  for (const word of words) {
    const wordWidth = measureWidthPx(hb, font, word, fontSizePx);
    const extra = current.length === 0 ? wordWidth : spaceWidthPx + wordWidth;
    if (current.length > 0 && currentWidth + extra > maxWidthPx) {
      lines.push(current.join(" "));
      current = [word];
      currentWidth = wordWidth;
    } else {
      current.push(word);
      currentWidth += extra;
    }
  }
  if (current.length > 0) lines.push(current.join(" "));
  return lines;
}

// --- Glyph outline -> SVG path -----------------------------------------------

interface DrawState {
  path: string;
  originX: number;
  originY: number;
  scale: number;
  baseline: number;
}

function createDrawFuncs(hb: HbModule, state: DrawState): number {
  const fx = (x: number) => ((state.originX + x) * state.scale).toFixed(2);
  const fy = (y: number) => (state.baseline - (state.originY + y) * state.scale).toFixed(2);

  const moveTo: HbCallback = (_df, _dd, _ds, toX: number, toY: number) => {
    state.path += `M${fx(toX)} ${fy(toY)}`;
  };
  const lineTo: HbCallback = (_df, _dd, _ds, toX: number, toY: number) => {
    state.path += `L${fx(toX)} ${fy(toY)}`;
  };
  const cubicTo: HbCallback = (
    _df,
    _dd,
    _ds,
    c1x: number,
    c1y: number,
    c2x: number,
    c2y: number,
    toX: number,
    toY: number,
  ) => {
    state.path += `C${fx(c1x)} ${fy(c1y)} ${fx(c2x)} ${fy(c2y)} ${fx(toX)} ${fy(toY)}`;
  };
  const quadTo: HbCallback = (
    _df,
    _dd,
    _ds,
    cx: number,
    cy: number,
    toX: number,
    toY: number,
  ) => {
    state.path += `Q${fx(cx)} ${fy(cy)} ${fx(toX)} ${fy(toY)}`;
  };
  const closePath: HbCallback = () => {
    state.path += "Z";
  };

  const moveToPtr = hb.addFunction(moveTo, "viiiffi");
  const lineToPtr = hb.addFunction(lineTo, "viiiffi");
  const cubicToPtr = hb.addFunction(cubicTo, "viiiffffffi");
  const quadToPtr = hb.addFunction(quadTo, "viiiffffi");
  const closePathPtr = hb.addFunction(closePath, "viiii");

  const drawFuncsPtr = hb.wasmExports.hb_draw_funcs_create();
  hb.wasmExports.hb_draw_funcs_set_move_to_func(drawFuncsPtr, moveToPtr, 0, 0);
  hb.wasmExports.hb_draw_funcs_set_line_to_func(drawFuncsPtr, lineToPtr, 0, 0);
  hb.wasmExports.hb_draw_funcs_set_cubic_to_func(drawFuncsPtr, cubicToPtr, 0, 0);
  hb.wasmExports.hb_draw_funcs_set_quadratic_to_func(drawFuncsPtr, quadToPtr, 0, 0);
  hb.wasmExports.hb_draw_funcs_set_close_path_func(drawFuncsPtr, closePathPtr, 0, 0);
  return drawFuncsPtr;
}

interface ShapedImage {
  dataUri: string;
  widthPx: number;
  heightPx: number;
}

function shapeToImage(
  hb: HbModule,
  font: HbFont,
  drawFuncsPtr: number,
  state: DrawState,
  text: string,
  fontSizePx: number,
  color: string,
): ShapedImage {
  const shapedRuns = splitBidiRuns(text).map((run) => shapeRun(hb, font, run));
  const totalWidthFontUnits = shapedRuns.reduce((sum, run) => sum + run.width, 0);
  const { ascender, descender, lineGap } = getFontExtents(hb, font);
  const scale = fontSizePx / font.upem;
  const baseline = ascender * scale;
  const heightPx = (ascender - descender) * scale;
  const widthPx = Math.max(totalWidthFontUnits * scale, 1);

  state.path = "";
  state.scale = scale;
  state.baseline = baseline;

  // Runs are laid out right-to-left in logical order: the first-read run
  // sits at the right edge, each subsequent run is placed further left.
  let cursor = totalWidthFontUnits;
  for (const run of shapedRuns) {
    const originXBase = cursor - run.width;
    for (const glyph of run.glyphs) {
      state.originX = originXBase + glyph.x;
      state.originY = glyph.y;
      hb.wasmExports.hb_font_draw_glyph(font.ptr, glyph.glyphId, drawFuncsPtr, 0);
    }
    cursor -= run.width;
  }

  void lineGap; // exposed for future use (line-to-line stacking); Cairo reports 0.

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${widthPx.toFixed(2)} ${heightPx.toFixed(2)}" width="${widthPx.toFixed(2)}" height="${heightPx.toFixed(2)}"><path d="${state.path}" fill="${color}"/></svg>`;
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return { dataUri, widthPx, heightPx };
}

interface ArabicAssets {
  nameImage: ShapedImage;
  taglineImages: ShapedImage[];
}

async function buildArabicAssets(
  nameText: string,
  taglineText: string,
): Promise<ArabicAssets> {
  const hb = await loadHarfBuzz();
  const [boldData, regularData] = await Promise.all([
    readFile(path.join(fontsDir, "Cairo-Bold.ttf")),
    readFile(path.join(fontsDir, "Cairo-Regular.ttf")),
  ]);
  const boldFont = loadHbFont(hb, boldData);
  const regularFont = loadHbFont(hb, regularData);

  const state: DrawState = { path: "", originX: 0, originY: 0, scale: 1, baseline: 0 };
  const drawFuncsPtr = createDrawFuncs(hb, state);

  const nameImage = shapeToImage(
    hb,
    boldFont,
    drawFuncsPtr,
    state,
    nameText,
    96,
    "#E5E7EB",
  );

  const taglineLines = wrapTagline(hb, regularFont, taglineText, 28, 1040);
  const taglineImages = taglineLines.map((line) =>
    shapeToImage(hb, regularFont, drawFuncsPtr, state, line, 28, "#9CA3AF"),
  );

  return { nameImage, taglineImages };
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });

  const isAr = locale === "ar";
  const name = t("headline");
  const secondary = t("eyebrow");
  const tagline = t("tagline");
  const fontFamily = isAr ? "Cairo" : "Geist";

  const arabicAssets = isAr ? await buildArabicAssets(name, tagline) : null;

  const fonts = isAr
    ? [
        {
          name: "Cairo",
          data: await readFile(path.join(fontsDir, "Cairo-Regular.ttf")),
          weight: 400 as const,
          style: "normal" as const,
        },
      ]
    : [
        {
          name: "Geist",
          data: await readFile(path.join(fontsDir, "Geist-Regular.ttf")),
          weight: 400 as const,
          style: "normal" as const,
        },
      ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // Yoga's flex-start/flex-end for a column container's cross axis is
          // physical, not writing-mode aware — flip it explicitly for RTL so
          // the accent bar and text sit on the reading-start (right) side.
          alignItems: isAr ? "flex-end" : "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#0B0F19",
          padding: "80px",
          fontFamily,
          direction: isAr ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            width: 64,
            height: 6,
            backgroundColor: "#6366F1",
            borderRadius: 3,
            marginBottom: 32,
          }}
        />
        {isAr && arabicAssets ? (
          <img
            src={arabicAssets.nameImage.dataUri}
            width={arabicAssets.nameImage.widthPx}
            height={arabicAssets.nameImage.heightPx}
            alt=""
            style={{ marginBottom: 16 }}
          />
        ) : (
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#E5E7EB",
              letterSpacing: -2,
              marginBottom: 16,
            }}
          >
            {name}
          </div>
        )}
        <div
          style={{
            fontSize: 48,
            fontWeight: isAr ? 400 : 600,
            color: "#6366F1",
            marginBottom: 24,
          }}
        >
          {secondary}
        </div>
        {isAr && arabicAssets ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            {arabicAssets.taglineImages.map((image, index) => (
              <img
                key={index}
                src={image.dataUri}
                width={image.widthPx}
                height={image.heightPx}
                alt=""
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              fontSize: 28,
              color: "#9CA3AF",
              maxWidth: 1040,
              textAlign: isAr ? "right" : "left",
            }}
          >
            {tagline}
          </div>
        )}
      </div>
    ),
    { ...size, fonts },
  );
}
