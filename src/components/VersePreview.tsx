import React from 'react';

export function VersePreview() {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl shadow-emerald-500/10 border border-emerald-100 dark:border-emerald-900/50 relative overflow-hidden group">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center">
          <span className="text-white font-bold text-xs">A</span>
        </div>
        <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Sura 94:6 • Ease
        </div>
      </div>
      
      {/* Arabic Verse */}
      <div className="text-right mb-8 relative z-10">
        <p className="text-3xl md:text-4xl font-amiri leading-[1.5] text-gray-900 dark:text-white">
          فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
        </p>
      </div>
      
      {/* Translation */}
      <div className="mb-8 relative z-10">
        <p className="text-lg md:text-xl font-sora font-semibold text-gray-800 dark:text-gray-200 leading-snug">
          "For indeed, with hardship [will be] ease."
        </p>
      </div>
      
      {/* Reflection */}
      <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100/50 dark:border-emerald-800/30 mb-8 relative z-10 hover:border-emerald-500/30 transition-colors">
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 italic leading-relaxed">
          It looks like you're dealing with a complex task. Remember that resolution follows focus, and every challenge contains the seeds of its own solution.
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex gap-3 relative z-10">
        <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20">
          Bookmark
        </button>
        <button className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-2xl font-bold text-sm transition-all">
          Details
        </button>
      </div>
      
      {/* Status Bar */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Theme: Resilience</span>
        </div>
        <span>Match: 98%</span>
      </div>
    </div>
  );
}
