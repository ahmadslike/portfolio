import type { SkillCategory } from "@/types/skills";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    labelKey: "categories.ai",
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
    labelKey: "categories.backend",
    skills: ["Python", "FastAPI", "Pydantic", "asyncio"],
  },
  {
    id: "frontend",
    labelKey: "categories.frontend",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "RTL UI"],
  },
  {
    id: "data",
    labelKey: "categories.data",
    skills: [
      "ChromaDB",
      "sentence-transformers",
      "Vector Search",
      "LRU Caching",
    ],
  },
  {
    id: "devops",
    labelKey: "categories.devops",
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
