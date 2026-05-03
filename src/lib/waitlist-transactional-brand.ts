/**
 * Transactional HTML for waitlist email + unsubscribe pages.
 * Tokens match docs/BRAND_GUIDELINES.md (emerald, aquamarine, celadon; Sora + Inter for web surfaces).
 */

export const BRAND = {
  emerald: "#67E0A3",
  aquamarine: "#7CF0BD",
  celadon: "#AFF9C9",
  headline: "#2D5A43",
  canvas: "#FAF9F6",
  muted: "#64748B",
} as const;

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Sora:wght@700;800&display=swap";

/** Minimal escapes for text nodes and quoted attributes. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ayatiWordmark(margin = "0 0 24px"): string {
  return `<p style="margin:${margin};font-family:Sora,Inter,system-ui,sans-serif;font-weight:800;font-size:1.75rem;letter-spacing:-0.03em;color:${BRAND.headline};">Ayati<span style="color:${BRAND.emerald};">.</span></p>`;
}

/**
 * Full HTML document for browser responses (GET unsubscribe, errors).
 */
export function buildWaitlistUnsubscribePageHtml(input: {
  pageTitle: string;
  heading: string;
  message?: string;
}): string {
  const messageBlock = input.message
    ? `<p style="margin:16px 0 0;font-size:1rem;line-height:1.6;color:${BRAND.muted};">${escapeHtml(input.message)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(input.pageTitle)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${GOOGLE_FONTS}" rel="stylesheet">
</head>
<body style="margin:0;background:${BRAND.canvas};color:${BRAND.headline};font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:48px 24px 64px;">
    ${ayatiWordmark("0 0 24px")}
    <h1 style="margin:0;font-family:Sora,Inter,system-ui,sans-serif;font-size:1.35rem;font-weight:800;letter-spacing:-0.02em;color:${BRAND.headline};">${escapeHtml(input.heading)}</h1>
    ${messageBlock}
    <p style="margin-top:40px;font-size:0.95rem;">
      <a href="/" style="color:${BRAND.headline};font-weight:600;text-decoration:underline;text-underline-offset:3px;">← Back to Ayati</a>
    </p>
  </div>
</body>
</html>`;
}

/**
 * Table-based HTML for email clients; includes plain-text alternative separately in the API payload.
 */
export function buildWaitlistConfirmationEmailHtml(unsubscribeUrl: string): string {
  const href = escapeHtml(unsubscribeUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Ayati waitlist</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${GOOGLE_FONTS}" rel="stylesheet">
</head>
<body style="margin:0;background:${BRAND.canvas};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.canvas};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border:2px solid ${BRAND.celadon};border-radius:24px;">
        <tr>
          <td style="padding:32px 28px;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:${BRAND.headline};">
            ${ayatiWordmark("0 0 20px")}
            <p style="margin:0 0 12px;">Assalamu alaikum,</p>
            <p style="margin:0 0 12px;">You are on the Ayati waitlist. We will email you when early access opens.</p>
            <p style="margin:0 0 20px;color:${BRAND.muted};font-size:0.95rem;">If you did not request this, you can unsubscribe immediately.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;">
              <tr>
                <td style="border-radius:9999px;background:${BRAND.emerald};">
                  <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:Sora,Inter,sans-serif;font-weight:800;font-size:0.95rem;color:${BRAND.headline};text-decoration:none;border-radius:9999px;">Unsubscribe from waitlist emails</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <p style="margin:24px 0 0;font-family:Inter,Segoe UI,sans-serif;font-size:12px;line-height:1.5;color:${BRAND.muted};max-width:480px;">
        Ayati — your desktop companion for the Quran
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;
}
