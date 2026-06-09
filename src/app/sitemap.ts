import type { MetadataRoute } from "next";

const SITE = "https://ahmadslik.netlify.app";

const caseStudySlugs = ["intelligent-research-assistant"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const homeAlternates = {
    languages: { en: `${SITE}/en`, ar: `${SITE}/ar` },
  };

  const homeRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/en`, lastModified, alternates: homeAlternates },
    { url: `${SITE}/ar`, lastModified, alternates: homeAlternates },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudySlugs.flatMap(
    (slug) => {
      const alts = {
        languages: {
          en: `${SITE}/en/work/${slug}`,
          ar: `${SITE}/ar/work/${slug}`,
        },
      };
      return [
        { url: `${SITE}/en/work/${slug}`, lastModified, alternates: alts },
        { url: `${SITE}/ar/work/${slug}`, lastModified, alternates: alts },
      ];
    },
  );

  return [...homeRoutes, ...caseStudyRoutes];
}
