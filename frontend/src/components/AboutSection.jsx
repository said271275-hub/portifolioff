import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Terminal, Award, MessageSquare, BookOpen, Compass } from 'lucide-react';
import RansomTitle from './RansomTitle';
import { sounds } from '../utils/audio';

export default function AboutSection({ profile = {}, experience = [] }) {
  const [activeTab, setActiveTab] = useState('bio');

  const switchTab = (tab) => {
    sounds.playKick();
    setActiveTab(tab);
  };

  return (
    <section id="about" className="py-20 px-4 max-w-7xl mx-auto relative">
      
      {/* Sarlavha: Gazeta qirqmasi */}
      <div className="flex flex-col items-center mb-12 text-center">
        <RansomTitle text="TACTICS AMIGA OS" className="justify-center" />
        <p className="mt-3 text-lg font-hand font-bold text-gray-700 dark:text-gray-300">
          💻 Retro kompyuter va 4-3-3 taktika shtabi — gap pufakchalarini bosing!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Chap taraf: Gap pufakchalari (Chat bubbles) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="text-xl font-hand font-black text-navy dark:text-cream-100 mb-1 flex items-center gap-2">
            <span>💬</span> Taktik menyular:
          </div>

          {/* 1. Bio pufakchasi */}
          <motion.div
            whileHover={{ scale: 1.03, x: 5 }}
            onClick={() => switchTab('bio')}
            className={`p-4 rounded-2xl border-3 border-black shadow-scrapbook cursor-pointer relative ${
              activeTab === 'bio' ? 'bg-referee-yellow text-black -rotate-1' : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-white'
            }`}
          >
            <div className="flex items-center gap-2 font-black font-hand text-xl">
              <span>👤</span> Futbolcha Bio (Men haqimda)
            </div>
            <p className="text-xs font-mono mt-1 opacity-85">
              Hojiakbar Bektemirov • #8 Liverpool ruhiyati
            </p>
            <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-inherit border-r-3 border-t-3 border-black rotate-45"></div>
          </motion.div>

          {/* 2. 4-3-3 Taktika doskasi */}
          <motion.div
            whileHover={{ scale: 1.03, x: 5 }}
            onClick={() => switchTab('tactics')}
            className={`p-4 rounded-2xl border-3 border-black shadow-scrapbook cursor-pointer relative ${
              activeTab === 'tactics' ? 'bg-emerald-400 text-black rotate-1' : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-white'
            }`}
          >
            <div className="flex items-center gap-2 font-black font-hand text-xl">
              <span>⚽</span> 4-3-3 Taktika Doskasi
            </div>
            <p className="text-xs font-mono mt-1 opacity-85">
              React, Tailwind va JS ning maydondagi joylashuvi
            </p>
            <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-inherit border-r-3 border-t-3 border-black rotate-45"></div>
          </motion.div>

          {/* 3. Mavsumlar (Timeline) */}
          <motion.div
            whileHover={{ scale: 1.03, x: 5 }}
            onClick={() => switchTab('timeline')}
            className={`p-4 rounded-2xl border-3 border-black shadow-scrapbook cursor-pointer relative ${
              activeTab === 'timeline' ? 'bg-blue-300 text-black -rotate-1' : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-white'
            }`}
          >
            <div className="flex items-center gap-2 font-black font-hand text-xl">
              <span>🏆</span> Mavsumlar (IT Live & Amaliyot)
            </div>
            <p className="text-xs font-mono mt-1 opacity-85">
              Akademiya va mustaqil loyihalar tarixi
            </p>
            <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-inherit border-r-3 border-t-3 border-black rotate-45"></div>
          </motion.div>

          {/* 4. Tillar va Qiziqishlar */}
          <motion.div
            whileHover={{ scale: 1.03, x: 5 }}
            onClick={() => switchTab('interests')}
            className={`p-4 rounded-2xl border-3 border-black shadow-scrapbook cursor-pointer relative ${
              activeTab === 'interests' ? 'bg-purple-300 text-black rotate-1' : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-white'
            }`}
          >
            <div className="flex items-center gap-2 font-black font-hand text-xl">
              <span>🌍</span> Tillar va Qiziqishlar
            </div>
            <p className="text-xs font-mono mt-1 opacity-85">
              Futbol (Liverpool) va tillar
            </p>
            <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-inherit border-r-3 border-t-3 border-black rotate-45"></div>
          </motion.div>

          {/* CV Yuklab olish tugmasi */}
          <a
            href={profile.cv_url || "#"}
            download
            onClick={() => sounds.playWhistle()}
            className="mt-2 flex items-center justify-center gap-2 p-3.5 bg-red-600 hover:bg-red-700 text-white border-3 border-black rounded-xl shadow-scrapbook hover:scale-105 active:scale-95 transition-transform font-mono font-black text-sm uppercase"
          >
            <Download className="w-5 h-5" />
            <span>Rasmiy Shartnoma (CV PDF)</span>
          </a>
        </div>

        {/* ══════════════════════════════════════════════
            RETRO KOMPYUTER (AMIGA 1200 MONITOR)
            ══════════════════════════════════════════════ */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          <div className="w-full max-w-2xl bg-zinc-200 dark:bg-zinc-700 border-4 border-black rounded-3xl p-6 shadow-scrapbook-lg relative">
            
            {/* Monitor yuqori paneli */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black/30 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 border border-black"></div>
              </div>
              <div className="font-mono text-xs font-black tracking-widest text-gray-700 dark:text-gray-200">
                AMIGA 1200 • HOJIAKBAR BEKTEMIROV #8
              </div>
              <div className="text-xs font-bold font-mono text-red-600 bg-red-100 px-2 py-0.5 border border-black rounded">
                LFC YNWA
              </div>
            </div>

            {/* CRT Monitor ekrani */}
            <div className="relative bg-zinc-900 border-4 border-black rounded-xl p-5 min-h-[380px] text-green-400 font-mono overflow-hidden shadow-inner">
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none opacity-20"></div>

              {/* Title bar */}
              <div className="bg-red-900 text-white px-3 py-1 -mt-2 -mx-2 mb-4 flex items-center justify-between border-b-2 border-black font-bold text-xs">
                <span>[Liverpool Workbench] - {activeTab.toUpperCase()}.EXE</span>
                <span className="cursor-pointer" onClick={() => switchTab('bio')}>[X]</span>
              </div>

              {/* 1. Bio */}
              {activeTab === 'bio' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-gray-100 font-hand text-lg">
                  <div className="flex items-center gap-2 text-yellow-300 font-mono text-sm font-bold">
                    <span>&gt;</span> cat bektemirov_philosophy.txt
                  </div>
                  <p className="leading-relaxed bg-black/40 p-3 rounded border border-green-500/40">
                    "{profile.bio || "Futbol maydonida Steven Gerrard kabi #8 raqamda tezkor fikrlash, aniq uzatma va g'alabaga intilish qanchalik muhim bo'lsa, frontend dasturlashda ham toza kod, mukammal dizayn va kuchli jamoaviy harakat shunchalik qadrlidir. You'll Never Walk Alone!"}"
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm font-mono pt-2">
                    <div className="p-2 bg-zinc-800 border border-gray-600 rounded">
                      <span className="text-gray-400 block text-xs">Shahar & Yosh:</span>
                      <span className="text-white font-bold">{profile.city || "Guliston"}, {profile.age || 19} yosh</span>
                    </div>
                    <div className="p-2 bg-zinc-800 border border-gray-600 rounded">
                      <span className="text-gray-400 block text-xs">Klub & Forma:</span>
                      <span className="text-red-400 font-bold">{profile.team_badge || "Liverpool"}, #8</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. 4-3-3 Taktika doskasi */}
              {activeTab === 'tactics' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                  <div className="w-full text-center text-xs text-yellow-300 font-mono mb-2">
                    ★ 4-3-3 ATTACKING PLAY FORMATION ★
                  </div>

                  <div className="w-full h-64 bg-emerald-800 border-2 border-white/60 rounded-lg relative p-2 flex flex-col justify-between overflow-hidden shadow-inner">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-24 h-24 rounded-full border-2 border-white/40"></div>
                      <div className="absolute w-full h-0.5 bg-white/40"></div>
                    </div>

                    {/* Hujum (3 ta hujumchi) */}
                    <div className="flex justify-around z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-red-600 border border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                          LW
                        </div>
                        <span className="text-[10px] text-white font-bold bg-black/60 px-1 rounded mt-0.5">HTML 85%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-yellow-400 border border-black rounded-full flex items-center justify-center text-black text-xs font-black shadow">
                          ST
                        </div>
                        <span className="text-[10px] text-yellow-300 font-bold bg-black/60 px-1 rounded mt-0.5">React 65%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-red-600 border border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                          RW
                        </div>
                        <span className="text-[10px] text-white font-bold bg-black/60 px-1 rounded mt-0.5">Tailwind 75%</span>
                      </div>
                    </div>

                    {/* Yarim himoya (Playmaker #8 Hojiakbar) */}
                    <div className="flex justify-around z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-blue-500 border border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                          CM
                        </div>
                        <span className="text-[10px] text-white font-bold bg-black/60 px-1 rounded mt-0.5">CSS 80%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-red-600 border-2 border-yellow-300 rounded-full flex items-center justify-center text-yellow-300 text-xs font-black shadow-lg animate-pulse">
                          #8
                        </div>
                        <span className="text-[10px] text-yellow-300 font-bold bg-black/70 px-1 rounded mt-0.5">Hojiakbar</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-blue-500 border border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                          CM
                        </div>
                        <span className="text-[10px] text-white font-bold bg-black/60 px-1 rounded mt-0.5">JS 70%</span>
                      </div>
                    </div>

                    {/* Himoya va Darvoza */}
                    <div className="flex justify-around z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-600 border border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          LB
                        </div>
                        <span className="text-[9px] text-white bg-black/60 px-1 rounded">C++ 30%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-600 border border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          CB
                        </div>
                        <span className="text-[9px] text-white bg-black/60 px-1 rounded">Python 55%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-600 border border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          CB
                        </div>
                        <span className="text-[9px] text-white bg-black/60 px-1 rounded">TypeScript</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-emerald-600 border border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          GK
                        </div>
                        <span className="text-[9px] text-white bg-black/60 px-1 rounded">IT Live</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. Mavsumlar */}
              {activeTab === 'timeline' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-h-72 overflow-y-auto pr-2">
                  <div className="text-xs text-yellow-300 font-mono">&gt; history --seasons</div>
                  {experience.map((exp, i) => (
                    <div key={exp.id || i} className="p-3 bg-zinc-800/80 border-l-4 border-red-500 rounded">
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                        <span>{exp.start} — {exp.end}</span>
                        <span className="uppercase text-yellow-400 font-bold">{exp.role_type === 'work' ? 'Amaliyot' : 'Akademiya'}</span>
                      </div>
                      <div className="text-white font-bold text-sm mt-0.5">{exp.title}</div>
                      <div className="text-red-400 text-xs">{exp.place}</div>
                      <p className="text-gray-300 text-xs font-hand mt-1">{exp.description}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* 4. Tillar va Qiziqishlar */}
              {activeTab === 'interests' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-xs font-mono">
                  <div className="text-yellow-300">&gt; cat liverpool_and_hobbies.json</div>
                  
                  <div>
                    <span className="text-gray-400 block mb-1">Muloqot tillari:</span>
                    <div className="flex flex-wrap gap-2">
                      {(profile.languages || ["O'zbekcha (Ona tili)", "Inglizcha (O'rganmoqda)"]).map((lang, li) => (
                        <span key={li} className="px-2 py-1 bg-zinc-800 text-white border border-gray-600 rounded">
                          🗣️ {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-gray-400 block mb-1">Qiziqishlar va mashg'ulotlar:</span>
                    <div className="flex flex-wrap gap-2">
                      {(profile.interests || ["Futbol (Liverpool)", "Web Dasturlash", "UI Animatsiyalar"]).map((item, ii) => (
                        <span key={ii} className="px-2 py-1 bg-zinc-800 text-red-300 border border-gray-600 rounded">
                          ★ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </div>

            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                <span className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300">
                  ANFIELD MATCH CENTER
                </span>
              </div>
              <div className="font-display tracking-widest text-lg font-black text-red-600">
                LIVERPOOL FC
              </div>
            </div>

          </div>

          {/* Klaviatura */}
          <div className="w-11/12 max-w-xl h-10 bg-zinc-300 dark:bg-zinc-600 border-x-4 border-b-4 border-black rounded-b-xl shadow-scrapbook flex items-center justify-around px-6">
            <div className="w-16 h-2 bg-zinc-400 rounded-sm"></div>
            <div className="w-24 h-2 bg-zinc-400 rounded-sm"></div>
            <div className="w-16 h-2 bg-zinc-400 rounded-sm"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
