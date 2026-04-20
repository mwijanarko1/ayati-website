import Image from "next/image";

/**
 * Calm & Cute Hero component for Ayati
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-cream">
      {/* Gentle Floating Blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-mint/30 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-emerald/10 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left max-w-xl">
            {/* Friendly Greeting */}
            <div className="mb-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-[#2D5A43] text-sm font-bold">
                <span className="badge-pill !py-0.5 !px-2 !text-[9px] !bg-emerald-500 !text-white">HACKATHON</span>
                <span>An Official Quran Foundation Submission</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl font-sora font-extrabold tracking-tight text-[#2D5A43] mb-6 leading-[1.05] text-balance">
              Meet <span className="text-emerald-500">Ayati.</span> <br />
              Your Quran Desktop Companion.
            </h1>

            {/* Tagline */}
            <h2 className="text-xl md:text-2xl font-sora font-medium text-gray-500 mb-8 max-w-md leading-relaxed">
              Ayati softly looks at your screen and shares a beautiful Quranic verse, translation, and reflection—exactly when you need it most.
            </h2>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              <a
                href="#download"
                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-cute transition-all duration-500 shadow-xl shadow-emerald-500/20 transform hover:-translate-y-2 w-full sm:w-auto text-center text-lg"
              >
                Start Your Journey
              </a>
              <a
                href="https://github.com/mwijanarko1/ayati-quran-desktop-companion"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white border-2 border-mint text-[#2D5A43] font-bold rounded-cute transition-all duration-500 transform hover:-translate-y-2 w-full sm:w-auto text-center text-lg"
              >
                Join Our Nest
              </a>
            </div>
          </div>

          {/* Cute Mascot Showcase */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-mint rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="relative animate-float p-4">
              <Image 
                src="/icon.png" 
                alt="Ayati Mascot - A friendly little creature reading the Quran" 
                width={700} 
                height={700} 
                className="drop-shadow-2xl"
                priority
              />
            </div>
            
            {/* Friendly Floating Tips */}
            <div className="absolute -top-6 -right-6 glass-panel p-6 shadow-xl hidden md:block">
              <div className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">Gentle Note</div>
              <div className="text-gray-600 font-sora font-bold text-sm">"Verily, with hardship comes ease."</div>
            </div>
            
            <div className="absolute -bottom-4 -left-6 glass-panel p-4 shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <span className="text-gray-500 text-xs font-bold font-mono">Your heart is safe here.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 