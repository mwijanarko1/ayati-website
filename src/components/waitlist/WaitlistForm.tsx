"use client";

import { FormEvent, useId, useState } from "react";
import { CheckCircle, EnvelopeSimple, WarningCircle } from "@phosphor-icons/react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const formId = useId();
  const emailFieldId = `waitlist-email-${formId}`;
  const messageFieldId = `waitlist-message-${formId}`;

  const [email, setEmail] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setMessage("");

    let response: Response;

    try {
      response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newsletterOptIn }),
      });
    } catch {
      setSubmissionState("error");
      setMessage("We could not reach the waitlist. Please try again.");
      return;
    }

    const result = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setSubmissionState("error");
      setMessage(result?.error ?? "We could not add you right now. Please try again.");
      return;
    }

    setEmail("");
    setNewsletterOptIn(false);
    setSubmissionState("success");
    setMessage("You are on the Ayati waitlist. We will email you when early access opens.");
  }

  const isSubmitting = submissionState === "submitting";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl" noValidate>
      <div className="glass-panel flex flex-col gap-3 !rounded-[2rem] p-3 shadow-2xl shadow-emerald-500/10">
        <label htmlFor={emailFieldId} className="sr-only">
          Email address
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <EnvelopeSimple
              size={22}
              weight="bold"
              aria-hidden="true"
              className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600"
            />
            <input
              id={emailFieldId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              required
              aria-describedby={messageFieldId}
              aria-invalid={submissionState === "error"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-16 w-full rounded-[1.5rem] border-2 border-mint bg-white px-14 text-base font-semibold text-[#2D5A43] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-16 rounded-[1.5rem] bg-emerald-500 px-8 font-sora text-base font-black text-white shadow-lg shadow-emerald-500/20 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Joining…" : "Join Waitlist"}
          </button>
        </div>

        <label className="flex cursor-pointer items-start gap-3 px-1 pb-0.5 text-left text-sm font-semibold leading-snug text-gray-600">
          <input
            type="checkbox"
            name="newsletterOptIn"
            checked={newsletterOptIn}
            onChange={(event) => setNewsletterOptIn(event.target.checked)}
            className="mt-1 size-4 shrink-0 rounded border-2 border-mint text-emerald-600 accent-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/25"
          />
          <span>
            Also send me occasional newsletter emails about your other cool projects.
          </span>
        </label>
      </div>

      <p
        id={messageFieldId}
        role="status"
        aria-live="polite"
        className="mt-5 flex min-h-7 items-start justify-center gap-2 text-center text-sm font-semibold text-[#2D5A43]"
      >
        {submissionState === "success" ? (
          <CheckCircle size={20} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-600" />
        ) : null}
        {submissionState === "error" ? (
          <WarningCircle size={20} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0 text-red-500" />
        ) : null}
        <span>{message}</span>
      </p>
    </form>
  );
}
