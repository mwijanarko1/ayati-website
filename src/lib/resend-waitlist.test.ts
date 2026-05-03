import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  addWaitlistContactToResend,
  ResendWaitlistConfigError,
} from "./resend-waitlist";

describe("addWaitlistContactToResend", () => {
  const originalApiKey = process.env.RESEND_API_KEY;
  const originalAudienceId = process.env.RESEND_AUDIENCE_ID;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.RESEND_AUDIENCE_ID = "78261eea-8f8b-4381-83c6-79fa7120f1cf";
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = originalApiKey;
    process.env.RESEND_AUDIENCE_ID = originalAudienceId;
    vi.stubGlobal("fetch", originalFetch);
  });

  it("sends normalized email to the Resend audience contacts endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await addWaitlistContactToResend({
      email: "person@example.com",
      newsletterOptIn: false,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/audiences/78261eea-8f8b-4381-83c6-79fa7120f1cf/contacts",
      expect.any(Object),
    );
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const parsed = JSON.parse(init.body as string);
    expect(parsed.email).toBe("person@example.com");
  });

  it("includes Authorization, Content-Type, and User-Agent headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await addWaitlistContactToResend({ email: "a@b.co", newsletterOptIn: false });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = new Headers(init.headers as HeadersInit);
    expect(headers.get("Authorization")).toBe("Bearer re_test_key");
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(headers.get("User-Agent")).toBe("ayati-website/1.0");
  });

  it("sends unsubscribed false and waitlist metadata in properties", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await addWaitlistContactToResend({ email: "x@y.co", newsletterOptIn: true });

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const parsed = JSON.parse(init.body as string);
    expect(parsed.unsubscribed).toBe(false);
    expect(parsed.properties.source).toBe("waitlist-modal");
    expect(parsed.properties.newsletter_opt_in).toBe("true");
    expect(typeof parsed.properties.submitted_at).toBe("string");
  });

  it("throws ResendWaitlistConfigError when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;

    await expect(
      addWaitlistContactToResend({ email: "a@b.co", newsletterOptIn: false }),
    ).rejects.toBeInstanceOf(ResendWaitlistConfigError);
  });

  it("throws ResendWaitlistConfigError when RESEND_AUDIENCE_ID is missing", async () => {
    delete process.env.RESEND_AUDIENCE_ID;

    await expect(
      addWaitlistContactToResend({ email: "a@b.co", newsletterOptIn: false }),
    ).rejects.toBeInstanceOf(ResendWaitlistConfigError);
  });

  it("treats 409 duplicate as success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 409 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      addWaitlistContactToResend({ email: "dup@example.com", newsletterOptIn: false }),
    ).resolves.toBeUndefined();
  });

  it("throws ResendContactIntegrationError on other non-2xx responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 422 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      addWaitlistContactToResend({ email: "a@b.co", newsletterOptIn: false }),
    ).rejects.toMatchObject({ name: "ResendContactIntegrationError", status: 422 });
  });
});
