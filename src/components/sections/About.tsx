import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
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
    </section>
  );
}
