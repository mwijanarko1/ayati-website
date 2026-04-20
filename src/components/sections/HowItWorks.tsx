import React from 'react';

const steps = [
  {
    title: "Soft Capture",
    description: "Press a gentle hotkey to catch the current theme of your screen. Ayati softly reads the content like a breeze passing through leaves.",
    icon: "🍃"
  },
  {
    title: "Sweet Synthesis",
    description: "Ayati finds the perfect Quranic verse to match your moment, creating a sweet bridge between your work and your heart.",
    icon: "🍯"
  },
  {
    title: "Quiet Reflection",
    description: "A beautiful verse card appears softly, offering a moment of peace and a helpful reflection for your journey.",
    icon: "✨"
  },
  {
    title: "Gentle Growth",
    description: "Watch your spiritual garden grow with streak tracking and soft goals that keep you connected every day.",
    icon: "🌸"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 font-mono">
              The Journey
            </h2>
            <h3 className="text-4xl md:text-5xl font-sora font-extrabold text-[#2D5A43] mb-6 tracking-tight">
              A peaceful path.
            </h3>
            <p className="description-text max-w-xl mx-auto">
              Ayati stays quiet and kind, appearing only when you need a little spark of wisdom in your day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="card-cute p-10 group hover:border-emerald-500/40 transition-all duration-500 bg-cream/50">
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-cute bg-emerald-500/10 flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-2xl font-sora font-bold text-[#2D5A43] mb-4 group-hover:text-emerald-500 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

