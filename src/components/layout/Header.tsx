"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTION_IDS = ["about", "work", "the-build", "contact"] as const;
type SectionId = typeof SECTION_IDS[number];

export default function Header() {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const intersecting = useRef(new Set<string>());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.current.add(entry.target.id);
          } else {
            intersecting.current.delete(entry.target.id);
          }
        }
        setActiveId(
          SECTION_IDS.find((id) => intersecting.current.has(id)) ?? null
        );
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navClass = (id: SectionId) =>
    `text-sm transition-colors ${
      activeId === id
        ? "text-foreground font-medium"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-sm bg-background/95 border-border"
          : "border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {t("logo")}
        </span>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/#about" className={navClass("about")}>
              {t("nav.about")}
            </Link>
            <Link href="/#work" className={navClass("work")}>
              {t("nav.work")}
            </Link>
            <Link href="/#the-build" className={navClass("the-build")}>
              {t("nav.theBuild")}
            </Link>
            <Link href="/#contact" className={navClass("contact")}>
              {t("nav.contact")}
            </Link>
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
            <Link
              href="/#about"
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 hover:bg-card ${navClass("about")}`}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/#work"
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 hover:bg-card ${navClass("work")}`}
            >
              {t("nav.work")}
            </Link>
            <Link
              href="/#the-build"
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 hover:bg-card ${navClass("the-build")}`}
            >
              {t("nav.theBuild")}
            </Link>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 hover:bg-card ${navClass("contact")}`}
            >
              {t("nav.contact")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
