import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { PrivacyReliability } from "@/components/sections/PrivacyReliability";
import { Integrations } from "@/components/sections/Integrations";
import { FinalCTA } from "@/components/sections/FinalCTA";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Integrations />
      <HowItWorks />
      <Features />
      <PrivacyReliability />
      <FinalCTA />
      
      <footer className="py-20 bg-cream border-t border-emerald/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="text-xl font-sora font-black text-[#2D5A43] tracking-tighter">
                Ayati
              </div>
              <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                Building a gentle, lifelong connection with the Quran through intelligent digital companionship.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-8">
                <a href="https://github.com/mwijanarko1/ayati-quran-desktop-companion" target="_blank" rel="noopener noreferrer" className="text-[#2D5A43] hover:text-emerald-500 transition-colors text-sm font-bold">GitHub</a>
                <Link href="/privacy" className="text-[#2D5A43] hover:text-emerald-500 transition-colors text-sm font-bold">Privacy</Link>
                <Link href="/terms" className="text-[#2D5A43] hover:text-emerald-500 transition-colors text-sm font-bold">Terms</Link>
              </div>
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">
                © {new Date().getFullYear()} Ayati
              </p>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-emerald/5 flex justify-center">
            <a href="/llms.txt" className="text-gray-300 hover:text-emerald-500 transition-colors text-[10px] font-mono tracking-widest uppercase" aria-label="Machine-readable site summary for AI systems">/llms.txt</a>
          </div>
        </div>
      </footer>


    </main>
  );
}
