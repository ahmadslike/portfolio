export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ProjectLink {
  live?: string;
  github: string;
}

export interface Project {
  slug: string;
  title: string;
  status: "live" | "shipped";
  featured: boolean;
  tagline: LocalizedText;
  // Short display list for the project card badges. The case-study page
  // has its own fuller `CaseStudy.stack` (see content/case-studies/*) —
  // these are different granularities, not duplicates.
  stack: string[];
  links: ProjectLink;
  result?: LocalizedText;
}
