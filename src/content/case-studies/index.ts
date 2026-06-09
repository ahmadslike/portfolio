import { intelligentResearchAssistant } from "./intelligent-research-assistant";

export const caseStudies = {
  "intelligent-research-assistant": intelligentResearchAssistant,
} as const;

export type CaseStudySlug = keyof typeof caseStudies;
