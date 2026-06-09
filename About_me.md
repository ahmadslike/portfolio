# Ahmad Slik — AI Builder & Founder

> 17-year-old AI builder shipping real, production-grade AI products — not collecting certificates. I design and build RAG and multi-agent systems end-to-end, from architecture to live deployment, and I document the whole journey in public.

<!-- MAINTENANCE: Whenever I ship something or hit a milestone, update this file. If it's portfolio-worthy, it earns a place in Projects / What Makes Me Different. Raw chronological detail goes to Journey_log.md, never here. -->

## Snapshot
- **Name:** Ahmad Slik (أحمد سليق)
- **Age:** 17
- **Location:** Damascus, Syria
- **Status:** High-school senior (final month), building full-time.
- **Languages:** Arabic (native) · English (professional)
- **Mission:** Build an AI company within 12 months. Mastery first — income follows.

## About
I'm a self-directed AI builder. Over a focused 30-day build I designed, shipped, and released (v2.0.0) a live multi-agent RAG system that anyone can use over the internet, and I've shipped an open-source Chrome extension alongside it. I work planning-first — architecture before code — and I care more about understanding *why* something works than copy-pasting *how*. I ship in public, daily, and I'd rather build real things people use than collect credentials.

## Tech & Skills
**AI / LLM**
- RAG (Retrieval-Augmented Generation) systems — embeddings, semantic search, chunking with overlap, vector caching
- Multi-agent orchestration — designed and shipped a 5-agent pipeline
- Prompt engineering · OpenRouter (multi-model routing + fallback) · AsyncOpenAI
- Claude Code (**Intermediate**) — CLAUDE.md, Plan Mode, Sub-agents, Skills, Hooks, MCPs, Slash Commands

**Backend**
- Python — async/await, type hints, Pydantic, venv workflow
- FastAPI (**Beginner→Intermediate**, one production project) — StreamingResponse, AsyncGenerator, middleware, CORS, APIRouter

**Web / Frontend**
- Next.js (App Router, Server Components) · TypeScript (strict) · Tailwind CSS · shadcn/ui · Motion
- Internationalization (next-intl) — bilingual Arabic RTL / English LTR using CSS logical properties
- Programmatic SEO — per-locale metadata, Open Graph images, sitemap with hreflang
- Accessibility-aware motion (prefers-reduced-motion), responsive, performance-minded

**Data / Vector**
- ChromaDB — collections, embeddings, semantic search, key-value caching · sentence-transformers (incl. multilingual)

**DevOps / Tooling**
- Git / GitHub (**advanced**) · Railway · Netlify · Linux (Fedora)
- Chrome Extension development — Manifest V3, Vanilla JS, MutationObserver, Service Workers

## Projects

### 1 · Intelligent Research Assistant — *flagship · live · v2.0.0*
An AI research tool that takes any topic — or an uploaded PDF — and returns a structured, cited, academic-style report built from real sources. Built and released over a 30-day public build.
- **Architecture:** RAG + a 5-agent pipeline — Researcher → Reader → Analyst → Writer → FactChecker, with graceful degradation (an optional stage fails silently instead of crashing the request)
- **What it does:** pulls real Wikipedia sources (Arabic + English), caches them in a vector store, and produces a 6-section report (Abstract, Introduction, Main Findings, Contradictions & Debates, Conclusion, References) with numbered citations — streamed token-by-token (SSE) into an Arabic-first RTL UI
- **PDF mode:** upload a PDF and research strictly against its own content (per-document vector filtering — no cross-contamination)
- **Engineering highlights:** per-agent model routing with automatic fallback · parallel source reading (asyncio.gather) · two-level caching (LRU embeddings + 10-min result cache) plus a Wikipedia cache that cut repeat queries ~33s → 0.01s (~3000×) · SSE streaming behind a reverse proxy · 10 REST endpoints · zero-downtime deploys
- **Stack:** Python 3.14 · FastAPI · ChromaDB · sentence-transformers · Next.js 16 (Turbopack) · OpenRouter · Railway + Netlify
- **Live:** https://research-assistant-ai.netlify.app
- **Code:** https://github.com/Ahmadslike/intelligent-research-assistant

### 2 · Arabi RTL for Claude — *shipped, open-source*
A Chrome Extension (v1.2.0, MIT) that fixes Arabic text display in Claude AI by automatically applying correct right-to-left direction — solving a real problem for Arabic-speaking users worldwide.
- **Features:** automatic RTL detection, mixed Arabic/English support, code blocks preserved as LTR, Dark/Light themes, 4 Arabic fonts, Reading Mode, Copy Cleaner, keyboard shortcut, bilingual UI
- **Built:** full cycle (idea → design → code → docs → public release) in a single session
- **Code:** https://github.com/Ahmadslike/arabi-rtl-for-claude

## What Makes Me Different
- 17 and shipping **real production AI products**, not tutorials — two shipped so far (a released v2.0.0 multi-agent RAG system + an open-source Chrome extension)
- **Ship > certificates.** I learn by building things people can actually use.
- **Planning-first discipline** — I set the architecture before writing code
- **Build in Public** — full daily transparency on my process and mistakes
- I ask *why*, not just *how* — I refuse to copy-paste without understanding
- Full-stack range — from Python AI backends to the bilingual, accessible front-end of this very site, built from scratch

## The Build — 30 days, shipped daily
I built the Intelligent Research Assistant in public over 30 days — shipping something every single day and documenting the journey on LinkedIn.

- **Foundation** — From idea to a working RAG API
- **The 5 Agents** — A pipeline orchestrating 5 specialized agents
- **Going Live** — Deployed on Railway + Netlify, live for anyone
- **Real Sources** — Wikipedia (Arabic + English) + caching, 3000× faster on repeat queries
- **PDF Intelligence** — Upload a PDF and research inside its content
- **Streaming + Polish** — SSE token streaming + an Arabic-first RTL UI
- **v2.0.0** — 10 endpoints, released

Documented daily on LinkedIn: https://linkedin.com/in/ahmad-slik-99661840b

## Contact
- **Email:** ahmadslike1@gmail.com
- **GitHub:** https://github.com/Ahmadslike
- **LinkedIn:** https://linkedin.com/in/ahmad-slik-99661840b
- **X:** https://x.com/Ahmad_slik
- **Mostaql:** Ahmadslike
- **Portfolio:** https://ahmadslik.netlify.app

---

## 📥 Inbox
> Staging buffer — append-only. New facts land here, then get routed on cleanup: portfolio-worthy facts move up into the sections above; raw chronological/engineering detail moves to Journey_log.md; this Inbox is then emptied.
> Append format: `- [YYYY-MM-DD] [type] description in English`

<!-- entries land below this line -->
