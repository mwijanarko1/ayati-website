import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_AUDIENCE_ID: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().min(1).optional(),
  WAITLIST_UNSUBSCRIBE_SECRET: z.string().min(16).optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables at runtime. Import and call where env is needed
 * (e.g. in API routes, server components). Extend the schema when adding Clerk, Convex, etc.
 */
export function getEnv(): Env {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    WAITLIST_UNSUBSCRIBE_SECRET: process.env.WAITLIST_UNSUBSCRIBE_SECRET,
  });

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}
