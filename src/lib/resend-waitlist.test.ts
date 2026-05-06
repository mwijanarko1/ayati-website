import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  addWaitlistContactToResend,
  isResendTestModeRecipientRestriction,
  sendWaitlistWelcomeEmail,
  unsubscribeWaitlistContactInResend,
  ResendContactIntegrationError,
  ResendEmailIntegrationError,
  ResendWaitlistConfigError,
} from "./resend-waitlist";

describe("addWaitlistContactToResend", () => {
  const originalApiKey = process.env.RESEND_API_KEY;
  const originalAudienceId = process.env.RESEND_AUDIENCE_ID;
  const originalFromEmail = process.env.RESEND_FROM_EMAIL;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.RESEND_AUDIENCE_ID = "78261eea-8f8b-4381-83c6-79fa7120f1cf";
    process.env.RESEND_FROM_EMAIL = "Ayati <waitlist@ayati.app>";
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = originalApiKey;
    process.env.RESEND_AUDIENCE_ID = originalAudienceId;
    process.env.RESEND_FROM_EMAIL = originalFromEmail;
    vi.stubGlobal("fetch", originalFetch);
  });

  it("sends normalized email to the Resend audience contacts endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await addWaitlistContactToResend({
      email: "person@example.com",
    });

    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/contacts", expect.any(Object));
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const parsed = JSON.parse(init.body as string);
    expect(parsed.email).toBe("person@example.com");
    expect(parsed.segments).toEqual([{ id: "78261eea-8f8b-4381-83c6-79fa7120f1cf" }]);
  });

  it("includes Authorization, Content-Type, and User-Agent headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await addWaitlistContactToResend({ email: "a@b.co" });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = new Headers(init.headers as HeadersInit);
    expect(headers.get("Authorization")).toBe("Bearer re_test_key");
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(headers.get("User-Agent")).toBe("ayati-website/1.0");
  });

  it("sends email, unsubscribed false, and waitlist segment", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await addWaitlistContactToResend({ email: "x@y.co" });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const parsed = JSON.parse(init.body as string);
    expect(parsed.unsubscribed).toBe(false);
    expect(parsed.segments).toEqual([{ id: "78261eea-8f8b-4381-83c6-79fa7120f1cf" }]);
    expect(parsed.properties).toBeUndefined();
  });

  it("throws ResendWaitlistConfigError when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;

    await expect(
      addWaitlistContactToResend({ email: "a@b.co" }),
    ).rejects.toBeInstanceOf(ResendWaitlistConfigError);
  });

  it("throws ResendWaitlistConfigError when RESEND_AUDIENCE_ID is missing", async () => {
    delete process.env.RESEND_AUDIENCE_ID;

    await expect(
      addWaitlistContactToResend({ email: "a@b.co" }),
    ).rejects.toBeInstanceOf(ResendWaitlistConfigError);
  });

  it("throws ResendWaitlistConfigError when RESEND_AUDIENCE_ID is not a UUID", async () => {
    process.env.RESEND_AUDIENCE_ID = "waitlist-segment";

    await expect(
      addWaitlistContactToResend({ email: "a@b.co" }),
    ).rejects.toBeInstanceOf(ResendWaitlistConfigError);
  });

  it("strips surrounding quotes from RESEND_AUDIENCE_ID", async () => {
    process.env.RESEND_AUDIENCE_ID = '"78261eea-8f8b-4381-83c6-79fa7120f1cf"';
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await addWaitlistContactToResend({ email: "a@b.co" });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const parsed = JSON.parse(init.body as string);
    expect(parsed.segments).toEqual([{ id: "78261eea-8f8b-4381-83c6-79fa7120f1cf" }]);
  });

  it("treats 409 duplicate as success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 409 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      addWaitlistContactToResend({ email: "dup@example.com" }),
    ).resolves.toBeUndefined();
  });

  it("throws ResendContactIntegrationError on other non-2xx responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 422 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      addWaitlistContactToResend({ email: "a@b.co" }),
    ).rejects.toMatchObject({ name: "ResendContactIntegrationError", status: 422 });
  });

  it("sends the waitlist welcome email with visible and one-click unsubscribe", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await sendWaitlistWelcomeEmail({
      email: "person@example.com",
      unsubscribeUrl: "https://ayati.app/api/waitlist/unsubscribe?token=abc",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.any(Object),
    );
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const parsed = JSON.parse(init.body as string);
    expect(parsed.from).toBe("Ayati <waitlist@ayati.app>");
    expect(parsed.to).toBe("person@example.com");
    expect(parsed.subject).toMatch(/waitlist/i);
    expect(parsed.html).toContain("https://ayati.app/api/waitlist/unsubscribe?token=abc");
    expect(parsed.text).toContain("https://ayati.app/api/waitlist/unsubscribe?token=abc");
    expect(parsed.headers).toEqual({
      "List-Unsubscribe": "<https://ayati.app/api/waitlist/unsubscribe?token=abc>",
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    });
  });

  it("uses Resend onboarding default when RESEND_FROM_EMAIL is unset", async () => {
    delete process.env.RESEND_FROM_EMAIL;
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await sendWaitlistWelcomeEmail({
      email: "person@example.com",
      unsubscribeUrl: "https://ayati.app/api/waitlist/unsubscribe?token=abc",
    });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const parsed = JSON.parse(init.body as string);
    expect(parsed.from).toBe("Ayati <onboarding@resend.dev>");
  });

  it("unsubscribes a waitlist contact by email", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await unsubscribeWaitlistContactInResend("person@example.com");

    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/contacts/person%40example.com", expect.any(Object));
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(init.method).toBe("PATCH");
    expect(JSON.parse(init.body as string)).toEqual({ unsubscribed: true });
  });
});

describe("isResendTestModeRecipientRestriction", () => {
  it("is true for Resend sandbox 403 response body", () => {
    const body = JSON.stringify({
      statusCode: 403,
      name: "validation_error",
      message:
        "You can only send testing emails to your own email address (owner@example.com). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain.",
    });
    const err = new ResendEmailIntegrationError(403, body);
    expect(isResendTestModeRecipientRestriction(err)).toBe(true);
  });

  it("is false for unrelated 403 bodies", () => {
    expect(isResendTestModeRecipientRestriction(new ResendEmailIntegrationError(403, "forbidden"))).toBe(false);
  });

  it("is false for non-403 errors", () => {
    expect(isResendTestModeRecipientRestriction(new ResendEmailIntegrationError(500, "only send testing emails"))).toBe(
      false,
    );
  });
});
