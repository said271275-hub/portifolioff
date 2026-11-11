import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Shield } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Navbar({ isNight, setIsNight, isMuted, setIsMuted }) {
  const handleToggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playWhistle();
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      sounds.playKick();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 backdrop-blur-md bg-cream-200/80 dark:bg-stadium-night/85 border-b-2 border-black/80 dark:border-white/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logotip: Gazeta qirqmasi uslubida */}
        <div 
          onClick={() => scrollTo('hero')} 
          className="flex items-center gap-2 cursor-pointer group"
          role="button"
        >
          <div className="w-9 h-9 bg-referee-red text-white border-2 border-black shadow-scrapbook-sm rounded-full flex items-center justify-center font-display font-black text-lg group-hover:rotate-12 transition-transform">
            8
          </div>
          <div className="font-display tracking-wider text-xl md:text-2xl font-black uppercase text-navy dark:text-cream-100">
            HOJIAKBAR<span className="text-red-600">.DEV</span>
          </div>
        </div>

        {/* Navigatsiya menyulari */}
        <nav className="hidden md:flex items-center gap-6 font-bold text-lg text-gray-800 dark:text-cream-200">
          <button 
            onClick={() => scrollTo('hero')} 
            className="hover:text-referee-red hover:-rotate-2 transition-all relative py-1"
          >
            ID Karta
          </button>
          <button 
            onClick={() => scrollTo('skills')} 
            className="hover:text-referee-red hover:rotate-2 transition-all relative py-1"
          >
            Statistika (Skills)
          </button>
          <button 
            onClick={() => scrollTo('projects')} 
            className="hover:text-referee-red hover:-rotate-1 transition-all relative py-1"
          >
            O'yinlar (Projects)
          </button>
          <button 
            onClick={() => scrollTo('about')} 
            className="hover:text-referee-red hover:rotate-1 transition-all relative py-1"
          >
            Taktika (About)
          </button>
          <button 
            onClick={() => scrollTo('contact')} 
            className="hover:text-referee-red hover:-rotate-2 transition-all relative py-1"
          >
            Tablo (Contact)
          </button>
        </nav>

        {/* Tugmalar: Audio va Kun/Tun stadion projektori */}
        <div className="flex items-center gap-3">
          
          {/* Ovoz sozlamasi */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Ovozni yoqish (Hushtak va to'p)" : "Ovozni o'chirish"}
            className="w-10 h-10 rounded-md border-2 border-black bg-cream-100 dark:bg-stadium-card text-black dark:text-white shadow-scrapbook-sm hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center transition-transform"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          </button>

          {/* Kun / Tun stadion nurlari */}
          <button
            onClick={() => {
              setIsNight(!isNight);
              sounds.playKick();
            }}
            title={isNight ? "Kunduzgi stadion" : "Tungi stadion (Projektorlar)"}
            className="w-10 h-10 rounded-md border-2 border-black bg-cream-100 dark:bg-stadium-card text-black dark:text-yellow-400 shadow-scrapbook-sm hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center transition-transform"
          >
            {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Hushtak chalish kichik tugmasi */}
          <button
            onClick={() => sounds.playWhistle()}
            title="Hakam hushtagini chalish"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm font-bold bg-referee-yellow border-2 border-black shadow-scrapbook-sm hover:scale-105 active:scale-95 transition-all text-black"
          >
            <span>📢</span> Hushtak
          </button>
        </div>

      </div>
    </header>
  );
}

