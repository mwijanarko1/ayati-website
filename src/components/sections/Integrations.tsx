import React from 'react';

const integrations = [
  { name: "OpenAI", logoSrc: "/logos/openai.svg" },
  { name: "Anthropic", logoSrc: "/logos/anthropic.svg" },
  { name: "Google Gemini", logoSrc: "/logos/google-gemini.svg" },
  { name: "Quran Foundation", logoSrc: "/logos/quran-foundation.svg" },
  { name: "macOS", logoSrc: "/logos/macos.svg" },
  { name: "Windows", logoSrc: "/logos/windows.svg" },
  { name: "Linux", logoSrc: "/logos/linux.svg" }
];

export function Integrations() {
  return (
    <section id="integrations" className="py-20 bg-cream">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 font-mono">
              Working Together
            </h2>
            <p className="text-3xl md:text-4xl font-sora font-extrabold text-[#2D5A43] tracking-tight">
              Our Kind Friends.
            </p>
          </div>
          <p className="description-text max-w-sm text-sm">
            Ayati plays nicely with your favorite tools and the official Quran Foundation to make your day sparkle with wisdom.
          </p>
        </div>
      </div>

      <div className="marquee-container relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-40 before:bg-gradient-to-r before:from-cream before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-40 after:bg-gradient-to-l after:from-cream after:to-transparent after:z-10">
        <div className="marquee-content py-4">
          {[...integrations, ...integrations].map((item, index) => (
            <div 
              key={`${item.name}-${index}`} 
              className="flex items-center gap-4 px-10 py-6 glass-panel min-w-[280px] group hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src={item.logoSrc}
                  alt={`${item.name} logo`}
                  className="max-w-full max-h-full object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-emerald-600 transition-colors">
                  {item.name}
                </span>
                <span className="text-emerald-500/40 text-[9px] font-mono group-hover:text-emerald-500 transition-colors uppercase">
                  Best Friend
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


