import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, FolderOpen, Star, AlertCircle } from 'lucide-react';
import RansomTitle from './RansomTitle';
import { sounds } from '../utils/audio';

const FILTERS = ["Hammasi", "React", "Python", "JavaScript"];

export default function ProjectsSection({ projects = [], isLoading = false, error = null }) {
  const [isOpen, setIsOpen] = useState(true); // Standart ochiq yoki bosganda ochiladi
  const [selectedFilter, setSelectedFilter] = useState("Hammasi");
  const [hoveredProject, setHoveredProject] = useState(null);

  // Filtrlash
  const filteredProjects = projects.filter(project => {
    if (selectedFilter === "Hammasi") return true;
    const techArr = Array.isArray(project.tech) ? project.tech : [];
    return techArr.some(t => t.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  const toggleFolder = () => {
    sounds.playKick();
    setIsOpen(!isOpen);
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto relative">
      
      {/* Sarlavha: Gazeta qirqmasi */}
      <div className="flex flex-col items-center mb-10 text-center">
        <RansomTitle text="MATCH FIXTURES" className="justify-center" />
        <p className="mt-3 text-lg font-hand font-bold text-gray-700 dark:text-gray-300">
          📂 Rasmiy o'yinlar qaydnomasi — papkani oching va o'yin natijalarini ko'ring!
        </p>
      </div>

      {/* Arxiv papkasi (Rasmdagi kabi retro ofis papkasi) */}
      <div className="flex justify-center mb-10">
        <button
          onClick={toggleFolder}
          className="flex items-center gap-3 px-6 py-3.5 bg-amber-100 border-3 border-black rounded-lg shadow-scrapbook hover:-translate-y-1 active:translate-y-0 transition-transform font-hand text-xl font-black text-black group"
        >
          {isOpen ? (
            <FolderOpen className="w-8 h-8 text-amber-700 group-hover:scale-110 transition-transform" />
          ) : (
            <Folder className="w-8 h-8 text-amber-700 group-hover:scale-110 transition-transform" />
          )}
          <span>{isOpen ? "📁 Papkani yopish" : "📂 O'yinlar papkasini ochish"}</span>
          <span className="text-xs font-mono bg-referee-yellow px-2 py-0.5 border border-black rounded-full">
            {projects.length} ta o'yin
          </span>
        </button>
      </div>

      {/* Ochiluvchi qism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            {/* Filtr tugmalari */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {FILTERS.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => {
                      sounds.playKick();
                      setSelectedFilter(filter);
                    }}
                    className={`px-4 py-1.5 font-bold font-mono text-sm border-2 border-black rounded-md transition-all shadow-scrapbook-sm ${
                      isActive
                        ? 'bg-referee-yellow text-black -rotate-2 scale-105'
                        : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-white hover:bg-gray-100'
                    }`}
                  >
                    {filter === "Hammasi" ? "⚽ Barchasi" : `# ${filter}`}
                  </button>
                );
              })}
            </div>

            {/* Yuklanish skeleti */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-64 bg-cream-300 dark:bg-zinc-800 border-2 border-black rounded-xl animate-pulse p-6"></div>
                ))}
              </div>
            )}

            {/* Xatolik yuz berganda */}
            {error && (
              <div className="text-center p-8 bg-red-100 border-2 border-black rounded-xl max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
                <p className="font-bold font-hand text-lg text-red-900">{error}</p>
              </div>
            )}

            {/* Loyihalar ro'yxati (Match Cards) */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project, idx) => {
                  const stars = Array.from({ length: project.stars_count || 5 });
                  const liveScreenshot = project.screenshot_url || (project.live_url ? `https://image.thum.io/get/${project.live_url}` : null);

                  return (
                    <motion.div
                      key={project.id || idx}
                      whileHover={{ y: -8 }}
                      onMouseEnter={() => {
                        sounds.playKick();
                        setHoveredProject(project.id);
                      }}
                      onMouseLeave={() => setHoveredProject(null)}
                      className="relative bg-white dark:bg-zinc-900 border-3 border-black rounded-xl p-5 md:p-6 shadow-scrapbook transition-all flex flex-col justify-between group"
                    >
                      {/* Skotch tasma */}
                      <div className="washi-tape washi-tape-blue w-24 -top-3 left-6 -rotate-6"></div>

                      {/* Asosiy o'yin (Pinned) bo'lsa belgi */}
                      {project.is_pinned && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black rounded uppercase shadow-sm">
                          🔥 Asosiy O'yin
                        </div>
                      )}

                      <div>
                        {/* Match card tepasi: Gollar / Yulduzlar */}
                        <div className="flex items-center gap-1 mb-2">
                          {stars.map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-black" />
                          ))}
                          <span className="ml-1 text-xs font-mono font-bold text-gray-500">
                            (Natija: {project.stars_count || 5}/5)
                          </span>
                        </div>

                        {/* O'yin nomi */}
                        <h3 className="text-2xl font-black font-hand text-navy dark:text-cream-100 group-hover:text-pitch transition-colors">
                          {project.title}
                        </h3>

                        {/* Tavsif */}
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 font-hand line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Texnologiyalar */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tech && project.tech.map((t, ti) => (
                            <span
                              key={ti}
                              className="px-2 py-0.5 text-xs font-mono font-bold bg-cream-200 dark:bg-zinc-800 text-black dark:text-white border border-black rounded shadow-scrapbook-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Jonli Skrinshot Preview (Hover qilinganda ko'rinadi) */}
                      {liveScreenshot && (
                        <div className="mt-4 relative h-40 bg-zinc-100 border-2 border-black rounded-lg overflow-hidden group-hover:shadow-inner">
                          <img
                            src={liveScreenshot}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              // Agar skrinshot yuklanmasa yoqimli futbol rasmi
                              e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        </div>
                      )}

                      {/* Havolalar (Tugmalar) */}
                      <div className="mt-5 pt-3 border-t-2 border-dashed border-gray-300 flex items-center justify-between">
                        {project.github_url ? (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-800 dark:text-gray-200 hover:text-black hover:underline"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub Kodi</span>
                          </a>
                        ) : <span />}

                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pitch text-white border-2 border-black rounded-md font-mono font-bold text-xs shadow-scrapbook-sm hover:scale-105 transition-transform"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            )}

            {!isLoading && filteredProjects.length === 0 && (
              <div className="text-center py-12 text-gray-500 font-hand text-xl">
                ⚽ Ushbu toifada hozircha o'yinlar topilmadi.
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

