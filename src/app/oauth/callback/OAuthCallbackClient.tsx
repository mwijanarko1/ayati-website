"use client";

import { useCallback, useEffect, useState } from "react";

import { AYATI_OAUTH_CALLBACK_URL, buildAyatiOAuthCallbackUrl } from "@/lib/oauth-callback";

export function OAuthCallbackClient() {
  const [desktopCallbackUrl, setDesktopCallbackUrl] = useState(AYATI_OAUTH_CALLBACK_URL);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const callbackUrl = buildAyatiOAuthCallbackUrl(window.location.search);
    setDesktopCallbackUrl(callbackUrl);

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(callbackUrl);
    }, 350);

    return () => window.clearTimeout(redirectTimer);
  }, []);

  const copyCallbackUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(desktopCallbackUrl);
      setCopyStatus("Copied. Paste this into Ayati if the app does not open.");
    } catch {
      setCopyStatus("Select the callback URL and paste it into Ayati.");
    }
  }, [desktopCallbackUrl]);

  return (
    <section className="min-h-[100dvh] bg-[#f8faf8] text-[#111816] dark:bg-[#07120f] dark:text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col justify-center px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase text-emerald-700 dark:text-[#67E0A3]">
          Quran Foundation Sign-In
        </p>
        <h1 className="max-w-3xl font-sora text-4xl font-semibold leading-tight text-pretty md:text-6xl">
          Connecting to Ayati
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-700 dark:text-gray-300 md:text-lg">
          Your sign-in is ready to return to the desktop app. If Ayati does not open automatically, use the callback URL below in the Quran Foundation settings panel.
        </p>

        <div className="mt-10 max-w-3xl rounded-lg border border-emerald-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <label htmlFor="callback-url" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
            Callback URL
          </label>
          <textarea
            id="callback-url"
            readOnly
            value={desktopCallbackUrl}
            rows={4}
            className="mt-3 w-full resize-none rounded-md border border-gray-200 bg-gray-50 px-3 py-3 font-mono text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-[#07120f]/60 dark:text-gray-100"
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={desktopCallbackUrl}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#67E0A3] px-5 text-sm font-semibold text-[#07120f] transition-[background-color,transform] duration-200 hover:bg-[#7CF0BD] active:translate-y-px"
            >
              Open Ayati
            </a>
            <button
              type="button"
              onClick={copyCallbackUrl}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-800 transition-[background-color,transform] duration-200 hover:bg-gray-50 active:translate-y-px dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100 dark:hover:bg-white/[0.08]"
            >
              Copy Callback URL
            </button>
          </div>
          <p className="mt-3 min-h-5 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
            {copyStatus}
          </p>
        </div>
      </div>
    </section>
  );
}
