import type { WaitlistSubmission } from "@/lib/waitlist";

export class ResendWaitlistConfigError extends Error {
  constructor(message = "Resend waitlist is not configured.") {
    super(message);
    this.name = "ResendWaitlistConfigError";
  }
}

export class ResendContactIntegrationError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Resend API error: ${status}`);
    this.name = "ResendContactIntegrationError";
    this.status = status;
  }
}

/**
 * Creates a Resend Contact in the configured audience. Uses REST fetch (no SDK).
 * Treats HTTP 409 (duplicate contact) as success.
 */
export async function addWaitlistContactToResend(submission: WaitlistSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();

  if (!apiKey || !audienceId) {
    throw new ResendWaitlistConfigError();
  }

  const submittedAt = new Date().toISOString();
  const url = `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "ayati-website/1.0",
    },
    body: JSON.stringify({
      email: submission.email,
      unsubscribed: false,
      properties: {
        source: "waitlist-modal",
        newsletter_opt_in: submission.newsletterOptIn ? "true" : "false",
        submitted_at: submittedAt,
      },
    }),
  });

  if (response.status === 409) {
    return;
  }

  if (!response.ok) {
    throw new ResendContactIntegrationError(response.status);
  }
}
