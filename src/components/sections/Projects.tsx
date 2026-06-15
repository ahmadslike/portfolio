import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";

export default function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="work" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {t("label")}
        </p>
        <h2 className="text-3xl font-bold text-foreground mb-12">
          {t("heading")}
        </h2>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
