import React from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX, Moon, Sun, Languages } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Navbar({ isNight, setIsNight, isMuted, setIsMuted }) {
  const { t, i18n } = useTranslation();

  const handleToggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playWhistle();
    }
  };

  const handleToggleLang = () => {
    const next = i18n.language === 'uz' ? 'en' : 'uz';
    i18n.changeLanguage(next);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      sounds.playKick();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: t('nav.idCard') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full px-4 py-3 backdrop-blur-md bg-cream-200/80 dark:bg-stadium-night/85 border-b-2 border-black/80 dark:border-white/20 transition-colors duration-300"
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logotip */}
        <div
          onClick={() => scrollTo('hero')}
          onKeyDown={(e) => e.key === 'Enter' && scrollTo('hero')}
          className="flex items-center gap-2 cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Bosh sahifaga qaytish"
        >
          <div
            className="w-9 h-9 bg-referee-red text-white border-2 border-black shadow-scrapbook-sm rounded-full flex items-center justify-center font-display font-black text-lg group-hover:rotate-12 transition-transform"
            aria-hidden="true"
          >
            8
          </div>
          <div className="font-display tracking-wider text-xl md:text-2xl font-black uppercase text-navy dark:text-cream-100">
            HOJIAKBAR<span className="text-red-600">.DEV</span>
          </div>
        </div>

        {/* Navigatsiya */}
        <nav
          aria-label="Asosiy navigatsiya"
          className="hidden md:flex items-center gap-6 font-bold text-lg text-gray-800 dark:text-cream-200"
        >
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:text-referee-red hover:-rotate-1 transition-all relative py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-referee-red rounded"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Amallar tugmalari */}
        <div className="flex items-center gap-2">

          {/* Til almashtirish */}
          <button
            onClick={handleToggleLang}
            aria-label={`Tilni ${t('lang.switch')} ga o'zgartirish`}
            className="flex items-center gap-1 w-auto px-3 h-10 rounded-md border-2 border-black bg-cream-100 dark:bg-stadium-card text-black dark:text-white shadow-scrapbook-sm hover:-translate-y-0.5 active:translate-y-0 transition-transform font-mono font-bold text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <Languages className="w-4 h-4" aria-hidden="true" />
            {t('lang.switch')}
          </button>

          {/* Ovoz */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? t('audio.unmute') : t('audio.mute')}
            aria-pressed={!isMuted}
            className="w-10 h-10 rounded-md border-2 border-black bg-cream-100 dark:bg-stadium-card text-black dark:text-white shadow-scrapbook-sm hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-red-500" aria-hidden="true" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            )}
          </button>

          {/* Kun/Tun */}
          <button
            onClick={() => {
              setIsNight(!isNight);
              sounds.playKick();
            }}
            aria-label={isNight ? t('theme.day') : t('theme.night')}
            aria-pressed={isNight}
            className="w-10 h-10 rounded-md border-2 border-black bg-cream-100 dark:bg-stadium-card text-black dark:text-yellow-400 shadow-scrapbook-sm hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            {isNight ? (
              <Sun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          {/* Hushtak tugmasi */}
          <button
            onClick={() => sounds.playWhistle()}
            aria-label={t('audio.whistle')}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm font-bold bg-referee-yellow border-2 border-black shadow-scrapbook-sm hover:scale-105 active:scale-95 transition-all text-black rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <span aria-hidden="true">📢</span>
            {t('audio.whistle')}
          </button>
        </div>
      </div>

      {/* Skip to content — Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-referee-yellow focus:border-2 focus:border-black focus:font-bold focus:rounded"
      >
        Asosiy kontentga o'tish
      </a>
    </header>
  );
}
