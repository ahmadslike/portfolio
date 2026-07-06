import type en from "@/messages/en.json";

type SkillCategoryKey = keyof typeof en.skills.categories;

export interface SkillCategory {
  id: string;
  labelKey: `categories.${SkillCategoryKey}`;
  skills: string[];
}
