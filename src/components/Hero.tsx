import Image from "next/image";
import Link from "next/link";
import { HeroWaitlistDialog } from "@/components/HeroWaitlistDialog";

/** Toggle when the macOS release link should appear in the hero again. */
const SHOW_HERO_DOWNLOAD = false;

/**
 * Calm & Cute Hero component for Ayati
 */
export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-cream pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:pt-6 lg:min-h-screen lg:items-center lg:justify-center lg:pt-32 lg:pb-24">
      {/* Gentle floating blobs — scaled down on small screens */}
      <div className="pointer-events-none absolute left-[12%] top-0 h-[min(220px,55vw)] w-[min(220px,55vw)] rounded-full bg-mint/30 blur-[72px] animate-blob sm:left-1/4 sm:h-[320px] sm:w-[320px] sm:blur-[90px] md:h-[400px] md:w-[400px] md:blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] h-[min(260px,65vw)] w-[min(260px,65vw)] rounded-full bg-emerald/10 blur-[88px] animate-blob animation-delay-2000 sm:bottom-10 sm:right-1/4 sm:h-[400px] sm:w-[400px] sm:blur-[110px] md:h-[500px] md:w-[500px] md:blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            <h1 className="mb-1 animate-fade-in-up font-sora text-[clamp(2.625rem,9.5vw+0.35rem,6.25rem)] font-black leading-[0.95] tracking-[-0.04em] text-[#2D5A43] sm:text-[clamp(3rem,8vw+0.5rem,6.25rem)] lg:mb-2 lg:text-[100px]">
              Ayati<span className="text-emerald-500">.</span>
            </h1>

            <h2 className="animate-fade-in-up delay-100 max-w-[20ch] font-sora text-lg font-bold italic leading-snug tracking-tight text-emerald-600 text-balance sm:max-w-[24ch] sm:text-xl md:max-w-none md:text-2xl lg:mb-8 lg:text-3xl">
              Your Desktop Companion Who Knows Quran
            </h2>

            <p className="animate-fade-in-up delay-200 mb-8 mt-4 max-w-md text-pretty text-base font-medium leading-relaxed text-gray-500 sm:mt-5 sm:max-w-lg sm:text-lg lg:mb-10 lg:mt-0 lg:text-xl">
              Ayati matches verses to your workflow, with a simple to-do list, prayer-time reminders, and a Pomodoro timer, so
              focus, salah, and the Quran stay close to your day.
            </p>

            <div className="flex w-full max-w-sm flex-col items-center sm:max-w-none lg:items-start">
              <div className="inline-grid w-max max-w-full grid-cols-1 justify-items-stretch gap-4">
                <div className="animate-fade-in-up delay-300 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
                  {SHOW_HERO_DOWNLOAD ? (
                    <a
                      href="https://github.com/mwijanarko1/ayati-quran-desktop-companion/releases/tag/ayati-mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-cute bg-emerald-500 px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-emerald-500/20 transition-all duration-500 hover:bg-emerald-400 hover:-translate-y-0.5 active:translate-y-0 sm:px-10 sm:py-5 sm:text-lg lg:transform lg:hover:-translate-y-2"
                    >
                      Download
                    </a>
                  ) : null}
                  <HeroWaitlistDialog triggerClassName="sm:w-full" />
                </div>

                <nav
                  className="animate-fade-in-up delay-400 flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm text-gray-500 lg:justify-start"
                  aria-label="Legal"
                >
                  <Link href="/privacy" className="text-emerald-600 underline-offset-2 hover:text-emerald-500 hover:underline">
                    Privacy Policy
                  </Link>
                  <span className="mx-2 text-gray-300" aria-hidden>
                    ·
                  </span>
                  <Link href="/terms" className="text-emerald-600 underline-offset-2 hover:text-emerald-500 hover:underline">
                    Terms of Service
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[min(17.5rem,78vw)] perspective-1000 sm:max-w-xs md:max-w-sm lg:mx-0 lg:max-w-none">
            <div className="absolute inset-0 rounded-full bg-mint opacity-30 blur-3xl animate-pulse" />
            <div className="relative p-2 sm:p-4 lg:animate-float">
              <Image
                src="/icon.png"
                alt="Ayati Mascot - A friendly little creature reading the Quran"
                width={700}
                height={700}
                sizes="(max-width: 1024px) 78vw, 45vw"
                className="h-auto w-full drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
