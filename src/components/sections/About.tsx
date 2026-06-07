import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section id="about" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row md:items-center gap-10 md:gap-16">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {t("heading")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t("bio")}
          </p>
        </div>
        <div className="shrink-0">
          <Image
            src="/ahmad.png"
            alt={locale === "ar" ? "أحمد سليق" : "Ahmad Slik"}
            width={240}
            height={240}
            className="rounded-2xl border border-border object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
