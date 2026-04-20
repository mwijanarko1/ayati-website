import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ayati.app";

const LLMS_TXT = `# Ayati

> Ayati is an AI-powered desktop companion that builds lasting spiritual habits by transforming your screen context into real-time Quranic reflections.

## About

Ayati connects you to the Quran throughout your day — powered by the Quran Foundation ecosystem.

## Machine-readable companion pages

The following pages provide structured, plain-text summaries of key public content on this site.
All companion pages are noindex. Canonical HTML pages remain the indexable versions.

| Page       | Companion URL               | Canonical URL              |
|------------|-----------------------------|----------------------------|
| Home       | ${BASE_URL}/llms/home.md    | ${BASE_URL}/               |
| Privacy    | ${BASE_URL}/llms/privacy.md | ${BASE_URL}/privacy        |
| Terms      | ${BASE_URL}/llms/terms.md   | ${BASE_URL}/terms          |

## Key links

- Download: ${BASE_URL}/#download
- GitHub: https://github.com/mwijanarko1/ayati-quran-desktop-companion
- Privacy Policy: ${BASE_URL}/privacy
- Terms of Service: ${BASE_URL}/terms
`;

export async function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
