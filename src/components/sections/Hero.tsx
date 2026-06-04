"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="min-h-svh flex items-center"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.2245 0.0326 267.99) 0%, transparent 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-24">
        <motion.p
          className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {t("headline")}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-card transition-colors"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
