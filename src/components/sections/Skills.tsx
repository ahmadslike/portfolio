import { useTranslations } from "next-intl";
import { skillCategories } from "@/content/skills";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {t("label")}
        </p>
        <h2 className="text-3xl font-bold text-foreground mb-12">
          {t("heading")}
        </h2>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.id}>
              <p className="text-sm font-medium text-foreground mb-4">
                {t(cat.labelKey)}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
