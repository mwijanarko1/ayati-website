import type { WaitlistSubmission } from "@/lib/waitlist";
import { buildWaitlistConfirmationEmailHtml } from "@/lib/waitlist-transactional-brand";

/** Resend’s documented test “from” when you have no verified domain (see Resend testing docs). */
export const RESEND_DEFAULT_TEST_FROM = "Ayati <onboarding@resend.dev>";

export class ResendWaitlistConfigError extends Error {
  constructor(message = "Resend waitlist is not configured.") {
    super(message);
    this.name = "ResendWaitlistConfigError";
  }
}

export class ResendContactIntegrationError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body = "") {
    super(`Resend API error: ${status}`);
    this.name = "ResendContactIntegrationError";
    this.status = status;
    this.body = body;
  }
}

export class ResendEmailIntegrationError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body = "") {
    super(`Resend email API error: ${status}`);
    this.name = "ResendEmailIntegrationError";
    this.status = status;
    this.body = body;
  }
}

/** Resend returns 403 when using the test `from` and `to` is not the account owner inbox (until a domain is verified). */
export function isResendTestModeRecipientRestriction(error: ResendEmailIntegrationError): boolean {
  if (error.status !== 403) {
    return false;
  }
  return error.body.includes("only send testing emails") && error.body.includes("verify a domain");
}

/**
 * Creates a Resend Contact in the configured audience. Uses REST fetch (no SDK).
 * Treats HTTP 409 (duplicate contact) as success.
 * Omits `properties`: Resend returns 422 unless each key exists as a pre-defined contact property in the dashboard.
 */
export async function addWaitlistContactToResend(submission: WaitlistSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();

  if (!apiKey || !audienceId) {
    throw new ResendWaitlistConfigError();
  }

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "ayati-website/1.0",
    },
    body: JSON.stringify({
      email: submission.email,
      unsubscribed: false,
      segments: [{ id: audienceId }],
    }),
  });

  if (response.status === 409) {
    return;
  }

  if (!response.ok) {
    throw new ResendContactIntegrationError(response.status, await response.text().catch(() => ""));
  }
}

export async function sendWaitlistWelcomeEmail({
  email,
  unsubscribeUrl,
}: {
  email: string;
  unsubscribeUrl: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim() || RESEND_DEFAULT_TEST_FROM;

  if (!apiKey) {
    throw new ResendWaitlistConfigError();
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "ayati-website/1.0",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: "You are on the Ayati waitlist",
      html: buildWaitlistConfirmationEmailHtml(unsubscribeUrl),
      text: [
        "Assalamu alaikum,",
        "",
        "You are on the Ayati waitlist. We will email you when early access opens.",
        "",
        "If you did not request this, unsubscribe here:",
        unsubscribeUrl,
        "",
      ].join("\n"),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });

  if (!response.ok) {
    throw new ResendEmailIntegrationError(response.status, await response.text().catch(() => ""));
  }
}

export async function unsubscribeWaitlistContactInResend(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new ResendWaitlistConfigError();
  }

  const response = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "ayati-website/1.0",
    },
    body: JSON.stringify({ unsubscribed: true }),
  });

  if (!response.ok) {
    throw new ResendContactIntegrationError(response.status, await response.text().catch(() => ""));
  }
}
