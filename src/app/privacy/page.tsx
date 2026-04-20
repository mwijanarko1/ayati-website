import type { Metadata } from "next";
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
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-bold text-lg transform group-hover:rotate-12 transition-transform">
              A
            </div>
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
            Last Updated: April 20, 2026
          </p>

          <div className="prose dark:prose-invert prose-emerald max-w-none">
            <p className="description-text mb-8">
              At Ayati, we are committed to protecting your privacy while helping you build a deeper connection with the Quran. This policy outlines how we handle your data when you use the Ayati desktop companion and website.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">1. Data Reflection & Privacy</h2>
            <p>
              Ayati is designed with a "privacy-first" philosophy. The core functionality of the desktop companion—analyzing your screen context to provide Quranic reflections—is processed locally on your machine whenever possible.
            </p>
            <ul>
              <li><strong>Local Processing:</strong> Most contextual analysis happens on your device to ensure your activity remains private.</li>
              <li><strong>Contextual Awareness:</strong> We only process active screen content when the app is enabled and focused on providing reflections.</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">2. Information We Collect</h2>
            <p>
              We collect minimal information necessary to provide and improve our services:
            </p>
            <ul>
              <li><strong>Account Information:</strong> If you create an account, we store your email address and basic profile details.</li>
              <li><strong>Usage Analytics:</strong> We may collect anonymous telemetry data to understand how the app is used and to fix bugs.</li>
              <li><strong>Reflections:</strong> Your favored verses and spiritual progress are synced across your devices if you are logged in.</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">3. Spiritual Integrity</h2>
            <p>
              Your spiritual journey is personal. We do not sell your data to third parties, nor do we use your Quranic reflections for targeted advertising. Our mission is spiritual growth, not data exploitation.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">4. AI and Machine Learning</h2>
            <p>
              Ayati uses AI to transform your context into reflections. While we use advanced models, we ensure that these processes respect the sanctity of the Quran and the privacy of the user. We do not use your personal context to train large-scale public models.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">5. Your Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul>
              <li><strong>GDPR (Europe):</strong> You have the right to access, rectify, or erase your data, the right to restrict processing, the right to data portability, and the right to object to processing.</li>
              <li><strong>CCPA (California):</strong> We do not sell your personal information. You have the right to know what data we collect and request its deletion.</li>
              <li><strong>COPPA (Children):</strong> Ayati is not directed at children under the age of 13. We do not knowingly collect information from children. If you believe we have accidentally collected data from a child, please contact us immediately.</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">6. Data Protection Officer</h2>
            <p>
              To exercise any of your rights or if you have questions about our privacy practices, please contact our privacy team at <a href="mailto:privacy@ayati.app" className="text-emerald-500 underline">privacy@ayati.app</a>.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Ayati. Registered in Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}
