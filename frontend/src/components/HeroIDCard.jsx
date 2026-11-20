import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { sounds } from '../utils/audio';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export default function HeroIDCard({ profile = {} }) {
  const { t } = useTranslation();
  const ballControls = useAnimation();
  const cardControls = useAnimation();
  const [hasKicked, setHasKicked] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    async function runIntro() {
      await new Promise((r) => setTimeout(r, 600));

      ballControls.start({
        x: [-300, 0],
        rotate: [0, 720],
        transition: { duration: 1.2, ease: 'easeOut' },
      });

      await new Promise((r) => setTimeout(r, 1150));
      sounds.playKick();
      setHasKicked(true);

      cardControls.start({
        rotate: [0, 8, -6, 4, -2, 0],
        x: [0, 15, -10, 5, 0],
        transition: { duration: 1.4, ease: 'easeInOut' },
      });

      ballControls.start({
        y: [0, 180],
        x: [0, 60],
        rotate: [720, 900],
        transition: { duration: 0.8, ease: 'easeIn' },
      });
    }

    runIntro();
  }, [ballControls, cardControls]);

  return (
    <section
      id="hero"
      aria-label="Hero — asosiy taqdimot"
      className="relative pt-6 pb-16 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden"
    >
      {/* Hero tagline — SEO uchun h1 */}
      <h1 className="sr-only">{t('hero.tagline')} — Hojiakbar Bektemirov</h1>

      {/* Intro to'pi */}
      {!prefersReducedMotion && (
        <motion.div
          animate={ballControls}
          initial={{ x: -400, y: 0 }}
          className="absolute top-44 z-40 cursor-grab active:cursor-grabbing text-5xl md:text-6xl select-none"
          drag
          dragConstraints={{ left: -200, right: 200, top: -100, bottom: 200 }}
          onDragStart={() => sounds.playKick()}
          aria-hidden="true"
        >
          ⚽
        </motion.div>
      )}

      {/* Lanyard + ID Karta */}
      <div className="relative flex flex-col items-center z-30">
        <div
          className="w-12 h-5 bg-red-700 border-2 border-black rounded-b-md shadow-scrapbook-sm"
          aria-hidden="true"
        />
        <div
          className="w-4 h-16 md:h-24 bg-red-700 border-x-2 border-black flex items-center justify-center shadow-sm"
          aria-hidden="true"
        >
          <div className="w-1 h-full bg-red-400 opacity-60" />
        </div>
        <div className="relative -mt-1 flex items-center justify-center" aria-hidden="true">
          <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-300 shadow-sm flex items-center justify-center text-xs font-black">
            📎
          </div>
          <span className="absolute -right-5 -top-2 text-xl select-none animate-pulse">⭐</span>
        </div>

        {/* ID Karta */}
        <motion.article
          animate={cardControls}
          drag={!prefersReducedMotion}
          dragConstraints={{ left: -60, right: 60, top: -40, bottom: 80 }}
          dragElastic={0.4}
          dragTransition={{ bounceStiffness: 450, bounceDamping: 18 }}
          onDragStart={() => sounds.playKick()}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          aria-label="Hojiakbar Bektemirov — shaxsiy ID kartasi"
          className="relative mt-2 w-[310px] sm:w-[350px] md:w-[380px] bg-white border-3 border-black rounded-2xl shadow-scrapbook-lg p-5 cursor-grab select-none dark:bg-zinc-100"
        >
          <div className="w-16 h-3 bg-zinc-200 border-2 border-black rounded-full mx-auto mb-4 shadow-inner" aria-hidden="true" />

          <div className="flex gap-4">
            {/* Chap: Avatar */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-zinc-100 border-2 border-black rounded-xl overflow-hidden shadow-scrapbook-sm flex items-center justify-center group">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={`${profile.full_name || 'Hojiakbar Bektemirov'} rasmi`}
                    width={160}
                    height={160}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2" aria-hidden="true">
                    <span className="text-5xl mb-1 group-hover:scale-110 transition-transform">⚽🧢</span>
                    <span className="text-xs font-mono font-bold text-red-900 bg-red-100 px-1 border border-black">
                      #8 LFC PLAYMAKER
                    </span>
                  </div>
                )}
                <div className="absolute top-1 left-1 bg-referee-yellow border-2 border-black px-1.5 py-0.5 text-xs font-black font-display rounded shadow-sm" aria-label={`Forma raqami: ${profile.jersey_number || '#8'}`}>
                  {profile.jersey_number || '#8'}
                </div>
              </div>

              <div className="w-full text-center mt-3">
                <p className="text-xl sm:text-2xl font-black text-navy tracking-tight font-hand">
                  {profile.full_name || 'Hojiakbar Bektemirov'}
                </p>
                <p className="text-xs uppercase font-mono text-gray-500 tracking-widest -mt-0.5">
                  {profile.city || 'Guliston'} • {profile.team_badge || 'Liverpool'}
                </p>
              </div>

              <div className="w-full text-center mt-1">
                <p className="text-sm font-bold font-mono text-gray-800">
                  {t('hero.age_label')}: {profile.age || 19} (08.03.2007)
                </p>
              </div>

              {/* Imzo */}
              <div className="w-full flex flex-col items-center justify-center mt-3 pt-2 border-t border-dashed border-gray-400">
                <span className="font-hand text-2xl font-bold text-navy italic" aria-label="Imzo">
                  {profile.signature_text || 'Hojiakbar'}
                </span>
                <span className="text-[9px] font-mono text-gray-400 tracking-widest mt-0.5">SIGNATURE / IMZO</span>
              </div>
            </div>

            {/* O'ng: Kasb va texnologiyalar */}
            <div className="w-28 flex flex-col justify-between border-l-2 border-dashed border-gray-300 pl-3">
              <div>
                <div className="text-[9px] font-mono uppercase text-gray-400 tracking-widest mb-1">LAVOZIM</div>
                <div className="font-display text-sm text-navy leading-tight">
                  {t('hero.role')}
                </div>
              </div>

              {/* Asosiy texnologiyalar — 30 soniyada ko'rinadigan */}
              <div className="mt-3">
                <div className="text-[9px] font-mono uppercase text-gray-400 tracking-widest mb-2">TEXNOLOGIYALAR</div>
                <div className="flex flex-wrap gap-1">
                  {['Python', 'Django', 'React', 'JS'].map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono font-bold bg-pitch text-white px-1 py-0.5 border border-black rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Aloqa */}
              <div className="mt-3">
                <div className="text-[9px] font-mono uppercase text-gray-400 tracking-widest mb-1">ALOQA</div>
                <a
                  href={`mailto:${profile.email || 'said271275@gmail.com'}`}
                  className="text-[9px] font-mono text-navy hover:underline break-all"
                  aria-label={`Email: ${profile.email || 'said271275@gmail.com'}`}
                >
                  {profile.email || 'said271275@gmail.com'}
                </a>
              </div>

              {/* Shtrix-kod */}
              <div className="mt-3 pt-2 border-t border-gray-200" aria-hidden="true">
                <div className="flex gap-px justify-center">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{
                        width: i % 3 === 0 ? '2px' : '1px',
                        height: '24px',
                      }}
                    />
                  ))}
                </div>
                <div className="text-[8px] font-mono text-gray-400 text-center mt-0.5">
                  HB-2007-DEV-UZ
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Hero CTA tugmalari */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center z-30">
          {/* Tagline */}
          <div className="text-center mb-2 sm:hidden">
            <p className="font-hand text-lg font-bold text-navy dark:text-cream-100">
              {t('hero.tagline')}
            </p>
          </div>

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              sounds.playKick();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-pitch text-white font-bold font-hand text-lg border-3 border-black shadow-scrapbook rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pitch"
            aria-label={t('hero.cta_projects')}
          >
            ⚽ {t('hero.cta_projects')}
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              sounds.playKick();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-referee-yellow text-black font-bold font-hand text-lg border-3 border-black shadow-scrapbook rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            aria-label={t('hero.cta_contact')}
          >
            📩 {t('hero.cta_contact')}
          </a>
        </div>

        {/* Tagline — desktop */}
        <div className="hidden sm:block mt-6 text-center max-w-lg">
          <p className="font-hand text-xl font-bold text-navy dark:text-cream-100">
            {t('hero.tagline')}
          </p>
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
