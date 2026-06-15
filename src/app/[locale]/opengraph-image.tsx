import { ImageResponse } from "next/og";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ahmad Slik — AI Builder & Founder";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#0B0F19",
          padding: "80px",
          fontFamily: "system-ui",
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
            fontWeight: 800,
            color: "#E5E7EB",
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          Ahmad Slik
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "#6366F1",
            marginBottom: 24,
          }}
        >
          AI Builder &amp; Founder
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#9CA3AF",
          }}
        >
          17 · Building production AI, in public.
        </div>
      </div>
    ),
    { ...size },
  );
}
