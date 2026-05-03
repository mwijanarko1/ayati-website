import { createWaitlistEmailToken } from "@/lib/waitlist-email-token";
import { resetWaitlistRateLimitForTests } from "@/lib/waitlist-rate-limit";

import { GET, POST as UNSUBSCRIBE_POST } from "./unsubscribe/route";
import { POST } from "./route";

describe("POST /api/waitlist", () => {
  const originalApiKey = process.env.RESEND_API_KEY;
  const originalAudienceId = process.env.RESEND_AUDIENCE_ID;
  const originalFromEmail = process.env.RESEND_FROM_EMAIL;
  const originalUnsubscribeSecret = process.env.WAITLIST_UNSUBSCRIBE_SECRET;
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_AUDIENCE_ID = "78261eea-8f8b-4381-83c6-79fa7120f1cf";
    process.env.RESEND_FROM_EMAIL = "Ayati <waitlist@ayati.app>";
    process.env.WAITLIST_UNSUBSCRIBE_SECRET = "test-secret-with-enough-entropy";
    process.env.NEXT_PUBLIC_APP_URL = "https://ayati.app";
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = originalApiKey;
    process.env.RESEND_AUDIENCE_ID = originalAudienceId;
    process.env.RESEND_FROM_EMAIL = originalFromEmail;
    process.env.WAITLIST_UNSUBSCRIBE_SECRET = originalUnsubscribeSecret;
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
    vi.stubGlobal("fetch", originalFetch);
    resetWaitlistRateLimitForTests();
  });

  it("rejects invalid email submissions", async () => {
    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "invalid" }),
      }),
    );

    await expect(response.json()).resolves.toEqual({
      error: "Enter a valid email address.",
    });
    expect(response.status).toBe(400);
  });

  it("returns 503 when Resend env is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_AUDIENCE_ID;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.WAITLIST_UNSUBSCRIBE_SECRET;

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "valid@example.com" }),
      }),
    );

    await expect(response.json()).resolves.toEqual({
      error: "Waitlist collection is not configured yet.",
    });
    expect(response.status).toBe(503);
  });

  it("adds the contact, sends a welcome email, and returns ok for a valid email", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "  PERSON@Example.COM " }),
      }),
    );

    await expect(response.json()).resolves.toEqual({
      ok: true,
      message: "You are on the Ayati waitlist. We sent you a confirmation email.",
    });
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "https://api.resend.com/contacts", expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(2, "https://api.resend.com/emails", expect.any(Object));
    const contactInit = fetchMock.mock.calls[0][1] as RequestInit;
    const emailInit = fetchMock.mock.calls[1][1] as RequestInit;
    expect(JSON.parse(contactInit.body as string).email).toBe("person@example.com");
    expect(JSON.parse(emailInit.body as string).to).toBe("person@example.com");
    expect(JSON.parse(emailInit.body as string).html).toContain("/api/waitlist/unsubscribe?token=");
  });

  it("returns 200 when RESEND_FROM_EMAIL is unset (welcome uses Resend test sender)", async () => {
    delete process.env.RESEND_FROM_EMAIL;
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "x@example.com" }),
      }),
    );

    expect(response.status).toBe(200);
    const emailInit = fetchMock.mock.calls[1][1] as RequestInit;
    expect(JSON.parse(emailInit.body as string).from).toBe("Ayati <onboarding@resend.dev>");
  });

  it("returns 502 when Resend cannot add the contact", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(null, { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "hi@example.com" }),
      }),
    );

    await expect(response.json()).resolves.toEqual({
      error: "We could not add you right now. Please try again.",
    });
    expect(response.status).toBe(502);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns 200 when welcome email hits Resend test-mode recipient restriction (403)", async () => {
    const sandboxBody = JSON.stringify({
      statusCode: 403,
      name: "validation_error",
      message:
        "You can only send testing emails to your own email address (owner@example.com). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain.",
    });
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(sandboxBody, { status: 403 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "other@example.com" }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      message: expect.stringMatching(/Ayati waitlist/i),
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns 502 when Resend cannot send the welcome email", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "hi@example.com" }),
      }),
    );

    await expect(response.json()).resolves.toEqual({
      error: "We could not send the waitlist email right now. Please try again.",
    });
    expect(response.status).toBe(502);
  });

  it("rate limits after three accepted submissions in one hour", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const requestFor = (email: string) =>
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.10" },
        body: JSON.stringify({ email }),
      });

    expect((await POST(requestFor("one@example.com"))).status).toBe(200);
    expect((await POST(requestFor("two@example.com"))).status).toBe(200);
    expect((await POST(requestFor("three@example.com"))).status).toBe(200);
    const response = await POST(requestFor("four@example.com"));

    await expect(response.json()).resolves.toEqual({
      error: "Too many waitlist requests. Please try again later.",
    });
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("3600");
    expect(fetchMock).toHaveBeenCalledTimes(6);
  });

  it("unsubscribes from a valid email token", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const token = createWaitlistEmailToken("person@example.com", {
      secret: "test-secret-with-enough-entropy",
    });

    const response = await GET(
      new Request(`https://ayati.app/api/waitlist/unsubscribe?token=${token}`),
    );

    await expect(response.text()).resolves.toContain("unsubscribed");
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/contacts/person%40example.com", expect.any(Object));
  });

  it("supports one-click unsubscribe posts from email clients", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const token = createWaitlistEmailToken("person@example.com", {
      secret: "test-secret-with-enough-entropy",
    });

    const response = await UNSUBSCRIBE_POST(
      new Request(`https://ayati.app/api/waitlist/unsubscribe?token=${token}`, {
        method: "POST",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("");
  });
});
