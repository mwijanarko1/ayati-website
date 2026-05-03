---
last_mapped: 2026-05-03T00:00:00Z
---

# Codebase Map

## System Overview

Ayati Website is a Next.js 16 App Router landing site for the Ayati Quran Desktop Companion. It uses React 19, TypeScript strict mode, Tailwind CSS v4, and Vitest with React Testing Library for component tests.

The product surface includes a static marketing site, waitlist signup with Resend integration, OAuth callback flow for the Quran Foundation API, legal pages (privacy/terms), and LLM-friendly content routes (`/llms.txt`, `/llms/*.md`).

## Directory Guide

### Application Routes (`src/app/`)

- `layout.tsx` - root metadata, font loading, viewport theme colors, skip link, and global layout shell
- `page.tsx` - home page composition (hero, integrations, workflow, features, privacy, CTA, footer)
- `globals.css` - Tailwind v4 import, theme tokens, global focus styles, animations, scrollbars, utilities
- `robots.ts` / `sitemap.ts` - SEO metadata generation
- `llms.txt/route.ts` - LLM-friendly site index
- `llms/{home,privacy,terms}.md/route.ts` - LLM-friendly markdown content routes
- `oauth/callback/` - OAuth callback page and client component for Quran Foundation integration
- `api/waitlist/route.ts` - waitlist signup API endpoint with Resend integration
- `privacy/page.tsx` / `terms/page.tsx` - legal pages rendered from markdown content

### Components (`src/components/`)

- `Hero.tsx` - primary landing section and desktop-product visual
- `HeroWaitlistDialog.tsx` - waitlist dialog triggered from hero
- `VersePreview.tsx` - Quran verse preview component
- `LegalMarkdown.tsx` - markdown renderer for legal pages
- `CookieConsent.tsx` - cookie consent banner
- `sections/` - landing page sections: `Features.tsx`, `HowItWorks.tsx`, `Integrations.tsx`, `FinalCTA.tsx`, `PrivacyReliability.tsx`
- `waitlist/WaitlistForm.tsx` - waitlist form with email validation and submission
- `ui/dialog.tsx` - reusable dialog component

### Libraries (`src/lib/`)

- `env.ts` - Zod-backed environment validation (`NEXT_PUBLIC_APP_URL`)
- `waitlist.ts` - waitlist business logic
- `resend-waitlist.ts` - Resend API integration for waitlist emails
- `oauth-callback.ts` - OAuth callback URL construction utilities
- `legal-docs.ts` - legal document loading and parsing
- `utils.ts` - shared utility functions

### Content (`src/content/`)

- `desktop/PRIVACY_POLICY.md` / `TERMS_OF_SERVICE.md` - desktop app legal documents

### Configuration

- `next.config.mjs` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS v4 configuration
- `tsconfig.json` - TypeScript strict mode configuration
- `vitest.config.ts` - Vitest test configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration

### Documentation (`docs/`)

- `prd.md` - product requirements document
- `BRAND_GUIDELINES.md` - brand guidance
- `api-keys.md` - API key notes
- `hackathon-rules.md` - hackathon rules
- `connect-waitlist-to-resend-contacts.md` - Resend integration guide
- `CODEBASE_MAP.md` - this file

### Tests

- `src/components/Hero.test.tsx` - Hero component tests
- `src/components/sections/Integrations.test.tsx` - Integrations section tests
- `src/app/api/waitlist/route.test.ts` - waitlist API route tests
- `src/lib/waitlist.test.ts` - waitlist logic tests
- `src/lib/resend-waitlist.test.ts` - Resend integration tests
- `src/lib/oauth-callback.test.ts` - OAuth callback utility tests
- `src/test/setup.ts` - Vitest DOM matcher setup

## Key Workflows

- Development: `bun run dev`
- Tests: `bun run test:run`
- Build: `bun run build`
- Lint: `bun run lint`
- Environment: `NEXT_PUBLIC_APP_URL` is optional, defaults to `https://ayati.app`
- Resend: `RESEND_API_KEY` required for waitlist functionality

## Known Risks

- Template README content remains and does not fully describe the Ayati site
- Waitlist form and Resend integration contain magic values that could be extracted to constants
- Shared utilities (`utils.ts`, `waitlist.ts`) lack JSDoc documentation
- OAuth callback route exists but requires the Quran Foundation OAuth client to have this domain registered as its redirect URI
