import type { ComponentType } from "react";
import { Briefcase } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/BrandIcons";

export interface SocialLink {
  id: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const socialLinks: SocialLink[] = [
  { id: "github",   href: "https://github.com/Ahmadslike",                   icon: GitHubIcon },
  { id: "linkedin", href: "https://linkedin.com/in/ahmad-slik-99661840b",    icon: LinkedInIcon },
  { id: "x",        href: "https://x.com/Ahmad_slik",                        icon: XIcon },
  { id: "mostaql",  href: "https://mostaql.com/u/Ahmadslike",                icon: Briefcase },
];
