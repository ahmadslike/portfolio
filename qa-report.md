# QA Report — Phase 8 Full Sweep (T9)

Audited at HEAD `ffed9dd` (2026-07-07) by 5 independent read-only auditors (a11y, responsive, links, lighthouse, consistency), each in an isolated worktree. Fixes applied serially, each independently verified before commit. Evidence: `portfolio-screenshots/sprint/T9/`.

## Fixed (verified + committed)

| # | Sev | Finding | Fix commit |
|---|---|---|---|
| F1 | HIGH | Reduced-motion users saw everything below the hero permanently invisible (SSR-baked `opacity:0` inline style stranded by the plain-element reduced branch in Reveal/Stagger) | `140081c` |
| F2 | HIGH | Header nav anchors (#about/#work/#the-build/#contact) were dead no-ops on case-study pages, both locales (8 links) | `bacea00` |
| F3 | HIGH | Mobile hamburger was a 20×20px bare icon (~half the 44px touch-target minimum) — now 44×44 effective hit area, zero visual shift | `d597e0c` |
| F4 | MED | Mobile menu lacked Escape-to-close (with focus return) and click-outside-to-close | `d597e0c` |
| F5 | MED | Generated favicon `/icon?<hash>` was locale-prefixed by the middleware matcher → 307 → 404 console error on every page load (Lighthouse Best Practices 96→100 blocker; predates sprint) | `c972190` |

## Open — awaiting design decisions (Ahmad)

| Sev | Finding | Location |
|---|---|---|
| HIGH | `text-primary` (#6366F1) as normal-size text fails WCAG AA: status badge 3.27:1 composited, result line + Live/Code links 3.84:1 (needs 4.5:1) | ProjectCard.tsx:17,33,60,69 |
| HIGH | "Live" status badge uses `--success` green; brief restricts green to "message sent" states (single-accent rule). Overlaps the contrast finding — one recolor could resolve both | ProjectCard.tsx:16 |
| MED | Hero "View Projects" CTA contrast 4.26:1 (#f8fafc on #6366F1) — the sole cause of Lighthouse A11y 96 (EN) vs 100 (AR); pre-existing baseline gap | Hero CTA |
| MED | CopyEmail "copied" state uses `--success` green — borderline vs the brief's literal "message sent" wording | CopyEmail.tsx:26 |
| MED | `rounded-xl` (Stats) vs `rounded-lg` (Highlights) on visually identical case-study cards | work/[slug]/page.tsx:160,280 |
| MED | Section-heading bottom margin varies without pattern: mb-8 (About/Contact), mb-12 (Skills/Projects), mb-2+subline (Build) | sections/* |
| MED | Inline action links ("Live", "Code", "View case study", "Back to home") ~20px tall on mobile; adjacent spacing mitigates | ProjectCard.tsx, work/[slug]/page.tsx |

## Logged LOW (not actioned; fix only if trivial post-decisions)

- No skip-to-content link (keyboard users tab through nav each load).
- External links lack "(opens in new tab)" screen-reader affordance.
- CopyEmail "Copy" button tap target 28×16 (secondary action).
- Scroll-spy edge: with Contact (short last section) scrolled to, "The Build" stays highlighted — pre-existing, A/B-verified not caused by F2.
- Hero.tsx dev-only hydration mismatch under reduced-motion (same class as F1, visually self-healing, prod console clean).
- Middleware matcher `icon` exclusion also matches any future path starting with "icon" — harmless today (verified no such route/file exists).
- Card-grid gap 6 vs 4, case-study list spacing variety, chip radius families by role, article max-w-4xl vs section 5xl, case-study h2 text-2xl — all judged intentional-by-context; recorded for awareness.
- LinkedIn returns HTTP 999 to non-browser agents (bot-block, not a broken link). Production domain unreachable from the audit sandbox (network allowlist) — canonical/hreflang verified against local server + due for live re-check at Push B.

## Notable passes

- Zero horizontal overflow at all 14 viewport×locale combos (360–1440, Home + case study).
- RTL mirroring measured correct (DOM geometry, not just visual) at every width.
- Zero physical-direction CSS classes; logical properties throughout.
- Zero off-palette colors beyond the flagged greens; section rhythm (py-20/max-w-5xl/border-t) uniform.
- Keyboard order, focus-visible, landmarks, heading hierarchy, ARIA (menu, CopyEmail aria-live) all clean.
- Muted-text contrast 6.76–7.54:1 (AA+). CLS 0.00 in every Lighthouse run, both locales.
- Lighthouse (local, mobile-emulated): A11y 96 EN / 100 AR (matches baseline exactly), BP 96→100 expected after F5, SEO 92 is a localhost canonical artifact (correct in production).
- All 18 external anchors have `target="_blank" rel="noopener noreferrer"`; language switcher slug-aware in all 4 directions; sitemap/robots/OG images correct.

## Content notes (for Ahmad, not defects)

- Case-study title "Intelligent Research Assistant" remains English on /ar — treated as product proper noun.
