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
  stack: string[];
  links: ProjectLink;
  result?: LocalizedText;
}
