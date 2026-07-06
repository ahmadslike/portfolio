import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/types/project";
import { caseStudies } from "@/content/case-studies";
import { Link } from "@/i18n/navigation";

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const locale = useLocale() as "en" | "ar";
  const hasCaseStudy = project.slug in caseStudies;

  const visibleStack = project.stack.slice(0, 5);
  const hiddenCount = project.stack.length - visibleStack.length;

  const statusClass =
    project.status === "live"
      ? "bg-[var(--success)]/15 text-[var(--success)]"
      : "bg-primary/15 text-primary";

  return (
    <article className="group rounded-xl border border-border bg-card p-6 flex flex-col gap-4 h-full hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${statusClass}`}>
          {t(`status.${project.status}`)}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.tagline[locale]}
      </p>

      {project.result && (
        <p className="text-sm font-medium text-primary leading-relaxed">
          {project.result[locale]}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {visibleStack.map((s) => (
          <span
            key={s}
            className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground"
          >
            {s}
          </span>
        ))}
        {hiddenCount > 0 && (
          <span className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground">
            +{hiddenCount}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 mt-auto">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            {t("viewLive")}
          </a>
        )}
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          {t("viewCode")}
        </a>
        {hasCaseStudy && (
          <Link
            href={`/work/${project.slug}`}
            className="text-sm text-foreground hover:text-primary hover:underline inline-flex items-center gap-1 ms-auto"
          >
            {t("viewCaseStudy")} →
          </Link>
        )}
      </div>
    </article>
  );
}
