---
last_mapped: 2026-04-20T00:00:00Z
---

# Codebase Map

## System Overview

Ayati Website is a Next.js 16 App Router landing site for the Ayati Quran Desktop Companion. It uses React 19, TypeScript strict mode, Tailwind CSS v4, and Vitest with React Testing Library for component tests.

The current product surface is a static marketing and submission site. It presents the desktop companion, Quran Foundation API integration, privacy posture, and download call to action.

## Directory Guide

- `src/app/layout.tsx` - root metadata, font loading, viewport theme colors, skip link, and global layout shell.
- `src/app/page.tsx` - home page composition, including hero, integration, workflow, feature, privacy, CTA, and footer sections.
- `src/app/globals.css` - Tailwind v4 import, theme tokens, global focus styles, animations, scrollbars, and shared utility classes.
- `src/components/Hero.tsx` - primary landing section and desktop-product visual.
- `src/components/VersePreview.tsx` - Quran verse preview component used by the landing experience.
- `src/components/sections/` - landing-page sections for integrations, workflow, features, privacy/reliability, and final CTA.
- `src/lib/env.ts` - Zod-backed environment validation for public app URL configuration.
- `src/test/setup.ts` - Vitest DOM matcher setup.
- `docs/` - product notes, brand guidance, API keys notes, hackathon rules, and prompt material.
- `public/` - static public assets such as the app icon.

## Key Workflows

- Development: `bun run dev`
- Tests: `bun run test:run`
- Build: `bun run build`
- Environment: `NEXT_PUBLIC_APP_URL` is optional and defaults metadata to `https://ayati.app`.

## Known Risks

- The repository still contains template README content that does not fully describe the Ayati site.
- Several landing-page changes are currently uncommitted, so edits should avoid touching unrelated existing files unless required.
- The site had no OAuth callback route before this map. If the Quran Foundation OAuth client uses this domain as its registered redirect URI, a dedicated callback route is required to hand the authorization result back to the desktop app.
