const WAITLIST_RATE_LIMIT_MAX = 3;
const WAITLIST_RATE_LIMIT_WINDOW_MS = 1000 * 60 * 60;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const waitlistRateLimit = new Map<string, RateLimitEntry>();

export type WaitlistRateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export function checkWaitlistRateLimit(
  key: string,
  { now = new Date() }: { now?: Date } = {},
): WaitlistRateLimitResult {
  const nowMs = now.getTime();
  const current = waitlistRateLimit.get(key);

  if (!current || current.resetAt <= nowMs) {
    waitlistRateLimit.set(key, {
      count: 1,
      resetAt: nowMs + WAITLIST_RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (current.count >= WAITLIST_RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.resetAt - nowMs) / 1000),
    };
  }

  current.count += 1;
  waitlistRateLimit.set(key, current);

  return { allowed: true };
}

export function getWaitlistRateLimitKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return firstForwardedIp || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function resetWaitlistRateLimitForTests(): void {
  waitlistRateLimit.clear();
}
