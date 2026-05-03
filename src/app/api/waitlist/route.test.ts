import { POST } from "./route";

describe("POST /api/waitlist", () => {
  const originalApiKey = process.env.RESEND_API_KEY;
  const originalAudienceId = process.env.RESEND_AUDIENCE_ID;
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    process.env.RESEND_API_KEY = originalApiKey;
    process.env.RESEND_AUDIENCE_ID = originalAudienceId;
    vi.stubGlobal("fetch", originalFetch);
  });

  it("rejects invalid email submissions", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_AUDIENCE_ID = "78261eea-8f8b-4381-83c6-79fa7120f1cf";

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

  it("calls Resend and returns ok for a valid email", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_AUDIENCE_ID = "78261eea-8f8b-4381-83c6-79fa7120f1cf";
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "  PERSON@Example.COM " }),
      }),
    );

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalled();
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const body = JSON.parse(init.body as string);
    expect(body.email).toBe("person@example.com");
    expect(body.properties.newsletter_opt_in).toBe("false");
  });

  it("returns 502 when Resend returns an error", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_AUDIENCE_ID = "78261eea-8f8b-4381-83c6-79fa7120f1cf";
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));
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
  });

  it("returns ok when Resend reports duplicate contact (409)", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_AUDIENCE_ID = "78261eea-8f8b-4381-83c6-79fa7120f1cf";
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 409 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("https://ayati.app/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: "dup@example.com", newsletterOptIn: true }),
      }),
    );

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(init.body as string).properties.newsletter_opt_in).toBe("true");
  });
});
