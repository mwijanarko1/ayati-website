import { afterEach, describe, expect, it, vi } from "vitest";
import nextConfig from "../../next.config.mjs";

function getCspFromHeaders() {
  return nextConfig.headers?.().then((headers) =>
    headers?.flatMap((route) => route.headers).find((header) => header.key === "Content-Security-Policy")?.value,
  );
}

describe("nextConfig security headers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows Next.js inline bootstrap scripts needed for client hydration", async () => {
    const contentSecurityPolicy = await getCspFromHeaders();

    expect(contentSecurityPolicy).toBeDefined();
    expect(contentSecurityPolicy).toContain("script-src 'self' 'unsafe-inline'");
  });

  it("does not allow unsafe-eval outside development (production CSP)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const contentSecurityPolicy = await getCspFromHeaders();

    expect(contentSecurityPolicy).toBeDefined();
    expect(contentSecurityPolicy).not.toContain("'unsafe-eval'");
  });

  it("allows unsafe-eval in development for React dev tooling (RSC / Turbopack)", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const contentSecurityPolicy = await getCspFromHeaders();

    expect(contentSecurityPolicy).toBeDefined();
    expect(contentSecurityPolicy).toContain("'unsafe-eval'");
  });
});
