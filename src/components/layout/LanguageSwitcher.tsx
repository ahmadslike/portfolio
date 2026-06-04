"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const targetLocale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className="border border-border text-muted-foreground hover:text-foreground px-3 py-1 rounded text-xs transition-colors"
    >
      {t("langSwitch")}
    </Link>
  );
}
