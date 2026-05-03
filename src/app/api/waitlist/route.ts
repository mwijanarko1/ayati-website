import { NextResponse } from "next/server";

import { getEnv } from "@/lib/env";
import {
  addWaitlistContactToResend,
  isResendTestModeRecipientRestriction,
  ResendContactIntegrationError,
  ResendEmailIntegrationError,
  ResendWaitlistConfigError,
  sendWaitlistWelcomeEmail,
} from "@/lib/resend-waitlist";
import { createWaitlistEmailToken } from "@/lib/waitlist-email-token";
import {
  checkWaitlistRateLimit,
  getWaitlistRateLimitKey,
} from "@/lib/waitlist-rate-limit";
import { parseWaitlistSubmission } from "@/lib/waitlist";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const submission = parseWaitlistSubmission(body);

  if (!submission.success) {
    return NextResponse.json({ error: submission.error }, { status: 400 });
  }

  const {
    NEXT_PUBLIC_APP_URL,
    RESEND_API_KEY,
    RESEND_AUDIENCE_ID,
    WAITLIST_UNSUBSCRIBE_SECRET,
  } = getEnv();

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID || !WAITLIST_UNSUBSCRIBE_SECRET) {
    return NextResponse.json(
      { error: "Waitlist collection is not configured yet." },
      { status: 503 },
    );
  }

  const rateLimit = checkWaitlistRateLimit(getWaitlistRateLimitKey(request));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many waitlist requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  try {
    await addWaitlistContactToResend(submission.data);

    const token = createWaitlistEmailToken(submission.data.email, {
      secret: WAITLIST_UNSUBSCRIBE_SECRET,
    });
    const baseUrl = NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    const unsubscribeUrl = new URL("/api/waitlist/unsubscribe", baseUrl);
    unsubscribeUrl.searchParams.set("token", token);

    await sendWaitlistWelcomeEmail({
      email: submission.data.email,
      unsubscribeUrl: unsubscribeUrl.toString(),
    });
  } catch (error) {
    if (error instanceof ResendWaitlistConfigError) {
      return NextResponse.json(
        { error: "Waitlist collection is not configured yet." },
        { status: 503 },
      );
    }
    if (error instanceof ResendContactIntegrationError) {
      console.error("Resend waitlist contact creation failed", {
        status: error.status,
        body: error.body,
      });
      return NextResponse.json(
        { error: "We could not add you right now. Please try again." },
        { status: 502 },
      );
    }
    if (error instanceof ResendEmailIntegrationError) {
      if (isResendTestModeRecipientRestriction(error)) {
        console.warn(
          "Waitlist welcome email skipped: Resend test sender only delivers to your Resend account email until a domain is verified.",
        );
        return NextResponse.json({
          ok: true,
          message:
            "You are on the Ayati waitlist. We could not send a confirmation email to this address while using Resend’s test sender — verify a domain at resend.com/domains and set RESEND_FROM_EMAIL, or use your Resend account email to test.",
        });
      }
      console.error("Resend waitlist welcome email failed", {
        status: error.status,
        body: error.body,
      });
      return NextResponse.json(
        { error: "We could not send the waitlist email right now. Please try again." },
        { status: 502 },
      );
    }
    throw error;
  }

  return NextResponse.json({
    ok: true,
    message: "You are on the Ayati waitlist. We sent you a confirmation email.",
  });
}
