// src/content/case-studies/intelligent-research-assistant.ts
//
// محتوى الـ case study لمشروع Intelligent Research Assistant.
// كل النصوص ثنائية اللغة (LocalizedText من types/project).
// المصدر: ملف المدرب — كل رقم موثّق، لا تخمين ولا تضخيم.
//
// ⚠️ قاعدتان لا تُكسران:
// 1. رقم الـ 3000× مشروط بكلمة "المتكرّر/repeat" — لا تشيل القيد من أي مكان.
// 2. ما في رابط فيديو demo — لا تضف سطر فيديو (broken link).

import type { LocalizedText } from "@/types/project";

export interface CaseStudyAgent {
  name: LocalizedText;      // اسم الوكيل (مثلاً Researcher / الباحث)
  role: LocalizedText;      // وظيفته بجملة
}

export interface CaseStudyStat {
  value: string;            // الرقم نفسه (مثلاً "~3000×") — لغة-محايد
  label: LocalizedText;     // وصف الرقم
}

export interface CaseStudyHighlight {
  title: LocalizedText;     // اسم مختصر
  description: LocalizedText;
}

export interface CaseStudySection {
  heading: LocalizedText;
  body: LocalizedText;
}

export interface CaseStudy {
  slug: string;             // يطابق slug المشروع في projects.ts
  // — Problem —
  problem: CaseStudySection;
  // — Approach —
  approach: CaseStudySection;       // الفكرة الأساسية + "ليش 5 وكلاء"
  agents: CaseStudyAgent[];         // الـ 5 agents بالترتيب
  decisions: CaseStudyHighlight[];  // القرارات التقنية (RAG, routing, caching...)
  // — Result —
  result: CaseStudySection;         // before/after + ما يقدر يعمله
  capabilities: LocalizedText[];    // قدرات ملموسة (bullets)
  stats: CaseStudyStat[];           // الأرقام الموثّقة (stat cards)
  // — Highlights —
  highlights: CaseStudyHighlight[];
  // — Stack —
  stack: string[];                  // التقنيات (لغة-محايد)
}

export const intelligentResearchAssistant: CaseStudy = {
  slug: "intelligent-research-assistant",

  problem: {
    heading: { en: "The Problem", ar: "المشكلة" },
    body: {
      en: "Getting a trustworthy, well-sourced answer on any topic is still slow and risky. Ask a plain chatbot and it will write fluent paragraphs — but it routinely invents citations and references that don't exist, so you can't trust a word without re-checking everything yourself. Run a Google search instead and you get a pile of links, not an answer — you still have to read, filter, and synthesize it all by hand. And if you work in Arabic, the gap is wider: structured, cited, academic-style research output is far harder to come by.\n\nThe people who feel this most are students, researchers, and knowledge workers — especially Arabic-speaking ones — who need a structured report they can actually cite and defend, not a confident guess. They often need to dig inside a specific document — a paper, a textbook chapter, a long PDF — and ask questions against its actual content, with citations that are real and traceable to a source and a page. An invented reference isn't just useless; it's dangerous.",
      ar: "الحصول على إجابة موثوقة ومدعومة بمصادر حول أي موضوع لا يزال بطيئاً ومحفوفاً بالمخاطر. اسأل روبوت محادثة عادياً، وسيكتب فقرات سلسة — لكنه يختلق باستمرار اقتباسات ومراجع غير موجودة، فلا يمكنك الوثوق بأي معلومة دون إعادة التحقق منها بنفسك. وإن بحثت في جوجل بدلاً من ذلك، تحصل على كومة روابط، لا على إجابة — ويبقى عليك قراءتها وتصفيتها وتجميعها يدوياً. وإن كنت تعمل بالعربية، فالفجوة أوسع: المخرجات البحثية المنظمة والموثّقة بأسلوب أكاديمي أصعب توفّراً بكثير.\n\nأكثر من يعاني من هذا هم الطلاب والباحثون وأصحاب الأعمال المعرفية — وخصوصاً الناطقين بالعربية — ممّن يحتاجون تقريراً منظّماً يمكنهم الاستشهاد به والدفاع عنه فعلاً، لا مجرد تخمين واثق. وكثيراً ما يحتاجون البحث داخل مستند محدّد — بحث، فصل من كتاب، ملف PDF طويل — وطرح أسئلة على محتواه الفعلي، باقتباسات حقيقية قابلة للتتبّع إلى مصدرها وصفحتها. المرجع المختلَق ليس عديم الفائدة فحسب، بل خطير.",
    },
  },

  approach: {
    heading: { en: "The Approach", ar: "المقاربة" },
    body: {
      en: "The core idea: don't trust a single AI call to do everything. Ground the system in real retrieved sources (RAG), then split the work across specialized agents — each doing one job well — and end with a verification pass before anything reaches the user.\n\nWhy five agents instead of one prompt: a single mega-prompt can't reliably check its own work, and it's far more prone to hallucination. Splitting the job means each stage is specialized and easier to make reliable — and crucially, the FactChecker gives the system a verification step a single call simply can't perform on itself. The pipeline is also built with graceful degradation: an optional stage can fail quietly instead of crashing the whole request.",
      ar: "الفكرة الأساسية: لا تثق باستدعاء ذكاء اصطناعي واحد ليقوم بكل شيء. ثبّت النظام على مصادر حقيقية مُسترجَعة (RAG)، ثم وزّع العمل على وكلاء متخصصين — كلٌّ يتقن مهمة واحدة — واختم بمرحلة تحقّق قبل أن يصل أي شيء إلى المستخدم.\n\nلماذا خمسة وكلاء بدل أمر واحد: لا يمكن لأمر واحد ضخم أن يتحقق من عمله بموثوقية، وهو أكثر عرضة بكثير للهلوسة. تقسيم العمل يجعل كل مرحلة متخصصة وأسهل في ضبط موثوقيتها — والأهم أن المدقّق يمنح النظام خطوة تحقّق لا يستطيع استدعاء واحد أداءها على نفسه. كما بُني الخط على مبدأ التدهور الآمن (graceful degradation): يمكن لمرحلة اختيارية أن تتعطّل بهدوء بدل أن تُسقط الطلب بالكامل.",
    },
  },

  agents: [
    {
      name: { en: "Researcher", ar: "الباحث" },
      role: {
        en: "Finds and pulls real sources for the topic (Arabic + English Wikipedia), or scopes the work strictly to an uploaded PDF.",
        ar: "يجد ويجلب مصادر حقيقية للموضوع (ويكيبيديا عربي + إنجليزي)، أو يحصر العمل حصراً ضمن ملف PDF مرفوع.",
      },
    },
    {
      name: { en: "Reader", ar: "القارئ" },
      role: {
        en: "Ingests those sources, splits them into overlapping chunks, and stores them in a vector store so they become searchable by meaning, not just keywords.",
        ar: "يستوعب تلك المصادر، يقسّمها إلى مقاطع متداخلة، ويخزّنها في قاعدة بيانات متجهية لتصبح قابلة للبحث بالمعنى لا بالكلمات المفتاحية فقط.",
      },
    },
    {
      name: { en: "Analyst", ar: "المحلّل" },
      role: {
        en: "Works across the gathered material to extract the key findings and surface where sources disagree (contradictions and debates).",
        ar: "يعمل عبر المادة المجمّعة لاستخلاص أهم النتائج وإبراز مواضع اختلاف المصادر (التناقضات والنقاشات).",
      },
    },
    {
      name: { en: "Writer", ar: "الكاتب" },
      role: {
        en: "Composes the structured, six-section report with numbered citations tied back to the real sources.",
        ar: "يصوغ التقرير المنظّم المكوّن من ستة أقسام، مع اقتباسات مرقّمة مرتبطة بالمصادر الحقيقية.",
      },
    },
    {
      name: { en: "FactChecker", ar: "المدقّق" },
      role: {
        en: "Verifies the drafted claims against the retrieved sources before the report is finalized. This is the trust layer.",
        ar: "يتحقق من ادعاءات المسودة مقابل المصادر المسترجَعة قبل اعتماد التقرير. هذه هي طبقة الثقة.",
      },
    },
  ],

  decisions: [
    {
      title: { en: "RAG — grounding in real sources", ar: "RAG — التثبيت على مصادر حقيقية" },
      description: {
        en: "Directly attacks the hallucination problem — citations point to sources that actually exist, not invented ones.",
        ar: "يهاجم مشكلة الهلوسة مباشرةً — الاقتباسات تشير إلى مصادر موجودة فعلاً، لا مختلَقة.",
      },
    },
    {
      title: { en: "Multi-model routing + automatic fallback", ar: "توجيه متعدّد النماذج + تبديل تلقائي" },
      description: {
        en: "Each agent can use an appropriate model (via OpenRouter), and if one model or provider fails, the system falls back automatically instead of going down — reliability plus cost control, running on free models.",
        ar: "يستطيع كل وكيل استخدام نموذج مناسب (عبر OpenRouter)، وإن تعطّل نموذج أو مزوّد، يتحوّل النظام تلقائياً بدل أن يتوقف — موثوقية وتحكّم بالتكلفة، يعمل على نماذج مجانية.",
      },
    },
    {
      title: { en: "Two-level caching", ar: "تخزين مؤقت من مستويين" },
      description: {
        en: "Repeated work returns near-instantly instead of being recomputed — a major speed and cost win.",
        ar: "يعيد العمل المتكرر بشكل شبه فوري بدل إعادة حسابه — مكسب كبير في السرعة والتكلفة.",
      },
    },
    {
      title: { en: "Token-by-token streaming (SSE)", ar: "البثّ كلمة بكلمة (SSE)" },
      description: {
        en: "The report appears live as it's written, so the user sees progress immediately instead of staring at a spinner.",
        ar: "يظهر التقرير حيّاً أثناء كتابته، فيرى المستخدم التقدّم فوراً بدل انتظار مؤشّر تحميل.",
      },
    },
    {
      title: { en: "Per-document isolation for PDF mode", ar: "عزل كل مستند في وضع الـ PDF" },
      description: {
        en: "Research stays strictly inside the uploaded document, with no cross-contamination from other files — scoped, trustworthy answers.",
        ar: "يبقى البحث حصراً داخل المستند المرفوع، دون تداخل مع ملفات أخرى — إجابات محصورة وموثوقة.",
      },
    },
  ],

  result: {
    heading: { en: "The Result", ar: "النتيجة" },
    body: {
      en: "Before: search manually, read many sources, synthesize by hand — and still not know whether an AI's citations are real. After: one topic (or one PDF) in → a structured, cited report out, grounded in real sources, passed through a verification stage, in an Arabic-first UI. Live and usable by anyone over the internet.",
      ar: "قبل: بحث يدوي، قراءة مصادر كثيرة، تجميع باليد — ومع ذلك لا تعرف إن كانت اقتباسات الذكاء الاصطناعي حقيقية. بعد: موضوع واحد (أو ملف PDF واحد) يدخل ← تقرير منظّم وموثّق يخرج، مثبَّت على مصادر حقيقية، مرّ عبر مرحلة تحقّق، في واجهة عربية أولاً. حيّ ومتاح لأي شخص عبر الإنترنت.",
    },
  },

  capabilities: [
    {
      en: "Take any topic and return a structured, cited, academic-style report drawn from real sources.",
      ar: "يأخذ أي موضوع ويُعيد تقريراً منظّماً موثّقاً بأسلوب أكاديمي مستمدّاً من مصادر حقيقية.",
    },
    {
      en: "Take an uploaded PDF and research strictly inside its own content.",
      ar: "يأخذ ملف PDF مرفوعاً ويبحث حصراً داخل محتواه.",
    },
    {
      en: "Pull bilingual sources — Arabic and English Wikipedia.",
      ar: "يجلب مصادر ثنائية اللغة — ويكيبيديا عربي وإنجليزي.",
    },
    {
      en: "Produce a six-section report — Abstract, Introduction, Main Findings, Contradictions & Debates, Conclusion, References — with numbered citations.",
      ar: "يُنتج تقريراً من ستة أقسام — ملخّص، مقدّمة، أهم النتائج، التناقضات والنقاشات، خاتمة، مراجع — مع اقتباسات مرقّمة.",
    },
    {
      en: "Stream the report token-by-token into an Arabic-first, right-to-left interface.",
      ar: "يبثّ التقرير كلمة بكلمة في واجهة عربية أولاً تعمل من اليمين إلى اليسار.",
    },
  ],

  // ⚠️ أرقام موثّقة فقط. رقم 3000× مشروط بـ "المتكرّر/repeat" — لا تشيل القيد.
  stats: [
    {
      value: "~3000×",
      label: {
        en: "faster on repeat queries — a Wikipedia cache cut repeated lookups from ~33s to ~0.01s",
        ar: "أسرع على الاستعلامات المتكرّرة — ذاكرة لويكيبيديا خفّضت البحث المتكرّر من ~33 ثانية إلى ~0.01 ثانية",
      },
    },
    {
      value: "5",
      label: { en: "specialized agents in the pipeline", ar: "وكلاء متخصصون في الخط" },
    },
    {
      value: "6",
      label: { en: "structured report sections with numbered citations", ar: "أقسام منظّمة في التقرير مع اقتباسات مرقّمة" },
    },
    {
      value: "10",
      label: { en: "REST endpoints", ar: "منافذ REST" },
    },
  ],

  highlights: [
    {
      title: { en: "5-Agent RAG Pipeline", ar: "خط RAG من 5 وكلاء" },
      description: {
        en: "Researcher → Reader → Analyst → Writer → FactChecker; specialized stages that end in a verification pass, instead of one prompt doing everything.",
        ar: "باحث ← قارئ ← محلّل ← كاتب ← مدقّق؛ مراحل متخصصة تنتهي بمرحلة تحقّق، بدل أمر واحد يقوم بكل شيء.",
      },
    },
    {
      title: { en: "FactChecker Agent", ar: "وكيل المدقّق" },
      description: {
        en: "A dedicated stage that checks drafted claims against the retrieved sources, directly targeting hallucination.",
        ar: "مرحلة مخصّصة تتحقق من ادعاءات المسودة مقابل المصادر المسترجَعة، تستهدف الهلوسة مباشرةً.",
      },
    },
    {
      title: { en: "Multi-Model Routing + Fallback", ar: "توجيه متعدّد النماذج + تبديل" },
      description: {
        en: "Per-agent model selection over OpenRouter, with automatic fallback so a single model failure doesn't take the system down.",
        ar: "اختيار نموذج لكل وكيل عبر OpenRouter، مع تبديل تلقائي كي لا يُسقط فشلُ نموذجٍ واحد النظامَ كلّه.",
      },
    },
    {
      title: { en: "Token-by-Token SSE Streaming", ar: "بثّ SSE كلمة بكلمة" },
      description: {
        en: "The report streams live as it's generated, even behind a reverse proxy, for instant feedback.",
        ar: "يُبثّ التقرير حيّاً أثناء توليده، حتى خلف بروكسي عكسي، لإحساس فوري بالاستجابة.",
      },
    },
    {
      title: { en: "Two-Level Caching", ar: "تخزين مؤقت من مستويين" },
      description: {
        en: "An LRU embedding cache, a result cache, and a Wikipedia cache that cut repeat queries from ~33s to ~0.01s.",
        ar: "ذاكرة LRU للتضمينات، وذاكرة نتائج، وذاكرة لويكيبيديا خفّضت الاستعلامات المتكرّرة من ~33 ثانية إلى ~0.01 ثانية.",
      },
    },
    {
      title: { en: "PDF Research with Per-Document Isolation", ar: "بحث PDF مع عزل لكل مستند" },
      description: {
        en: "Upload a PDF and query strictly its content, with no cross-contamination between documents.",
        ar: "ارفع ملفاً وابحث حصراً داخل محتواه، دون تداخل بين المستندات.",
      },
    },
  ],

  stack: [
    "Python 3.14",
    "FastAPI",
    "ChromaDB",
    "sentence-transformers",
    "OpenRouter",
    "AsyncOpenAI",
    "pdfplumber",
    "Next.js 16",
    "Server-Sent Events (SSE)",
    "Railway",
    "Netlify",
    "Git / GitHub",
  ],
};
