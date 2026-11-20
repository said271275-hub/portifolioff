import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import RansomTitle from './RansomTitle';
import { sounds } from '../utils/audio';

const SKILL_ICONS = {
  React: '⚛️',
  JavaScript: '⚡',
  'Tailwind CSS': '🎨',
  'CSS3': '🎨',
  Python: '🐍',
  Django: '🐍',
  HTML5: '📄',
  TypeScript: '🔷',
  PostgreSQL: '🗄️',
  'C++': '⚙️',
};

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export default function SkillsSection({ skills = [] }) {
  const { t } = useTranslation();
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <section
      id="skills"
      aria-label={t('skills.title')}
      className="py-20 px-4 max-w-7xl mx-auto relative"
    >
      <div className="flex flex-col items-center mb-14 text-center">
        <RansomTitle text={t('skills.title')} className="justify-center" />
        <p className="mt-3 text-lg font-hand font-bold text-gray-700 dark:text-gray-300">
          {t('skills.subtitle')}
        </p>
      </div>

      <div className="relative bg-cream-100 dark:bg-stadium-card/60 p-6 md:p-10 border-4 border-black rounded-2xl shadow-scrapbook-lg">
        <div className="washi-tape washi-tape-pink w-28 -top-3 -left-4 -rotate-12" aria-hidden="true" />
        <div className="washi-tape washi-tape-blue w-28 -top-3 -right-4 rotate-12" aria-hidden="true" />
        <div className="absolute top-3 left-6 text-2xl select-none" aria-hidden="true">📌</div>
        <div className="absolute top-3 right-6 text-2xl select-none" aria-hidden="true">⭐</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {skills.map((skill, index) => {
            const rotations = ['-rotate-3', 'rotate-2', '-rotate-4', 'rotate-3', '-rotate-2'];
            const rot = rotations[index % rotations.length];
            const icon = SKILL_ICONS[skill.name] || '⚽';

            return (
              <motion.article
                key={skill.name || index}
                whileHover={prefersReducedMotion ? {} : { scale: 1.08, rotate: 0 }}
                onMouseEnter={() => {
                  sounds.playKick();
                  setActiveSkill(skill.name);
                }}
                onMouseLeave={() => setActiveSkill(null)}
                className={`polaroid-card relative rounded-sm ${rot} cursor-pointer group`}
                aria-label={`${skill.name} — darajasi: ${skill.level || 85}%`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-zinc-300 border-2 border-black rounded-t-sm shadow-sm flex items-center justify-center text-[10px]" aria-hidden="true">
                  📎
                </div>

                <div className="relative aspect-square w-full bg-cream-300 dark:bg-zinc-800 border-2 border-black rounded-sm overflow-hidden flex flex-col items-center justify-center p-4">
                  <div className="absolute top-2 left-2 bg-referee-yellow border-2 border-black px-2 py-0.5 rounded shadow-scrapbook-sm" aria-hidden="true">
                    <span className="font-display font-black text-xl text-black">{skill.level || 85}</span>
                    <span className="text-[10px] block font-mono font-bold -mt-1 text-black">OVR</span>
                  </div>

                  <div className="text-6xl mb-2 group-hover:scale-125 transition-transform duration-300" aria-hidden="true">
                    {icon}
                  </div>

                  {/* Hover atributlar */}
                  <div className="absolute inset-0 bg-navy/95 text-white p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
                    <div className="font-display text-lg tracking-wider text-referee-yellow text-center mb-2">
                      FIFA ATTRIBUTES
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('skills.pace')}:</span>
                        <span className="font-bold text-white">{skill.pace || 88}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('skills.shooting')}:</span>
                        <span className="font-bold text-white">{skill.shooting || 84}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('skills.passing')}:</span>
                        <span className="font-bold text-white">{skill.pass || 89}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('skills.dribbling')}:</span>
                        <span className="font-bold text-white">{skill.dribble || 87}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-hand font-bold text-xl text-navy dark:text-cream-100">
                      {skill.name}
                    </h3>
                    <span className="text-xs font-mono font-bold bg-yellow-100 px-1.5 py-0.5 border border-black rounded">
                      {skill.category || 'Skill'}
                    </span>
                  </div>

                  <div
                    className="mt-2 w-full h-3 bg-gray-200 border-2 border-black rounded-full overflow-hidden p-0.5"
                    role="progressbar"
                    aria-valuenow={skill.level || 85}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} darajasi: ${skill.level || 85}%`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level || 85}%` }}
                      viewport={{ once: true }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-pitch rounded-full"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
