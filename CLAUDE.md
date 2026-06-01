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
- Content: project data كـ typed objects في /src/content (لاحقاً ممكن MDX)
- Forms: Next.js Server Action + Resend (email) + honeypot ضد الـ spam
- Deploy: Vercel
- Package manager: pnpm

## مبادئ معمارية (Architecture Principles)
1. Content as data: كل مشروع = entry في /src/content/projects. الـ UI يعمل map عليها.
   إضافة مشروع جديد = entry جديد فقط، بدون لمس أي component.
2. Component-driven: مكوّنات صغيرة، single responsibility, قابلة لإعادة الاستخدام.
3. Server Components by default. استخدم "use client" فقط عند الحاجة للتفاعل (animation/forms/state).
4. ممنوع secrets في الـ client. كل API key في env vars + server-only.
5. Accessibility (a11y) إلزامي: semantic HTML، alt للصور، keyboard nav، contrast كافٍ (WCAG AA).
6. Performance budget: LCP < 2.5s. الصور عبر next/image. الخطوط عبر next/font.

## بنية المجلدات
/src
  /app/[locale]/
    page.tsx              # Home
    about/page.tsx
    work/page.tsx         # قائمة المشاريع
    work/[slug]/page.tsx  # صفحة المشروع (case study)
    contact/page.tsx
  /components/ui/          # shadcn
  /components/sections/    # Hero, ProjectGrid, ...
  /content/projects/       # بيانات المشاريع (typed)
  /lib/                    # helpers
  /messages/               # ar.json, en.json (كل النصوص)

## قواعد الكود (Code Rules)
- TypeScript strict، ممنوع `any`.
- أسماء واضحة بالإنجليزي. مكوّن واحد لكل ملف.
- ممنوع inline styles؛ Tailwind فقط.
- كل نص يظهر للمستخدم لازم يجي من /messages (ممنوع نص hardcoded داخل المكوّنات).
- استخدم logical properties (ms-/me-/ps-/pe-) بدل left/right عشان الـ RTL يشتغل صح.

## Workflow معي (مهم)
1. خطّط أولاً (Plan Mode)، نفّذ ثانياً. اعرض الخطة قبل أي feature كبيرة.
2. خطوة صغيرة → اختبار → git commit. مش features كبيرة دفعة وحدة.
3. لو في قرار له أكثر من خيار، اعرض الخيارات بإيجابيات/سلبيات ووصّي بواحد.
4. بعد كل feature: تأكد إنها تشتغل صح بالـ RTL (عربي) والـ LTR (إنجليزي).

## أوامر
- Dev: pnpm dev
- Build: pnpm build
- Lint: pnpm lint
- Type-check: pnpm tsc --noEmit
