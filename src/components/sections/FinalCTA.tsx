import { HeroWaitlistDialog } from "@/components/HeroWaitlistDialog";

export function FinalCTA() {
  return (
    <section id="download" className="py-32 bg-cream relative overflow-hidden">
      {/* Gentle Artistic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600 mb-6 font-mono">
            A New Beginning
          </h2>
          <h3 className="text-5xl md:text-7xl font-sora font-extrabold text-[#2D5A43] mb-8 tracking-tight leading-tight text-balance">
             Ready to find <span className="text-emerald-500 italic">your peace?</span>
          </h3>
          <p className="description-text max-w-2xl mx-auto mb-16 text-lg">
            Download Ayati today and join a community dedicated to building a lifelong, gentle connection with the Quran. We can't wait to see your spiritual garden grow.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="https://github.com/mwijanarko1/ayati-quran-desktop-companion/releases"
            className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-cute transition-all duration-500 shadow-2xl shadow-emerald-500/20 transform hover:-translate-y-2 w-full sm:w-auto text-lg"
          >
            Download Ayati
          </a>
          <HeroWaitlistDialog triggerClassName="w-full bg-white px-12 py-5 text-lg sm:w-auto" />
        </div>

        <div className="mt-32 pt-16 border-t border-emerald/10">
          {/* Section for footer links or spacer if needed in future */}
        </div>
      </div>
    </section>
  );
}
