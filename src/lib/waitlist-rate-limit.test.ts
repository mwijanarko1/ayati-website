import {
  checkWaitlistRateLimit,
  resetWaitlistRateLimitForTests,
} from "./waitlist-rate-limit";

describe("checkWaitlistRateLimit", () => {
  const now = new Date("2026-05-03T12:00:00.000Z");

  afterEach(() => {
    resetWaitlistRateLimitForTests();
  });

  it("allows three attempts per key within one hour", () => {
    expect(checkWaitlistRateLimit("203.0.113.10", { now }).allowed).toBe(true);
    expect(checkWaitlistRateLimit("203.0.113.10", { now }).allowed).toBe(true);
    expect(checkWaitlistRateLimit("203.0.113.10", { now }).allowed).toBe(true);

    expect(checkWaitlistRateLimit("203.0.113.10", { now })).toEqual({
      allowed: false,
      retryAfterSeconds: 3600,
    });
  });

  it("resets after the hour window expires", () => {
    expect(checkWaitlistRateLimit("203.0.113.10", { now }).allowed).toBe(true);
    expect(checkWaitlistRateLimit("203.0.113.10", { now }).allowed).toBe(true);
    expect(checkWaitlistRateLimit("203.0.113.10", { now }).allowed).toBe(true);

    expect(
      checkWaitlistRateLimit("203.0.113.10", {
        now: new Date(now.getTime() + 3_600_001),
      }).allowed,
    ).toBe(true);
  });
});
