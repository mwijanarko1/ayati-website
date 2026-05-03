import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono, Amiri, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

// Initialize Sora for display text
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

// Initialize Inter for UI/body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Initialize JetBrains Mono for technical text
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Initialize Amiri for Arabic verses
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

// Initialize Noto Naskh Arabic for Arabic UI
const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1713" },
  ],
};

// Define metadata for Ayati
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://ayati.app"),
  title: "Ayati - Strengthen your connection with the Quran",
  description: "Ayati is an AI-powered desktop companion designed to build lasting spiritual habits by transforming your screen context into real-time Quranic reflections. Deepen your engagement with the Word of Allah.",
  keywords: ["Ayati", "Quran", "Desktop Companion", "Reflection", "Islamic App", "AI Quran", "Quranic Guidance"],
  authors: [{ name: "Ayati Team" }],
  creator: "Ayati",
  publisher: "Ayati",
  openGraph: {
    title: "Ayati - Build Spiritual Habits Through Reflection",
    description: "Transform your screen context into real-time Quranic reflections and deepen your engagement with the Word of Allah.",
    url: "https://ayati.app",
    siteName: "Ayati",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayati Desktop Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayati - Strengthen your connection with the Quran",
    description: "An AI-powered companion for spiritual habit building and real-time Quranic reflection.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ayati.app/#organization",
      "name": "Ayati",
      "url": "https://ayati.app",
      "logo": "https://ayati.app/icon.png",
      "sameAs": [
        "https://github.com/mwijanarko1/ayati-quran-desktop-companion"
      ],
      "description": "Ayati is an AI-powered desktop companion designed to build lasting spiritual habits by transforming your screen context into real-time Quranic reflections."
    },
    {
      "@type": "WebSite",
      "@id": "https://ayati.app/#website",
      "url": "https://ayati.app",
      "name": "Ayati",
      "publisher": { "@id": "https://ayati.app/#organization" },
      "inLanguage": "en-US"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://ayati.app/#app",
      "name": "Ayati Quran Desktop Companion",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "macOS, Windows",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://ayati.app/#organization" },
      "description": "An AI-powered desktop companion that provides real-time Quranic reflections based on your screen context."
    }
  ]
};

import { CookieConsent } from "@/components/CookieConsent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} ${amiri.variable} ${notoNaskh.variable} antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-inter`}
      >
        <a
          href="#main-content"
          className="absolute -top-12 left-4 z-50 px-4 py-2 bg-emerald-600 text-white rounded-md transition-[top] duration-200 focus:top-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 font-sora"
        >
          Skip to main content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
