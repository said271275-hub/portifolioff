import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingStickers() {
  const stickers = [
    {
      id: 'ball',
      label: '⚽',
      className: 'top-16 left-6 md:left-20 text-3xl md:text-5xl',
      duration: 7,
      rotate: [0, 360],
      y: [0, -25, 0],
    },
    {
      id: 'yellow-card',
      element: (
        <div className="w-6 h-9 md:w-8 md:h-12 bg-yellow-400 border-2 border-black shadow-scrapbook-sm rounded-sm flex items-center justify-center font-black text-xs text-black">
          🟨
        </div>
      ),
      className: 'top-1/4 right-8 md:right-32',
      duration: 5.5,
      rotate: [-12, 10, -12],
      y: [0, -18, 0],
    },
    {
      id: 'red-card',
      element: (
        <div className="w-6 h-9 md:w-8 md:h-12 bg-red-600 border-2 border-black shadow-scrapbook-sm rounded-sm flex items-center justify-center font-black text-xs text-white">
          🟥
        </div>
      ),
      className: 'bottom-40 left-12 md:left-28',
      duration: 6.2,
      rotate: [15, -8, 15],
      y: [0, 20, 0],
    },
    {
      id: 'trophy',
      label: '🏆',
      className: 'top-1/3 left-1/4 text-3xl md:text-4xl',
      duration: 8,
      rotate: [-5, 8, -5],
      y: [0, -15, 0],
    },
    {
      id: 'whistle',
      label: '📢',
      className: 'bottom-32 right-1/4 text-2xl md:text-3xl',
      duration: 6.8,
      rotate: [8, -14, 8],
      y: [0, 16, 0],
    },
    {
      id: 'boot',
      label: '👟',
      className: 'top-2/3 right-12 text-3xl md:text-4xl',
      duration: 7.4,
      rotate: [-15, 5, -15],
      y: [0, -20, 0],
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 opacity-75">
      {stickers.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute select-none ${item.className}`}
          animate={{
            y: item.y,
            rotate: item.rotate,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.element || <span>{item.label}</span>}
        </motion.div>
      ))}
    </div>
  );
}

