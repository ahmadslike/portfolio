import type { LocalizedText } from "@/types/project";

export interface Milestone {
  id: string;
  title: LocalizedText;
  result: LocalizedText;
}
