import Image from 'next/image';
import { Cloud, House } from "@phosphor-icons/react/dist/ssr";

export function PrivacyReliability() {
  return (
    <section id="privacy" className="py-24 bg-cream relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 font-mono">
              Safe & Sound
            </h2>
            <h3 className="text-4xl md:text-5xl font-sora font-extrabold text-[#2D5A43] mb-8 tracking-tight">
              Your Privacy is <br />
              <span className="text-emerald-500 italic">Safe in Our Nest.</span>
            </h3>
            <p className="description-text max-w-xl mb-12 text-lg">
              We care deeply about your digital peace. Ayati is built to be a kind guest on your computer, never overstaying its welcome or taking what isn't offered.
            </p>
            
            <div className="space-y-6">
              <div className="card-cute p-6 flex items-start gap-6 border-emerald-500/10 hover:border-emerald-500 transition-all group">
                <div className="w-12 h-12 flex-shrink-0 bg-mint rounded-cute flex items-center justify-center">
                  <Cloud size={24} weight="duotone" className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-sora font-bold text-[#2D5A43] mb-2">Passing Clouds</h3>
                  <p className="text-gray-500">Analysis happens in a blink and then disappears. We never save your screen data to your disk or our servers.</p>
                </div>
              </div>
              
              <div className="card-cute p-6 flex items-start gap-6 border-emerald-500/10 hover:border-emerald-500 transition-all group">
                <div className="w-12 h-12 flex-shrink-0 bg-mint rounded-cute flex items-center justify-center">
                  <House size={24} weight="duotone" className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-sora font-bold text-[#2D5A43] mb-2">Local Comfort</h3>
                  <p className="text-gray-500">Your journal, streaks, and settings stay right where they belong: on your device, tucked away safely.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="glass-panel !p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald/20 rounded-full blur-3xl group-hover:bg-emerald/30 transition-all" />
              
              <div className="space-y-8 relative z-10 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-mint overflow-hidden">
                  <Image src="/icon.png" alt="Ayati Mascot" width={60} height={60} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-sora font-bold text-[#2D5A43]">The Ayati Promise</h4>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-emerald-400" />
                    ))}
                  </div>
                  <p className="text-gray-500 font-medium italic">
                    "We promise to respect your screen, <br /> 
                    to keep your data private and clean, <br />
                    and to be the kindest guest you've seen."
                  </p>
                </div>
                <div className="pt-6 border-t border-emerald/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Verified Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

