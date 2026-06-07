import type { MetadataRoute } from "next";

const SITE = "https://ahmadslik.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alternates = {
    languages: { en: `${SITE}/en`, ar: `${SITE}/ar` },
  };
  return [
    { url: `${SITE}/en`, lastModified, alternates },
    { url: `${SITE}/ar`, lastModified, alternates },
  ];
}
