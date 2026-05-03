import { describe, expect, it } from "vitest";

import { BRAND, buildWaitlistConfirmationEmailHtml, buildWaitlistUnsubscribePageHtml, escapeHtml } from "./waitlist-transactional-brand";

describe("waitlist-transactional-brand", () => {
  it("escapes HTML for safe injection", () => {
    expect(escapeHtml(`a"b&c<d>`)).toBe("a&quot;b&amp;c&lt;d&gt;");
  });

  it("confirmation email HTML uses brand emerald and includes escaped unsubscribe URL", () => {
    const html = buildWaitlistConfirmationEmailHtml("https://ayati.app/api/waitlist/unsubscribe?token=ab&c=1");
    expect(html).toContain(BRAND.emerald);
    expect(html).toContain(BRAND.celadon);
    expect(html).toContain("https://ayati.app/api/waitlist/unsubscribe?token=ab&amp;c=1");
  });

  it("unsubscribe page HTML includes wordmark and heading", () => {
    const html = buildWaitlistUnsubscribePageHtml({
      pageTitle: "Test",
      heading: "Done.",
      message: "Extra.",
    });
    expect(html).toContain("Ayati");
    expect(html).toContain("Done.");
    expect(html).toContain("Extra.");
    expect(html).toContain(BRAND.canvas);
  });
});
