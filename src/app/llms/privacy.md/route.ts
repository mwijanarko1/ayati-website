import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ayati.app";

const CONTENT = `# Ayati — Privacy Policy

Canonical URL: ${BASE_URL}/privacy
Last Updated: May 3, 2026

## Summary

The Ayati desktop companion stores settings, reflections, and credentials locally and does not require an Ayati-operated account to run. Data typically leaves your device only when you enable features that call third parties (AI providers you configure with your keys, optional Quran Foundation APIs, Quran.com, verse media hosts, prayer-time APIs, or GitHub-hosted update checks). This marketing site may collect waitlist email through Resend and store submission metadata needed to operate the waitlist.

## Controller / contact

Ayati is published by Mikhail Wijanarko. Privacy requests: mikhailspeaks@gmail.com.

## Desktop app (high level)

- Local-first reflection and screen-context processing on your device
- Optional OS permissions (for example screen capture) only when you use dependent features
- Third-party services process data under their own policies when contacted

## Website

- Waitlist: email address you submit
- Provider: Resend for email list/contact management
- Legal bases where GDPR / UK GDPR applies: legitimate interests for requested waitlist operation and service protection, and legal obligation where required
- Retention: waitlist data until removal is requested, the list is no longer needed, or legal/security retention requires otherwise

## What we do not do

- We do not sell your personal information or use Quranic reflections for targeted advertising

## Your rights

Many desktop controls are local (clear app data or uninstall). Third-party dashboards apply for keys and connected accounts. Depending on location, privacy rights may include access, correction, deletion, restriction, objection, portability, withdrawal of consent, and complaint to a supervisory authority. Contact us for questions about information collected through this website.

## Contact

mikhailspeaks@gmail.com

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
