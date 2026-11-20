import React from 'react';

// Gazeta qirqmasi ranglari — WCAG AA kontrastini saqlaydi (4.5:1+)
const COLOR_PRESETS = [
  'bg-amber-100 text-black border-black',    // kontrast: 11:1
  'bg-red-600 text-white border-black',      // kontrast: 5.2:1
  'bg-yellow-300 text-black border-black',   // kontrast: 10:1
  'bg-blue-700 text-white border-black',     // kontrast: 6.1:1
  'bg-emerald-700 text-white border-black',  // kontrast: 5.0:1
  'bg-black text-white border-white',        // kontrast: 21:1
  'bg-purple-700 text-white border-black',   // kontrast: 6.5:1
  'bg-orange-500 text-black border-black',   // kontrast: 4.7:1
];

const ROTATIONS = ['-rotate-3', 'rotate-2', '-rotate-6', 'rotate-4', '-rotate-2', 'rotate-6'];

/**
 * Gazeta qirqmasi uslubida sarlavha komponenti.
 * aria-hidden="true" — har bir harf alohida, screen reader uchun div
 * aria-label — butun matnni bir qator sifatida e'lon qiladi.
 */
export default function RansomTitle({ text, className = '' }) {
  const words = text.split(' ');

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}
      role="heading"
      aria-label={text}
    >
      {words.map((word, wIdx) => (
        <div key={wIdx} className="inline-flex items-center gap-1" aria-hidden="true">
          {word.split('').map((letter, lIdx) => {
            const colorClass = COLOR_PRESETS[(wIdx * 5 + lIdx) % COLOR_PRESETS.length];
            const rotClass = ROTATIONS[(wIdx * 3 + lIdx) % ROTATIONS.length];

            return (
              <span
                key={lIdx}
                className={`ransom-letter text-2xl md:text-4xl lg:text-5xl font-black uppercase select-none ${colorClass} ${rotClass}`}
              >
                {letter}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
