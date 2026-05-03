import { getEnv } from "@/lib/env";
import {
  unsubscribeWaitlistContactInResend,
  ResendContactIntegrationError,
  ResendWaitlistConfigError,
} from "@/lib/resend-waitlist";
import { verifyWaitlistEmailToken } from "@/lib/waitlist-email-token";
import { buildWaitlistUnsubscribePageHtml } from "@/lib/waitlist-transactional-brand";

export const runtime = "nodejs";

function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function unsubscribe(request: Request, responseMode: "html" | "empty"): Promise<Response> {
  const { RESEND_API_KEY, WAITLIST_UNSUBSCRIBE_SECRET } = getEnv();

  if (!RESEND_API_KEY || !WAITLIST_UNSUBSCRIBE_SECRET) {
    return responseMode === "empty"
      ? new Response(null, { status: 503 })
      : htmlResponse(
          buildWaitlistUnsubscribePageHtml({
            pageTitle: "Ayati — Waitlist",
            heading: "Waitlist unsubscribe is not configured.",
          }),
          503,
        );
  }

  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return responseMode === "empty"
      ? new Response(null, { status: 400 })
      : htmlResponse(
          buildWaitlistUnsubscribePageHtml({
            pageTitle: "Ayati — Invalid link",
            heading: "This unsubscribe link is invalid.",
          }),
          400,
        );
  }

  const result = verifyWaitlistEmailToken(token, {
    secret: WAITLIST_UNSUBSCRIBE_SECRET,
  });

  if (!result.success) {
    return responseMode === "empty"
      ? new Response(null, { status: 400 })
      : htmlResponse(
          buildWaitlistUnsubscribePageHtml({
            pageTitle: "Ayati — Invalid link",
            heading: "This unsubscribe link is invalid.",
          }),
          400,
        );
  }

  try {
    await unsubscribeWaitlistContactInResend(result.email);
  } catch (error) {
    if (error instanceof ResendWaitlistConfigError) {
      return responseMode === "empty"
        ? new Response(null, { status: 503 })
        : htmlResponse(
            buildWaitlistUnsubscribePageHtml({
              pageTitle: "Ayati — Waitlist",
              heading: "Waitlist unsubscribe is not configured.",
            }),
            503,
          );
    }
    if (error instanceof ResendContactIntegrationError) {
      console.error("Resend waitlist unsubscribe failed", {
        status: error.status,
        body: error.body,
      });
      return responseMode === "empty"
        ? new Response(null, { status: 502 })
        : htmlResponse(
            buildWaitlistUnsubscribePageHtml({
              pageTitle: "Ayati — Waitlist",
              heading: "We could not unsubscribe you right now.",
              message: "Please try again in a few minutes, or contact us if the problem continues.",
            }),
            502,
          );
    }
    throw error;
  }

  return responseMode === "empty"
    ? new Response(null, { status: 200 })
    : htmlResponse(
        buildWaitlistUnsubscribePageHtml({
          pageTitle: "Ayati — Unsubscribed",
          heading: "You are unsubscribed from Ayati waitlist emails.",
          message: "You will not receive further waitlist messages from us. You can close this tab.",
        }),
      );
}

export async function GET(request: Request): Promise<Response> {
  return unsubscribe(request, "html");
}

export async function POST(request: Request): Promise<Response> {
  return unsubscribe(request, "empty");
}
