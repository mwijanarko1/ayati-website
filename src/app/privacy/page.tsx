import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sora } from "next/font/google";

export const metadata: Metadata = {
  title: "Privacy Policy | Ayati",
  description: "Learn how Ayati protects your privacy. We process context locally, never sell your data, and are committed to your spiritual journey — not data exploitation.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export default function PrivacyPage() {
  return (
    <div className={`min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-inter ${sora.variable} overflow-hidden`}>
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-60 overflow-hidden">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-20 w-0.5 h-0.5 bg-emerald-400 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-1000" />
      </div>

      <header className="relative z-10 py-8 border-b border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/icon.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-lg object-cover transition-transform group-hover:rotate-12"
              priority
            />
            <span className="font-sora font-bold text-xl tracking-tight">Ayati</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-emerald-500 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-sora font-extrabold tracking-tighter mb-4 section-header">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-12 font-mono text-sm">
            Last Updated: May 3, 2026
          </p>

          <div className="prose dark:prose-invert prose-emerald max-w-none">
            <p className="description-text mb-8">
              This policy describes how Ayati handles information when you use the <strong>Ayati Quran Desktop Companion</strong> (the desktop app) and this <strong>website</strong>. The app and the site are different products—when practices differ, we say so below. This page is a plain-language summary and is not legal advice.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">1. Who We Are</h2>
            <p>
              Ayati is published by Mikhail Wijanarko. Privacy questions and requests can be sent to <a href="mailto:mikhailspeaks@gmail.com" className="text-emerald-500 underline">mikhailspeaks@gmail.com</a>. If a separate organization distributes a modified build of Ayati, that distributor is responsible for its own privacy notice and data practices.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">2. Data Reflection & Privacy</h2>
            <p>
              The desktop app is built around local-first processing: screen context and Quranic reflections are intended to stay on your computer. Settings, assistant chat history, reflection notes, optional Quran Foundation sign-in tokens, prayer and todo preferences, and similar data are stored locally in the app’s user data area—you do not need an Ayati-operated account just to run the app.
            </p>
            <ul>
              <li><strong>Local processing:</strong> Core reflection and analysis runs on your device whenever possible.</li>
              <li><strong>Optional permissions:</strong> Features such as screen capture or optional activity awareness only work if you enable them and grant the operating-system permissions the platform requires.</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">3. Information We Collect</h2>
            <p>
              <strong>Desktop app.</strong> Data leaves your device mainly when <em>you</em> use features that contact third parties—for example an AI provider you configure with your own API key, optional Quran Foundation authorization and APIs, Quran.com content APIs, verse media hosts, prayer-time services when you set a location, or automatic update checks that contact GitHub release infrastructure. Those organizations handle data under their own terms and privacy policies.
            </p>
            <p>
              <strong>This website.</strong> If you join our waitlist, we collect the email address you submit so we can send product updates and early-access information through our email provider, Resend. We also store submission metadata needed to operate the list, such as the source of the signup and submission time.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">4. How We Use and Share Data</h2>
            <p>
              We do not sell your personal information or use your Quranic reflections for targeted advertising. The open-source desktop companion, as documented in our engineering materials, is not designed around an Ayati-operated analytics “phone home” channel; what third parties receive depends on the features and credentials you enable.
            </p>
            <p>
              For the website waitlist, we use your email to manage early-access communication, answer related requests, maintain suppression/unsubscribe records, and protect the service from abuse. We share waitlist data with Resend as our email service provider. We may also disclose information if required by law, to protect rights and security, or with your consent.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">5. Legal Bases, Retention, and Transfers</h2>
            <p>
              Where GDPR or UK GDPR applies, we rely on legitimate interests for operating a requested waitlist and protecting the service, and legal obligation where we must keep records or respond to lawful requests. We keep waitlist data until you ask us to remove it, the list is no longer needed, or retention is required for legal or security reasons.
            </p>
            <p>
              Resend and other third-party providers may process data in countries outside your own. Where required, those transfers should be covered by appropriate safeguards provided by the relevant provider.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">6. AI and Machine Learning</h2>
            <p>
              When you use assistant or vision flows, prompts and images are sent to the <strong>AI endpoint you configure</strong> using <strong>your</strong> credentials. Providers may log or retain content under their own policies—do not paste secrets or highly sensitive personal data into prompts. Review important religious questions with the Quran and qualified scholars; model output can be incomplete or mistaken.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">7. Your Rights</h2>
            <p>
              Depending on where you live, privacy laws may give you rights to access, correct, delete, restrict, object to, or receive a copy of personal data, and to withdraw consent where processing relies on consent. Much of the desktop app’s processing stays on your device—you can delete local data by clearing app data or uninstalling. For information processed by third-party services, use their dashboards (for example revoking API keys or disconnecting Quran Foundation) or contact them directly where they act as independent controllers.
            </p>
            <ul>
              <li><strong>GDPR / UK GDPR:</strong> You may also have the right to complain to your local supervisory authority, including the UK Information Commissioner’s Office if UK law applies.</li>
              <li><strong>CCPA / U.S. state laws:</strong> We do not sell or share your personal information for cross-context behavioral advertising based on the desktop product and website practices described here. For information collected through this site (such as waitlist email), contact us below.</li>
              <li><strong>Children:</strong> Ayati is not directed at children under 13, and we do not knowingly collect information from children.</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">8. Contact</h2>
            <p>
              Privacy questions: <a href="mailto:mikhailspeaks@gmail.com" className="text-emerald-500 underline">mikhailspeaks@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Ayati. Built by{' '}
            <a
              href="https://mikhailwijanarko.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 underline hover:text-emerald-600"
            >
              @mikhailbuilds
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
