---
name: Ayati Showcase Site Plan
overview: Build a focused marketing website in this Next.js repo to showcase Ayati Quran Desktop Companion, grounded in the desktop app README and PRD MVP priorities.
todos:
  - id: review-source-content
    content: Extract launch-safe messaging and MVP feature bullets from ayati README and docs/PRD.md
    status: pending
  - id: apply-brand-guidelines
    content: Apply docs/BRAND_GUIDELINES.md palette and font system across hero, sections, and metadata assets
    status: pending
  - id: build-page-sections
    content: Implement homepage sections for hero, workflow, features, privacy, integrations, and CTA
    status: pending
  - id: refresh-seo-metadata
    content: Replace template metadata with Ayati-specific title, description, keywords, and OG/Twitter values
    status: pending
  - id: qa-copy-and-accessibility
    content: Check content accuracy against source docs and ensure semantic/accessibility basics remain intact
    status: pending
isProject: false
---

# Ayati Desktop Showcase Website Plan

## Goals
- Reposition the current template site into a product showcase for Ayati Quran Desktop Companion.
- Emphasize MVP desktop value: screenshot-to-verse flow, reflection card, bookmarks/history, privacy-first behavior, and fallback reliability.
- Keep scope to a polished single-page launch site that can later be extended with docs/download pages.

## Source Alignment (from ayati repo)
- Product promise: convert screen context into relevant Quran verse + short reflection.
- Core demo flow: choose AI account, capture screen, receive verse card, save bookmark, review reflections.
- MVP feature set focus: on-screen companion, capture, scene understanding/theme detection, verse matching, verse card, save/bookmark, history, preferences, fallback.
- Trust signals to highlight: no screenshot persistence by default, text-only history, Quran Foundation integration.
- Brand system to follow from [`/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/docs/BRAND_GUIDELINES.md`](/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/docs/BRAND_GUIDELINES.md):
  - Colors: Emerald `#67E0A3`, Aquamarine `#7CF0BD`, Celadon `#AFF9C9`
  - Latin fonts: Sora/Outfit/Fraunces (display), Inter/Source Sans 3 (UI), JetBrains Mono/IBM Plex Mono (mono)
  - Arabic fonts (future verse previews): Amiri Quran or Scheherazade New (verses), Noto Naskh Arabic or Lateef (UI)

## Implementation Approach
- Replace generic hero and copy with Ayati-specific narrative and CTAs in [`/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/components/Hero.tsx`](/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/components/Hero.tsx).
- Expand `src/app/page.tsx` from one hero to a full marketing page composed of small sections (kept in the same file or split into `src/components/sections/*` if needed):
  - Hero (headline + desktop app positioning)
  - How It Works (3-5 step flow from README demo)
  - MVP Features grid (from PRD must-have list)
  - Privacy & Reliability section (privacy + fallback)
  - Integrations section (AI providers + Quran Foundation)
  - Final CTA (download/join waitlist/github)
- Update metadata and social preview settings in [`/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/app/layout.tsx`](/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/app/layout.tsx) so the site is indexed and shared as Ayati product content instead of template defaults.
- Add lightweight content constants/types (optional) in a new file like `src/lib/site-content.ts` if section copy grows, to keep components clean and reusable.

## Content Structure
- Messaging hierarchy:
  - Primary: “Your screen, reflected through Quran guidance.”
  - Secondary: Desktop companion that fits workflow (always-on-top, hotkey capture, minimal interruption).
- Feature framing:
  - Must-have now (MVP)
  - Coming after MVP (small “Roadmap” subsection using PRD post-MVP bullets)
- Credibility details:
  - Supported provider account presets
  - Quran Foundation content + bookmark sync
  - Privacy guarantees in plain language

## UX and Visual Direction
- Replace the template blue-purple gradient with a brand-led emerald/aquamarine/celadon palette and neutral supporting shades.
- Apply brand typography in layout/styles:
  - Display/headlines use one selected brand display font.
  - Body/UI text uses one selected brand UI font.
  - Any code/technical snippets use a brand-approved monospace font.
- If Arabic verse samples are shown, render them with a brand-approved Arabic verse font and keep clear visual separation from Latin UI text.
- Improve readability and scanning with section spacing, icon-style bullets, and concise copy blocks.
- Ensure responsive behavior prioritizes desktop-first presentation while remaining mobile-friendly.
- Preserve accessibility baseline: skip link support, semantic headings/landmarks, visible focus states, adequate contrast.

## Validation
- Verify TypeScript/lint clean for touched files.
- Run project checks using the repo’s existing commands after implementation (user will run build/test commands in this environment).
- Do a quick content QA pass against README + PRD MVP bullets to ensure no inaccurate claims.

## Files Expected To Change
- [`/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/app/page.tsx`](/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/app/page.tsx)
- [`/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/components/Hero.tsx`](/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/components/Hero.tsx)
- [`/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/app/layout.tsx`](/Users/mikhail/Documents/CURSOR CODES/In Progress/ayati-website/src/app/layout.tsx)
- Optional: `src/lib/site-content.ts` (new) if copy abstraction is needed