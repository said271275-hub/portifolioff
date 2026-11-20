import React from 'react';
import { motion } from 'framer-motion';

const stickers = [
  {
    id: 'ball',
    label: '⚽',
    ariaLabel: 'futbol to\'pi',
    className: 'top-16 left-6 md:left-20 text-3xl md:text-5xl',
    duration: 7,
    rotate: [0, 360],
    y: [0, -25, 0],
  },
  {
    id: 'yellow-card',
    label: '🟨',
    ariaLabel: 'sariq kartochka',
    className: 'top-1/4 right-8 md:right-32',
    duration: 5.5,
    rotate: [-12, 10, -12],
    y: [0, -18, 0],
  },
  {
    id: 'red-card',
    label: '🟥',
    ariaLabel: 'qizil kartochka',
    className: 'bottom-40 left-12 md:left-28',
    duration: 6.2,
    rotate: [15, -8, 15],
    y: [0, 20, 0],
  },
  {
    id: 'trophy',
    label: '🏆',
    ariaLabel: 'kubok',
    className: 'top-1/3 left-1/4 text-3xl md:text-4xl',
    duration: 8,
    rotate: [-5, 8, -5],
    y: [0, -15, 0],
  },
  {
    id: 'whistle',
    label: '📢',
    ariaLabel: 'megafon',
    className: 'bottom-32 right-1/4 text-2xl md:text-3xl',
    duration: 6.8,
    rotate: [8, -14, 8],
    y: [0, 16, 0],
  },
  {
    id: 'boot',
    label: '👟',
    ariaLabel: 'futbol botinkasi',
    className: 'top-2/3 right-12 text-3xl md:text-4xl',
    duration: 7.4,
    rotate: [-15, 5, -15],
    y: [0, -20, 0],
  },
];

export default function FloatingStickers() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10 opacity-75"
      aria-hidden="true"
    >
      {stickers.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute select-none ${item.className}`}
          animate={{ y: item.y, rotate: item.rotate }}
          transition={{ duration: item.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
