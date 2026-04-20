"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 animate-fade-in-up">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
          <div className="flex-1">
            <h3 className="text-lg font-sora font-bold text-gray-900 dark:text-white mb-2">
              Spiritual Privacy & Cookies
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              We use essential cookies to keep Ayati secure and optional analytics to improve your experience. Your spiritual data remains private and local. Learn more in our{' '}
              <Link href="/privacy" className="text-emerald-500 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
