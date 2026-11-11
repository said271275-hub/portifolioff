import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { sounds } from '../utils/audio';

export default function HeroIDCard({ profile = {} }) {
  const ballControls = useAnimation();
  const cardControls = useAnimation();
  const [hasKicked, setHasKicked] = useState(false);

  // Sayt ochilganda intro animatsiyasi: to'p dumalab kelib ID kartaga uriladi
  useEffect(() => {
    async function runIntro() {
      await new Promise(r => setTimeout(r, 600));
      
      // To'p ID karta tomon dumalaydi
      ballControls.start({
        x: [ -300, 0 ],
        rotate: [ 0, 720 ],
        transition: { duration: 1.2, ease: "easeOut" }
      });

      // Zarba daqiqasida zarba ovozi va karta tebranishi
      await new Promise(r => setTimeout(r, 1150));
      sounds.playKick();
      setHasKicked(true);

      // Kartaning zarbadan tebranishi
      cardControls.start({
        rotate: [0, 8, -6, 4, -2, 0],
        x: [0, 15, -10, 5, 0],
        transition: { duration: 1.4, ease: "easeInOut" }
      });

      // To'p urilgach pastga maydonga tushadi
      ballControls.start({
        y: [0, 180],
        x: [0, 60],
        rotate: [720, 900],
        transition: { duration: 0.8, ease: "easeIn" }
      });
    }

    runIntro();
  }, [ballControls, cardControls]);

  const handleDragStart = () => {
    sounds.playKick();
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
      
      {/* Intro to'pi */}
      <motion.div
        animate={ballControls}
        initial={{ x: -400, y: 0 }}
        className="absolute top-44 z-40 cursor-grab active:cursor-grabbing text-5xl md:text-6xl select-none"
        drag
        dragConstraints={{ left: -200, right: 200, top: -100, bottom: 200 }}
        onDragStart={() => sounds.playKick()}
      >
        ⚽
      </motion.div>

      {/* Tepadan osilgan Lanyard (Kordon / Bog'ich) */}
      <div className="relative flex flex-col items-center z-30">
        
        {/* Yuqori devor ushlagichi va ilgak */}
        <div className="w-12 h-5 bg-red-700 border-2 border-black rounded-b-md shadow-scrapbook-sm"></div>

        {/* Qizil kordon (Liverpool / Anfield lanyard) */}
        <div className="w-4 h-16 md:h-24 bg-red-700 border-x-2 border-black flex items-center justify-center shadow-sm">
          <div className="w-1 h-full bg-red-400 opacity-60"></div>
        </div>

        {/* Metall qisqich va retro yulduzcha pin */}
        <div className="relative -mt-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-300 shadow-sm flex items-center justify-center text-xs font-black">
            📎
          </div>
          <span className="absolute -right-5 -top-2 text-xl select-none animate-pulse">⭐</span>
        </div>

        {/* ══════════════════════════════════════════════
            ASOSIY ID KARTA (SPRING DRAG PHYSICS)
            ══════════════════════════════════════════════ */}
        <motion.div
          animate={cardControls}
          drag
          dragConstraints={{ left: -60, right: 60, top: -40, bottom: 80 }}
          dragElastic={0.4}
          dragTransition={{ bounceStiffness: 450, bounceDamping: 18 }}
          onDragStart={handleDragStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98, cursor: 'grabbing' }}
          className="relative mt-2 w-[310px] sm:w-[350px] md:w-[380px] bg-white border-3 border-black rounded-2xl shadow-scrapbook-lg p-5 cursor-grab select-none transition-colors dark:bg-zinc-100"
        >
          {/* Yuqori osish teshigi */}
          <div className="w-16 h-3 bg-zinc-200 border-2 border-black rounded-full mx-auto mb-4 shadow-inner"></div>

          <div className="flex gap-4">
            
            {/* Chap taraf: Avatar, ism, imzo va shtrix-kod */}
            <div className="flex-1 flex flex-col items-center">
              
              {/* O'yinchi rasmi / Avatari (Polaroid ramkada) */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-zinc-100 border-2 border-black rounded-xl overflow-hidden shadow-scrapbook-sm flex items-center justify-center group">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <span className="text-5xl mb-1 group-hover:scale-110 transition-transform">⚽🧢</span>
                    <span className="text-xs font-mono font-bold text-red-900 bg-red-100 px-1 border border-black">
                      #8 LFC PLAYMAKER
                    </span>
                  </div>
                )}

                {/* Forma raqami: #8 */}
                <div className="absolute top-1 left-1 bg-referee-yellow border-2 border-black px-1.5 py-0.5 text-xs font-black font-display rounded shadow-sm">
                  {profile.jersey_number || "#8"}
                </div>
              </div>

              {/* Ism va shahar */}
              <div className="w-full text-center mt-3">
                <div className="text-xl sm:text-2xl font-black text-navy tracking-tight font-hand">
                  {profile.full_name || "Hojiakbar Bektemirov"}
                </div>
                <div className="text-xs uppercase font-mono text-gray-500 tracking-widest -mt-0.5">
                  {profile.city || "Guliston"} • {profile.team_badge || "Liverpool"}
                </div>
              </div>

              {/* Yosh va Tug'ilgan sana */}
              <div className="w-full text-center mt-1">
                <div className="text-sm font-bold font-mono text-gray-800">
                  Yosh: {profile.age || 19} (08.03.2007)
                </div>
                <div className="text-[10px] uppercase font-mono text-gray-400">
                  birth date • guliston
                </div>
              </div>

              {/* Qo'lyozma imzo */}
              <div className="w-full flex flex-col items-center justify-center mt-3 pt-2 border-t border-dashed border-gray-400">
                <div className="text-2xl font-hand italic text-red-900 tracking-wider -rotate-6 select-none font-bold">
                  {profile.signature_text || "Hojiakbar"}
                </div>
                <div className="text-[9px] uppercase font-mono text-gray-400 mt-1">
                  authorized player signature
                </div>
              </div>

              {/* Shtrix-kod */}
              <div className="w-full mt-3 flex flex-col items-center">
                <div className="flex gap-0.5 items-end h-7 w-4/5 justify-center opacity-85">
                  {[4,2,6,1,5,3,6,2,4,1,7,2,5,3,6,1,4,2,6,3].map((h, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{ width: i % 3 === 0 ? '3px' : '1.5px', height: `${h * 4}px` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-gray-500 mt-0.5">
                  LFC-8-BEKTEMIROV-2026
                </div>
              </div>

            </div>

            {/* O'ng taraf: Vertikal banner "FRONTEND DEVELOPER" */}
            <div className="w-12 sm:w-14 bg-red-800 text-white rounded-r-xl border-l-2 border-black flex flex-col items-center justify-between py-4 shadow-inner">
              <div className="text-lg">⭐</div>
              
              {/* Vertikal yozuv */}
              <div className="writing-vertical-lr rotate-180 uppercase font-black tracking-widest text-xs sm:text-sm font-mono text-center">
                {profile.role || "FRONTEND DEVELOPER"}
              </div>

              <div className="w-7 h-7 bg-referee-yellow border-2 border-black rounded-full flex items-center justify-center text-black font-bold text-xs">
                8
              </div>
            </div>

          </div>

          {/* Karta burchagidagi skotch (washi tape) */}
          <div className="washi-tape washi-tape-pink w-20 -top-3 -right-4 rotate-12"></div>
        </motion.div>

        {/* Ko'rsatma */}
        <p className="mt-4 text-sm font-bold text-gray-700 dark:text-gray-300 font-hand flex items-center gap-1.5">
          <span>👆</span> Kartani sichqoncha bilan tortib ko'ring (bahor fizikasi)!
        </p>

      </div>
    </section>
  );
}
