import { z } from "zod";

const waitlistSubmissionSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address."),
});

export type WaitlistSubmission = z.infer<typeof waitlistSubmissionSchema>;

export type WaitlistSubmissionResult =
  | { success: true; data: WaitlistSubmission }
  | { success: false; error: string };

export function parseWaitlistSubmission(input: unknown): WaitlistSubmissionResult {
  const result = waitlistSubmissionSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    error: result.error.issues[0]?.message ?? "Enter a valid email address.",
  };
}
