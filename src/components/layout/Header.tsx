"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "backdrop-blur-sm bg-background/80 border-b border-border"
          : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {t("logo")}
        </span>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.about")}
            </a>
            <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.work")}
            </a>
            <a href="#the-build" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.theBuild")}
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.contact")}
            </a>
          </nav>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-sm border-b border-border"
        >
          <nav className="flex flex-col">
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              {t("nav.about")}
            </a>
            <a
              href="#work"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              {t("nav.work")}
            </a>
            <a
              href="#the-build"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              {t("nav.theBuild")}
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              {t("nav.contact")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
