import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const SITE = SITE_URL;

const caseStudySlugs = ["intelligent-research-assistant"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const homeAlternates = {
    languages: {
      en: `${SITE}/en`,
      ar: `${SITE}/ar`,
      "x-default": `${SITE}/en`,
    },
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
          "x-default": `${SITE}/en/work/${slug}`,
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
