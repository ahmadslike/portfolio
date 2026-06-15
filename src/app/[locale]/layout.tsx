import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const ogLocale = locale === "ar" ? "ar_AR" : "en_US";
  const url = `/${locale}`;

  return {
    metadataBase: new URL("https://ahmadslik.netlify.app"),
    title: { default: t("title"), template: `%s · Ahmad Slik` },
    description: t("description"),
    alternates: {
      canonical: url,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "Ahmad Slik",
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

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
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
