"use client";

import { FormEvent, useId, useState } from "react";
import { CheckCircle, EnvelopeSimple, WarningCircle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const formId = useId();
  const emailFieldId = `waitlist-email-${formId}`;
  const messageFieldId = `waitlist-message-${formId}`;

  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email }),
      });
    } catch {
      setSubmissionState("error");
      setMessage("We could not reach the waitlist. Please try again.");
      return;
    }

    const result = (await response.json().catch(() => null)) as {
      error?: string;
      message?: string;
    } | null;

    if (!response.ok) {
      setSubmissionState("error");
      setMessage(result?.error ?? "We could not add you right now. Please try again.");
      return;
    }

    setEmail("");
    setSubmissionState("success");
    setMessage(result?.message ?? "You are on the Ayati waitlist. We sent you a confirmation email.");
  }

  const isSubmitting = submissionState === "submitting";
  const statusRegionIdle = submissionState === "idle" && message === "";

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-2" noValidate>
      <label htmlFor={emailFieldId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="relative min-w-0 flex-1">
          <EnvelopeSimple
            size={18}
            weight="bold"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 sm:left-4"
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
            className="h-11 w-full rounded-xl border-2 border-mint bg-white py-2 pl-10 pr-3 text-sm font-semibold text-[#2D5A43] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 sm:h-12 sm:rounded-2xl sm:pl-11 sm:pr-3.5 sm:text-base"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 shrink-0 rounded-xl bg-emerald-500 px-5 font-sora text-sm font-black text-white shadow-md shadow-emerald-500/20 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:h-12 sm:rounded-2xl sm:px-7 sm:text-base"
        >
          {isSubmitting ? "Joining…" : "Join Waitlist"}
        </button>
      </div>

      <p
        id={messageFieldId}
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-start justify-center gap-2 text-center text-sm font-semibold text-[#2D5A43]",
          statusRegionIdle ? "sr-only" : "mt-2",
        )}
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
