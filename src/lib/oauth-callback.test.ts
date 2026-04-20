import { buildAyatiOAuthCallbackUrl } from "./oauth-callback";

describe("buildAyatiOAuthCallbackUrl", () => {
  it("preserves Quran Foundation callback query parameters for the desktop app", () => {
    expect(buildAyatiOAuthCallbackUrl("?code=abc123&state=state-456")).toBe(
      "ayati://oauth/callback?code=abc123&state=state-456",
    );
  });

  it("handles an empty callback query", () => {
    expect(buildAyatiOAuthCallbackUrl("")).toBe("ayati://oauth/callback");
  });
});
