import { readFile } from "node:fs/promises";
import path from "node:path";
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

  const fonts = isAr
    ? [
        {
          name: "Cairo",
          data: await readFile(path.join(fontsDir, "Cairo-Bold.ttf")),
          weight: 700 as const,
          style: "normal" as const,
        },
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
        <div
          style={{
            fontSize: 96,
            fontWeight: isAr ? 700 : 800,
            color: "#E5E7EB",
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          {name}
        </div>
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
      </div>
    ),
    { ...size, fonts },
  );
}
