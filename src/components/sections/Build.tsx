import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { milestones } from "@/content/build";

export default function Build() {
  const t = useTranslations("build");
  const locale = useLocale() as "en" | "ar";

  return (
    <section id="the-build" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {t("label")}
        </p>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {t("heading")}
        </h2>
        <p className="text-sm text-muted-foreground mb-10">
          {t("subline")}
        </p>

        {/* border-s + ms-3: logical rail — left in LTR, right in RTL (first use of logical CSS in codebase) */}
        <ol className="relative border-s border-border ms-3 space-y-8">
          {milestones.map((m) => (
            <li key={m.id} className="relative ps-8">
              {/* start-[-6px] centers the 12px dot over the 1px rail — flips automatically in RTL */}
              <span
                className="absolute start-[-6px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background"
                aria-hidden
              />
              <h3 className="text-base font-semibold text-foreground">
                {m.title[locale]}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {m.result[locale]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
