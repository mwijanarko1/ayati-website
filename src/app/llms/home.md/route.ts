import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ayati.app";

const CONTENT = `# Ayati — Home

Canonical URL: ${BASE_URL}/

## Summary

Ayati is an AI-powered desktop companion that builds lasting spiritual habits. It transforms your active screen context into real-time Quranic reflections, helping you stay connected to the Word of Allah throughout your day.

Built in partnership with the Quran Foundation ecosystem.

## Key features

- Real-time Quranic reflections based on your screen context
- AI-powered, privacy-first local processing
- Integration with the Quran Foundation and Quran.com ecosystem
- Available for macOS and Windows (free to download)

## Core sections on this page

- Hero: App introduction and download call-to-action
- How It Works: Terminal-style walkthrough of the reflection pipeline
- Features: Privacy, accuracy, and spiritual integrity highlights
- Integrations: Quran Foundation, Quran.com, and partner stack

## Key links

- Download: ${BASE_URL}/#download
- GitHub: https://github.com/mwijanarko1/ayati-quran-desktop-companion
- Privacy Policy: ${BASE_URL}/privacy
- Terms of Service: ${BASE_URL}/terms
`;

export async function GET() {
  return new NextResponse(CONTENT, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
