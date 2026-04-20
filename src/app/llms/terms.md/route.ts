import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ayati.app";

const CONTENT = `# Ayati — Terms of Service

Canonical URL: ${BASE_URL}/terms
Last Updated: April 20, 2026

## Summary

By using Ayati, you agree to use the service for its intended spiritual and educational purposes and to respect the sanctity of the Quranic content it provides.

## Key terms

- Accept these terms to use the desktop companion and website
- Use the service ethically — do not generate content that contradicts Quranic teachings or promotes harm
- Your reflections and personal insights remain yours; Ayati does not claim ownership
- The software and brand are the property of the Ayati team under applicable intellectual property laws
- The Quranic text itself is used in respect of its public domain and spiritual status
- Ayati is provided "as is" — always consult original Quranic sources and scholars for definitive guidance
- Terms may be updated; continued use constitutes acceptance

## Contact

For legal questions: legal@ayati.app

## Related links

- Home: ${BASE_URL}/
- Privacy Policy: ${BASE_URL}/privacy
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
