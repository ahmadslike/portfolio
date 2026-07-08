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
| F6 | HIGH | `text-primary` (#6366F1) as text failed WCAG AA (badge 3.27:1, result line + links 3.84:1) — new `--primary-text` tint oklch(0.67 0.16 277.12) ≈ #7e88f5, same hue, used ONLY for accent text (4.70:1 worst-case composited); fills/buttons keep #6366F1 | `c8c8ad6` |
| F7 | MED | Case-study card radius unified to rounded-xl; heading-block→content rhythm unified to mb-12; 5 inline action links expanded to 44px tap height with zero visual shift | `6f5990a` |

## Ruled by owner (2026-07-08)

| Finding | Ruling |
|---|---|
| Accent-as-text contrast | FIXED — see F6 |
| "Live" badge `--success` green | KEEP — green = active/live is a universal semantic convention; single-accent rule applies to decorative accents, not status semantics |
| CopyEmail "copied" green | KEEP — same reasoning |
| Card radius / h2 margin rhythm / inline-link tap targets | FIXED — see F7 |
| Hero "View Projects" CTA 4.26:1 | OPEN (MED) — label is 14px @ weight 600 = WCAG normal text, so 4.26:1 genuinely fails AA; even pure white on #6366F1 is only 4.47:1, so no text-color fix exists. Fix requires darkening the CTA fill or enlarging the label — brand-fill change deferred to owner's explicit call |

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
