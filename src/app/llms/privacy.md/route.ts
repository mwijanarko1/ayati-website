import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ayati.app";

const CONTENT = `# Ayati — Privacy Policy

Canonical URL: ${BASE_URL}/privacy
Last Updated: April 20, 2026

## Summary

Ayati is built with a privacy-first philosophy. Context analysis runs locally on your device wherever possible. We do not sell your data or use Quranic reflections for advertising.

## Data we collect

- Account email and basic profile (if you create an account)
- Anonymous usage telemetry to fix bugs and improve the app
- Favored verses and spiritual progress (synced across devices when logged in)

## What we do not do

- We do not use personal screen context to train public AI models
- We do not sell your data to third parties
- We do not use your Quranic reflections for targeted advertising

## Your rights

You can access, export, or delete your data at any time through the app settings.

## Contact

For privacy questions: privacy@ayati.app

## Related links

- Home: ${BASE_URL}/
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
