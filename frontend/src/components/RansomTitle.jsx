import React from 'react';

// Gazeta qirqmasi ranglari va burilish burchaklari
const COLOR_PRESETS = [
  'bg-amber-100 text-black border-black',
  'bg-red-500 text-white border-black',
  'bg-yellow-300 text-black border-black',
  'bg-blue-600 text-white border-black',
  'bg-emerald-500 text-white border-black',
  'bg-black text-white border-white',
  'bg-purple-600 text-white border-black',
  'bg-orange-400 text-black border-black',
];

const ROTATIONS = ['-rotate-3', 'rotate-2', '-rotate-6', 'rotate-4', '-rotate-2', 'rotate-6'];

export default function RansomTitle({ text, className = "" }) {
  const words = text.split(" ");

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      {words.map((word, wIdx) => (
        <div key={wIdx} className="inline-flex items-center gap-1">
          {word.split("").map((letter, lIdx) => {
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

