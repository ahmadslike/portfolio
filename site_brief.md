# Site Brief — Ahmad's Portfolio

> Stable reference for every conversation that builds or edits the site. Pairs with CLAUDE.md (tech/architecture) and About_me.md (content).
> Repo: https://github.com/Ahmadslike/portfolio

## What this site is
- Personal **portfolio**, **single-page**, client-facing.
- Goal: when a client asks for a portfolio, I send the link and they find everything — bio, skills, projects, contact.
- **Architecture:** Home (`/[locale]`) is ONE scrolling page containing all 6 sections below. Each project also has a dedicated **case-study page** at `/[locale]/work/[slug]` (problem → approach → result). No separate /about or /contact pages — those are sections on Home. Nav = scroll-to anchors; project cards link to the case-study pages.
- Bilingual (Arabic RTL / English LTR) per CLAUDE.md.

## Content source
- **All copy comes from `About_me.md`** — single source of truth. Never invent skills, numbers, or claims not in it.
- Ignore the `Inbox` section of About_me.md — internal staging, not website content.

## Tech stack
- See **CLAUDE.md** (authoritative). Summary: Next.js (App Router) + TS strict · Tailwind · shadcn/ui · Motion · next-intl · Server Action + Resend · **Netlify** · pnpm.

## Aesthetic
- **Dark & Minimal.** Reference feel: leerob.com / brittanychiang.com (both dark, single accent, single-page).
- The professionalism comes from restraint, spacing, typography, and subtle motion — **not** from decoration or extra colors.

## Typography
- **English / Latin:** Geist (via next/font).
- **Arabic:** Cairo (via next/font) — applied on the `ar` locale. Cairo is used across Ahmad's other products (app + extension), so it keeps brand identity consistent. Geist does not render Arabic well, so a dedicated Arabic font is required.
- Headings: tight tracking, strong weight. Body: comfortable line-height for readability in both scripts.

## Color system (locked)
| Token | Hex | Use |
|---|---|---|
| Background | `#0B0F19` | page background |
| Surface | `#151B2B` | cards, raised areas |
| Text | `#E5E7EB` | body text (soft white, not pure) |
| Text muted | `#9CA3AF` | secondary text, captions |
| Border | `#1F2937` | dividers, card borders |
| **Accent** | `#6366F1` | links, buttons, icons, hover — **ONE accent only** |
| Success (optional) | `#10B981` | only for "message sent ✓" states — never a primary button |

**Rule:** one accent everywhere. No competing second accent. Primary buttons (Contact / View Project) use `#6366F1`, not green.

## Sections (order)
1. **Hero** — name + tagline (AI Builder & Founder, 17) + buttons (Projects / Contact)
2. **About** — the bio paragraph from About_me.md
3. **Tech & Skills** — categorized as in About_me.md
4. **Projects** — both projects with links (Live + GitHub); each card links to its case-study page: problem → approach → result
5. **The Build** — see rules below
6. **Contact** — all contact methods from About_me.md

## "The Build" section (rules)
- Visual timeline of Project 1's 30-day journey. Content lives in About_me.md under "The Build".
- Render the 7 milestones as a timeline (vertical or horizontal): each = title + one-line **result**.
- Heading: "The Build — 30 days, shipped daily" · subline: "Built in public, shipping every day for 30 days."
- **STRICT — never display:** commit hashes, file names, self-ratings (e.g. 8/10), database IDs, or phrases like "didn't know how to…". Every milestone is a result (what the product can now do), never a process detail.

## Design principles
- Fast load (LCP < 2.5s), responsive (mobile-first), accessible (WCAG AA).
- External links open in a new tab.
- Motion is subtle (entrance fades, hover states) — never flashy.
- Logical CSS properties (ms-/me-/ps-/pe-) so RTL works correctly.

## Contact facts (from About_me.md — keep in sync)
- Email: ahmadslike1@gmail.com
- GitHub: https://github.com/Ahmadslike
- LinkedIn: https://linkedin.com/in/ahmad-slik-99661840b
- X: https://x.com/Ahmad_slik
- Mostaql: Ahmadslike
- Location: Damascus, Syria

## Open / later
- LinkedIn banner + headline, and unifying GitHub username display, to be updated **after** the site ships.
- Custom domain — needed before the Resend contact form can send real emails in production.
- Optional Writing/Blog section — decide during content phase (ties into Build-in-Public).
