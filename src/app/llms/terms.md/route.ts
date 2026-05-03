import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ayati.app";

const CONTENT = `# Ayati — Terms of Service

Canonical URL: ${BASE_URL}/terms
Last Updated: May 3, 2026

## Summary

By using Ayati you agree to lawful, respectful use. The desktop source is distributed under the MIT License (see repository LICENSE; copyright Mikhail Wijanarko). Branding and site content outside that license remain protected where applicable.

## Key points

- Desktop app may use screen analysis, user-configured AI providers, Quran Foundation / Quran.com / media / prayer APIs, local storage, and updates as described in the Privacy Policy
- Third-party services are independent; your credentials and compliance obligations are yours
- Waitlist emails require an address you control; unsubscribe is honored where required by law
- Quranic content and AI output are educational aids only—not fatwa; verify with scholars
- Ayati is provided "as is" to the extent permitted by law
- Governing law: England and Wales (subject to mandatory consumer protections where you live, including UK consumer rights)
- Terms may change; continued use may constitute acceptance where allowed by law

## Contact

mikhailspeaks@gmail.com

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
