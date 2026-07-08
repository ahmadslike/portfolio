import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import type { CaseStudySlug } from "@/content/case-studies";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import Reveal from "@/components/ui/Reveal";
import type { LocalizedText } from "@/types/project";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(caseStudies).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const isAr = locale === "ar";
  const ogLocale = isAr ? "ar_AR" : "en_US";
  const title = project.title;
  const description = project.tagline[isAr ? "ar" : "en"];
  const url = `${SITE_URL}/${locale}/work/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        en: `/en/work/${slug}`,
        ar: `/ar/work/${slug}`,
        "x-default": `/en/work/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Ahmad Slik",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/${locale}/opengraph-image`],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = caseStudies[slug as CaseStudySlug];
  if (!study) notFound();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isAr = locale === "ar";
  const t = (text: LocalizedText) => text[isAr ? "ar" : "en"];
  const cs = await getTranslations("caseStudy");

  const paragraphs = (text: string) => text.split("\n\n").filter(Boolean);

  return (
    <main className="pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {cs("back")}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {project.tagline[isAr ? "ar" : "en"]}
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="size-4" />
                {cs("liveDemo")}
              </a>
            )}
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-card transition-colors"
            >
              <GitHubIcon className="size-4" />
              {cs("code")}
            </a>
          </div>

          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5 mt-6">
            {study.stack.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </header>

        {/* Stats */}
        <Reveal>
          <section aria-label={cs("stats")} className="mb-16">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {cs("stats")}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {study.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {t(stat.label)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Problem */}
        <Reveal>
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t(study.problem.heading)}
            </h2>
            {paragraphs(t(study.problem.body)).map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </section>
        </Reveal>

        {/* Approach */}
        <Reveal>
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t(study.approach.heading)}
            </h2>
            {paragraphs(t(study.approach.body)).map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}

            {/* Agents */}
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-10 mb-4">
              {cs("agents")}
            </p>
            <ol className="space-y-5">
              {study.agents.map((agent, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary-text font-semibold text-sm shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">
                      {t(agent.name)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {t(agent.role)}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Decisions */}
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-10 mb-4">
              {cs("decisions")}
            </p>
            <ul className="space-y-4">
              {study.decisions.map((decision, i) => (
                <li key={i}>
                  <div className="font-semibold text-foreground">
                    {t(decision.title)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t(decision.description)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Result */}
        <Reveal>
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t(study.result.heading)}
            </h2>
            {paragraphs(t(study.result.body)).map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}

            {/* Capabilities */}
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-8 mb-4">
              {cs("capabilities")}
            </p>
            <ul className="space-y-3">
              {study.capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">
                    {t(cap)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Highlights */}
        <Reveal>
          <section className="mb-16 border-t border-border pt-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {cs("highlights")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {study.highlights.map((hl, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-5"
                >
                  <div className="font-semibold text-foreground">
                    {t(hl.title)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {t(hl.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Page footer row */}
        <div className="border-t border-border pt-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {cs("back")}
          </Link>
          <div className="flex flex-wrap gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="size-4" />
                {cs("liveDemo")}
              </a>
            )}
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-card transition-colors"
            >
              <GitHubIcon className="size-4" />
              {cs("code")}
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
