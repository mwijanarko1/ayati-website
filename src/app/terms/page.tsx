import type { Metadata } from "next";
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
            Terms of Service
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-12 font-mono text-sm">
            Last Updated: April 20, 2026
          </p>

          <div className="prose dark:prose-invert prose-emerald max-w-none">
            <p className="description-text mb-8">
              Welcome to Ayati. By using our desktop companion or website, you agree to these terms. Please read them carefully.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Ayati, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">2. Use of Service</h2>
            <p>
              Ayati provides an AI-powered Quranic reflection tool. You agree to use the service only for its intended spiritual and educational purposes.
            </p>
            <ul>
              <li><strong>Local Environment:</strong> You are responsible for ensuring your system meets the requirements for the desktop companion.</li>
              <li><strong>Ethical Use:</strong> You agree not to use Ayati to generate or distribute content that contradicts the teachings of the Quran or promotes harm.</li>
            </ul>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">3. Intellectual Property</h2>
            <p>
              The Ayati software, brand, and website content (excluding the text of the Quran itself) are the property of the Ayati team and are protected by intellectual property laws. The Quranic text is used with respect to its public domain and spiritual status.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">4. User Content & Reflections</h2>
            <p>
              Any reflections or notes you create within Ayati are yours. We do not claim ownership over your personal spiritual insights.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">5. Limitation of Liability</h2>
            <p>
              Ayati is provided "as is" without warranties of any kind. While we strive for accuracy in AI-generated reflections, you should always consult original Quranic sources and scholars for definitive guidance.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">6. Modifications</h2>
            <p>
              We may update these terms from time to time. Your continued use of the service after such changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Republic of Indonesia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Indonesia.
            </p>

            <h2 className="text-2xl font-sora font-bold mt-12 mb-6 text-emerald-500">8. Contact</h2>
            <p>
              For any questions regarding these terms, contact us at <a href="mailto:legal@ayati.app" className="text-emerald-500 underline">legal@ayati.app</a>.
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
