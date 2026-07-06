import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "intelligent-research-assistant",
    title: "Intelligent Research Assistant",
    status: "live",
    featured: true,
    tagline: {
      en: "AI research tool that turns any topic or PDF into a structured, cited report — built on a 5-agent RAG pipeline.",
      ar: "أداة بحث AI تحوّل أي موضوع أو ملف PDF إلى تقرير مُنظّم وموثّق — مبنية على pipeline من 5 وكلاء RAG.",
    },
    stack: [
      "Python",
      "FastAPI",
      "ChromaDB",
      "sentence-transformers",
      "Next.js",
      "OpenRouter",
      "Railway",
      "Netlify",
    ],
    links: {
      live: "https://research-assistant-ai.netlify.app",
      github: "https://github.com/Ahmadslike/intelligent-research-assistant",
    },
    result: {
      en: "~3000× faster on cached queries",
      ar: "أسرع بـ ~3000 مرة على الاستعلامات المخزّنة",
    },
  },
  {
    slug: "arabi-rtl-for-claude",
    title: "Arabi RTL for Claude",
    status: "shipped",
    featured: false,
    tagline: {
      en: "Open-source Chrome extension that fixes Arabic right-to-left display in Claude AI — for Arabic users worldwide.",
      ar: "إضافة Chrome مفتوحة المصدر تصلّح عرض العربية من اليمين لليسار في Claude AI — لمستخدمي العربية حول العالم.",
    },
    stack: ["Manifest V3", "Vanilla JS", "MutationObserver", "Service Workers"],
    links: {
      github: "https://github.com/Ahmadslike/arabi-rtl-for-claude",
    },
  },
];
