import type { SkillCategory } from "@/types/skills";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    labelKey: "skills.categories.ai",
    skills: [
      "RAG Systems",
      "Multi-Agent Orchestration",
      "Prompt Engineering",
      "OpenRouter",
      "AsyncOpenAI",
      "Embeddings & Semantic Search",
    ],
  },
  {
    id: "backend",
    labelKey: "skills.categories.backend",
    skills: ["Python", "FastAPI", "Pydantic", "asyncio"],
  },
  {
    id: "frontend",
    labelKey: "skills.categories.frontend",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "RTL UI"],
  },
  {
    id: "data",
    labelKey: "skills.categories.data",
    skills: [
      "ChromaDB",
      "sentence-transformers",
      "Vector Search",
      "LRU Caching",
    ],
  },
  {
    id: "devops",
    labelKey: "skills.categories.devops",
    skills: [
      "Git / GitHub",
      "Railway",
      "Netlify",
      "Linux Fedora",
      "Chrome Extension MV3",
      "Claude Code",
    ],
  },
];
