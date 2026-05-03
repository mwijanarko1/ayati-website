import { createHmac, timingSafeEqual } from "node:crypto";

type TokenOptions = {
  secret: string;
};

export type WaitlistEmailTokenResult =
  | { success: true; email: string }
  | { success: false };

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export function createWaitlistEmailToken(email: string, { secret }: TokenOptions): string {
  const encodedEmail = Buffer.from(email).toString("base64url");
  const signature = sign(encodedEmail, secret);

  return `${encodedEmail}.${signature}`;
}

export function verifyWaitlistEmailToken(
  token: string,
  { secret }: TokenOptions,
): WaitlistEmailTokenResult {
  const [encodedEmail, signature, extra] = token.split(".");

  if (!encodedEmail || !signature || extra) {
    return { success: false };
  }

  if (!safeEqual(signature, sign(encodedEmail, secret))) {
    return { success: false };
  }

  const email = Buffer.from(encodedEmail, "base64url").toString("utf8");

  return email ? { success: true, email } : { success: false };
}
