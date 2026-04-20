import React from 'react';

const features = [
  {
    title: "Gentle Companion",
    description: "An always-on-top window that stays with you, providing quiet guidance at a glance without ever getting in your way.",
    className: "bento-item-medium",
    icon: "🕊️"
  },
  {
    title: "Kind Hearts AI",
    description: "Ayati softly understands what's on your screen and finds the perfect verse to brighten your moment.",
    className: "bento-item-large",
    icon: "✨"
  },
  {
    title: "Deep Wisdom",
    description: "Expand any verse to explore beautiful tafsir insights or listen to peaceful recitations from your favorite qaris.",
    className: "",
    icon: "📖"
  },
  {
    title: "Personal Library",
    description: "Keep a warm collection of verses that touch your heart. Save reflections and look back at your spiritual history.",
    className: "",
    icon: "🔖"
  },
  {
    title: "Daily Sparkle",
    description: "Build a lifelong habit with gentle streak tracking and soft goals that keep you connected to the Quran every day.",
    className: "bento-item-medium",
    icon: "🌱"
  },
  {
    title: "Choose Your Path",
    description: "Select your preferred translations, reciters, and AI models for an experience that feels like home.",
    className: "bento-item-medium",
    icon: "🧭"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 font-mono">
            Love & Care
          </h2>
          <h3 className="text-4xl md:text-5xl font-sora font-extrabold text-[#2D5A43] mb-6 tracking-tight">
            Everything you need for your journey.
          </h3>
          <p className="description-text max-w-2xl">
            We've carefully built Ayati with all the features from our roadmap to ensure your Quranic connection is deep, personal, and lasting.
          </p>
        </div>

        <div className="bento-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`card-cute group flex flex-col p-8 ${feature.className}`}
            >
              <div className="text-4xl mb-auto group-hover:scale-125 transition-transform duration-500 bg-mint/30 w-16 h-16 flex items-center justify-center rounded-cute">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-2xl font-sora font-bold text-[#2D5A43] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


