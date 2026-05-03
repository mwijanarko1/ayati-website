import {
  createWaitlistEmailToken,
  verifyWaitlistEmailToken,
} from "./waitlist-email-token";

describe("waitlist email tokens", () => {
  const secret = "test-secret-with-enough-entropy";

  it("verifies a token for the email", () => {
    const token = createWaitlistEmailToken("person@example.com", { secret });

    expect(verifyWaitlistEmailToken(token, { secret })).toEqual({
      success: true,
      email: "person@example.com",
    });
  });

  it("rejects tampered tokens", () => {
    const token = createWaitlistEmailToken("person@example.com", { secret });

    expect(verifyWaitlistEmailToken(`${token.slice(0, -1)}x`, { secret })).toEqual({
      success: false,
    });
  });
});
