import { NextResponse } from "next/server";

import { getEnv } from "@/lib/env";
import {
  addWaitlistContactToResend,
  ResendContactIntegrationError,
  ResendWaitlistConfigError,
} from "@/lib/resend-waitlist";
import { parseWaitlistSubmission } from "@/lib/waitlist";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const submission = parseWaitlistSubmission(body);

  if (!submission.success) {
    return NextResponse.json({ error: submission.error }, { status: 400 });
  }

  const { RESEND_API_KEY, RESEND_AUDIENCE_ID } = getEnv();

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      { error: "Waitlist collection is not configured yet." },
      { status: 503 },
    );
  }

  try {
    await addWaitlistContactToResend(submission.data);
  } catch (error) {
    if (error instanceof ResendWaitlistConfigError) {
      return NextResponse.json(
        { error: "Waitlist collection is not configured yet." },
        { status: 503 },
      );
    }
    if (error instanceof ResendContactIntegrationError) {
      return NextResponse.json(
        { error: "We could not add you right now. Please try again." },
        { status: 502 },
      );
    }
    throw error;
  }

  return NextResponse.json({ ok: true });
}
