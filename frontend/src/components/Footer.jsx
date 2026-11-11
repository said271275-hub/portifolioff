import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    sounds.playWhistle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t-3 border-black bg-cream-100 dark:bg-stadium-card py-10 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-2xl">⚽</span>
            <span className="font-display tracking-wider text-xl font-black text-navy dark:text-cream-100">
              {profile.team_badge || "FC FRONTEND UNITED"}
            </span>
          </div>
          <p className="mt-1 text-sm font-hand text-gray-600 dark:text-gray-300">
            Yaratuvchi: <span className="font-bold">{profile.full_name || "Shahina"}</span> • Scrapbook & Retro Futbol Portfolio
          </p>
        </div>

        <div className="text-xs font-mono text-gray-500">
          REACT + VITE + TAILWIND + DJANGO 5 REST FRAMEWORK
        </div>

        {/* Tepaga qaytish tugmasi */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 bg-referee-yellow border-2 border-black rounded-lg shadow-scrapbook-sm hover:-translate-y-1 active:translate-y-0 transition-transform font-mono font-bold text-xs text-black"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Tepaga (Boshlanish)</span>
        </button>

      </div>
    </footer>
  );
}

