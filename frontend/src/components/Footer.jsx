import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Footer({ profile = {} }) {
  const { t } = useTranslation();

  const scrollToTop = () => {
    sounds.playWhistle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="mt-20 border-t-3 border-black bg-cream-100 dark:bg-stadium-card py-10 px-4 transition-colors"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

        <div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span aria-hidden="true" className="text-2xl">⚽</span>
            <span className="font-display tracking-wider text-xl font-black text-navy dark:text-cream-100">
              HOJIAKBAR<span className="text-red-600">.DEV</span>
            </span>
          </div>
          <p className="mt-1 text-sm font-hand text-gray-600 dark:text-gray-300">
            {t('footer.made_with')} •{' '}
            <span className="font-bold">Hojiakbar Bektemirov</span> •{' '}
            Guliston, O&apos;zbekiston
          </p>
          <p className="text-xs font-mono text-gray-400 mt-0.5">
            Python/Django + React + Vite + Tailwind CSS
          </p>
        </div>

        <nav aria-label="Ijtimoiy havolalar" className="flex gap-4 text-sm font-mono font-bold text-gray-500">
          <a
            href="https://github.com/said271275-hub"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profil"
            className="hover:text-navy dark:hover:text-cream-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded"
          >
            GitHub
          </a>
          <a
            href="mailto:said271275@gmail.com"
            aria-label="Email yuborish"
            className="hover:text-navy dark:hover:text-cream-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded"
          >
            Email
          </a>
          <a
            href="https://t.me/BXS_738"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram orqali bog'lanish"
            className="hover:text-navy dark:hover:text-cream-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded"
          >
            Telegram
          </a>
        </nav>

        <button
          onClick={scrollToTop}
          aria-label={t('footer.back_to_top')}
          className="flex items-center gap-1.5 px-4 py-2 bg-referee-yellow border-2 border-black rounded-lg shadow-scrapbook-sm hover:-translate-y-1 active:translate-y-0 transition-transform font-mono font-bold text-xs text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
          <span>{t('footer.back_to_top')}</span>
        </button>

      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-dashed border-gray-300 dark:border-zinc-700 text-center text-xs font-mono text-gray-400">
        © 2026 Hojiakbar Bektemirov. MIT License.
      </div>
    </footer>
  );
}
