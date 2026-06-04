import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmad — AI Builder",
  description: "Personal portfolio of Ahmad, AI builder.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const isAr = locale === "ar";
  const fontVars = isAr
    ? cairo.variable
    : `${geistSans.variable} ${geistMono.variable}`;
  const sansVar = isAr ? "var(--font-cairo)" : "var(--font-geist-sans)";

  return (
    <html
      lang={locale}
      dir={isAr ? "rtl" : "ltr"}
      className={`dark ${fontVars} h-full`}
      style={{ "--font-sans": sansVar } as React.CSSProperties}
    >
      <body className="flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
