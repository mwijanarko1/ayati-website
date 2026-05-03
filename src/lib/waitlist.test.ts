import { parseWaitlistSubmission } from "./waitlist";

describe("parseWaitlistSubmission", () => {
  it("normalizes a valid email address", () => {
    const result = parseWaitlistSubmission({ email: "  PERSON@Example.COM " });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("person@example.com");
      expect(result.data.newsletterOptIn).toBe(false);
    }
  });

  it("preserves newsletter opt-in when true", () => {
    const result = parseWaitlistSubmission({
      email: "a@b.co",
      newsletterOptIn: true,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.newsletterOptIn).toBe(true);
    }
  });

  it("rejects invalid email addresses", () => {
    const result = parseWaitlistSubmission({ email: "not-an-email" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("Enter a valid email address.");
    }
  });
});
