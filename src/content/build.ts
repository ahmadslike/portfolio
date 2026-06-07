import type { Milestone } from "@/types/milestone";

export const milestones: Milestone[] = [
  {
    id: "foundation",
    title: { en: "Foundation", ar: "الأساس" },
    result: {
      en: "From idea to a working RAG API.",
      ar: "من فكرة إلى RAG API يعمل.",
    },
  },
  {
    id: "agents",
    title: { en: "The 5 Agents", ar: "الوكلاء الخمسة" },
    result: {
      en: "A pipeline orchestrating 5 specialized agents.",
      ar: "pipeline ينسّق 5 وكلاء متخصّصين.",
    },
  },
  {
    id: "going-live",
    title: { en: "Going Live", ar: "الإطلاق" },
    result: {
      en: "Deployed on Railway + Netlify, live for anyone.",
      ar: "نُشر على Railway و Netlify، متاح للجميع عبر الإنترنت.",
    },
  },
  {
    id: "real-sources",
    title: { en: "Real Sources", ar: "مصادر حقيقية" },
    result: {
      en: "Wikipedia (Arabic + English) with caching — 3000× faster on repeat queries.",
      ar: "Wikipedia (عربي + إنجليزي) مع cache — أسرع 3000× في الاستعلامات المتكررة.",
    },
  },
  {
    id: "pdf-intelligence",
    title: { en: "PDF Intelligence", ar: "ذكاء PDF" },
    result: {
      en: "Upload a PDF and research strictly inside its content.",
      ar: "رفع PDF والبحث داخل محتواه فقط.",
    },
  },
  {
    id: "streaming-polish",
    title: { en: "Streaming + Polish", ar: "بثّ وصقل" },
    result: {
      en: "Token-by-token SSE streaming into an Arabic-first RTL UI.",
      ar: "SSE streaming توكن بتوكن في واجهة RTL عربية أولاً.",
    },
  },
  {
    id: "v2",
    title: { en: "v2.0.0", ar: "الإصدار v2.0.0" },
    result: {
      en: "10 endpoints, released.",
      ar: "10 endpoints، مُطلق رسمياً.",
    },
  },
];
