import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sora } from "next/font/google";

export const metadata: Metadata = {
  title: "Terms of Service | Ayati",
  description: "Read the Ayati Terms of Service. Use our AI-powered Quranic desktop companion for its intended spiritual and educational purposes.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
};

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-12 font-mono text-sm">
            Last Updated: May 3, 2026
          </p>

          <div className="prose dark:prose-invert prose-emerald max-w-none">
            <p className="description-text mb-8">
              These Terms apply when you use the Ayati Quran Desktop Companion, related materials we publish, and this website. They complement the open-source <strong>MIT License</strong> file shipped with the repository. If you do not agree, do not use the software or site.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, accessing, submitting information to, or using the desktop app or website, you agree to these Terms. If you use Ayati on behalf of an organization, you represent that you have authority to bind that organization. If a separate distributor publishes a modified build, that distributor may provide additional or different terms for its own build.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">2. Use of Service</h2>
            <p>
              Ayati is a desktop companion that may capture or analyze screen content when you invoke those features and grant OS permissions; send text or images to AI providers <strong>you</strong> configure; connect to Quran Foundation, Quran.com, verse media hosts, prayer-time APIs, and update servers as summarized in our Privacy Policy; and store settings and history locally on your device. Features may change between releases.
            </p>
            <ul>
              <li><strong>Spiritual and educational use:</strong> Use Ayati only for lawful, respectful purposes aligned with its intent.</li>
              <li><strong>Ethical use:</strong> Do not use Ayati to violate applicable law, harass others, infringe intellectual property, overload third-party services, or generate content that contradicts Quranic teachings or promotes harm.</li>
              <li><strong>Your responsibility:</strong> You are responsible for laws that apply to you (including workplace monitoring rules), for safeguarding API keys and OAuth tokens, and for ensuring you have the right to capture or analyze on-screen content in your environment.</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">3. Intellectual Property</h2>
            <p>
              The Ayati desktop application source code is distributed under the <strong>MIT License</strong> published in the project repository (copyright Mikhail Wijanarko). Ayati branding, marketing copy on this website, and assets not covered by that license remain subject to applicable intellectual property laws. Quranic text and third-party fonts, recitations, or API content remain property of their respective owners.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">4. User Content & Reflections</h2>
            <p>
              Reflections and notes you create are yours. When you use features that send content to third-party services, you instruct Ayati to transmit that content under your responsibility and the third party’s terms.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">5. Waitlist and Email</h2>
            <p>
              If you submit the waitlist form, you are responsible for providing an email address you control. Emails related to the waitlist should include a way to unsubscribe where required by law. We may remove addresses from the waitlist or stop sending emails if messages bounce, are reported as spam, or the list is discontinued.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">6. Limitation of Liability</h2>
            <p>
              Ayati is provided <strong>“as is”</strong> without warranties of any kind to the maximum extent permitted by law. Quranic material, translations, tafsir, and AI-generated output are <strong>educational and devotional aids only</strong>; they may contain errors, omissions, or model mistakes and are <strong>not</strong> fatwa or a substitute for qualified scholars. Third-party services may change availability or policies without notice. Some jurisdictions limit liability exclusions; where so, those provisions apply only to the extent allowed.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">7. Modifications</h2>
            <p>
              We may update these Terms (for example when practices change). Continued use after the effective date constitutes acceptance unless applicable law requires a different process. The app may install updates automatically or when you choose to update, depending on platform behavior.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of <strong>England and Wales</strong>, without regard to conflict-of-law principles that would apply another country’s laws. If you are a consumer, mandatory protections—including non-waivable rights under UK law—still apply where the law requires. Subject to that, disputes shall be resolved in the courts of England and Wales.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">9. Contact</h2>
            <p>
              Questions about these Terms: <a href="mailto:mikhailspeaks@gmail.com" className="text-emerald-500 underline">mikhailspeaks@gmail.com</a>.
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
