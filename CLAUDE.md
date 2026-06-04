# CLAUDE.md — Personal Portfolio (Ahmad)

## المشروع
موقع portfolio شخصي ثنائي اللغة (عربي/إنجليزي) يعرض هوية أحمد كـ AI builder ومشاريعه.
الهدف: أعلى مستوى احترافي في الـ design والـ UX والـ performance — بحيث الموقع نفسه يكون دليل على المهارة.
المستخدم (أحمد) مبتدئ في الويب: اشرح كل قرار معماري بجملة قبل تنفيذه.

## Tech Stack (ثابت — ممنوع تغييره بدون إذن صريح)
- Framework: Next.js (آخر إصدار، App Router) + TypeScript (strict mode)
- Styling: Tailwind CSS
- Components: shadcn/ui (Radix-based, accessible)
- Animation: Motion (framer-motion)
- i18n: next-intl — locales: ar (RTL), en (LTR)
- Fonts: Geist (Latin/English) + Cairo (Arabic) عبر next/font — يتبدّل حسب الـ locale
- Content: project data كـ typed objects في /src/content (لاحقاً ممكن MDX)
- Forms: Next.js Server Action + Resend (email) + honeypot ضد الـ spam
- Deploy: **Netlify** (Next.js Runtime) — مش Vercel
- Package manager: pnpm

## مبادئ معمارية (Architecture Principles)
1. Content as data: كل مشروع = entry في /src/content/projects. الـ UI يعمل map عليها.
   إضافة مشروع جديد = entry جديد فقط، بدون لمس أي component.
2. Component-driven: مكوّنات صغيرة، single responsibility, قابلة لإعادة الاستخدام.
3. Server Components by default. استخدم "use client" فقط عند الحاجة للتفاعل (animation/forms/state).
4. ممنوع secrets في الـ client. كل API key في env vars + server-only.
5. Accessibility (a11y) إلزامي: semantic HTML، alt للصور، keyboard nav، contrast كافٍ (WCAG AA).
6. Performance budget: LCP < 2.5s. الصور عبر next/image. الخطوط عبر next/font.

## بنية المجلدات (single-page + case-study pages)
/src
  /app/[locale]/
    layout.tsx              # root layout: <html lang dir>, dark, fonts, NextIntlClientProvider
    page.tsx                # Home — صفحة وحدة فيها كل الأقسام: Hero · About · Skills · Projects · The Build · Contact
    work/[slug]/page.tsx    # صفحة case study لكل مشروع (problem -> approach -> result)
  /components/sections/      # Hero, About, Skills, ProjectGrid, BuildTimeline, Contact
  /components/ui/            # shadcn
  /content/projects/         # بيانات المشاريع (typed) — تغذّي قسم Projects و work/[slug]
  /lib/                      # helpers
  /messages/                 # ar.json, en.json (كل النصوص)

# ملاحظة معمارية: مفيش صفحات منفصلة /about أو /contact أو /work (list).
# الكل أقسام داخل Home (single-page feel). الـ nav = scroll للأقسام (#about, #projects...).
# بطاقات المشاريع في قسم Projects بتـ link لـ /work/[slug] للتفاصيل العميقة.

## قواعد الكود (Code Rules)
- TypeScript strict، ممنوع any.
- أسماء واضحة بالإنجليزي. مكوّن واحد لكل ملف.
- ممنوع inline styles؛ Tailwind فقط.
- كل نص يظهر للمستخدم لازم يجي من /messages (ممنوع نص hardcoded داخل المكوّنات).
- استخدم logical properties (ms-/me-/ps-/pe-) بدل left/right عشان الـ RTL يشتغل صح.

## Workflow معي (مهم)
1. خطّط أولاً (Plan Mode)، نفّذ ثانياً. اعرض الخطة قبل أي feature كبيرة.
2. خطوة صغيرة -> اختبار -> git commit. مش features كبيرة دفعة وحدة.
3. لو في قرار له أكثر من خيار، اعرض الخيارات بإيجابيات/سلبيات ووصّي بواحد.
4. بعد كل feature: تأكد إنها تشتغل صح بالـ RTL (عربي) والـ LTR (إنجليزي).

## أوامر
- Dev: pnpm dev
- Build: pnpm build
- Lint: pnpm lint
- Type-check: pnpm tsc --noEmit

## Deploy notes (Netlify)
- الـ Server Actions بتشتغل كـ Netlify Functions تلقائياً عبر الـ Next.js Runtime — لو طلع سلوك غريب بالـ contact form، هون أول مكان نفحصه.
- Resend بيحتاج domain موثّق للإرسال في الإنتاج. لحد ما يكون عندنا custom domain، نستخدم الـ test sender تبع Resend.
- ممنوع co-authored-by في الـ commits (Netlify free بيرفض contributor مجهول). الإعداد: includeCoAuthoredBy = false.

## مصدر المحتوى (Content source of truth)
- كل نصوص الموقع تجي من About_me.md (Hero, About, Skills, Projects, The Build, Contact).
  اعتبره المصدر الوحيد — ممنوع تخترع skills أو أرقام أو ادعاءات مش موجودة فيه.
- تجاهل قسم "Inbox" في About_me.md — هاد staging داخلي، مش محتوى موقع.
- صفحات المشاريع (work/[slug]) تُبنى من قسم Projects كـ case study: problem -> approach -> result.

## قسم "The Build" (site section)
تايملاين بصري لرحلة بناء المشروع الأول. المحتوى موجود في About_me.md تحت "The Build".
- اعرض الـ7 محطات كـ timeline (عمودي أو أفقي)، كل محطة = عنوان + سطر نتيجة واحد.
- صارم: كل محطة = نتيجة (شو صار المنتج قادر يعمل)، أبداً مش تفصيل عملية.
  ممنوع منعاً باتاً عرض: commit hashes، أسماء ملفات، self-ratings (مثل e.g. 8/10)،
  database IDs، أو عبارات متل "didn't know how to...". داخلية وتأذي المصداقية.
- عنوان القسم: "The Build — 30 days, shipped daily".
  سطر تحته: "Built in public, shipping every day for 30 days."
