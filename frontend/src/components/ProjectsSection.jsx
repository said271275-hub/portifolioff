import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Folder, FolderOpen, Star, AlertCircle, UserPlus, Trash2 } from 'lucide-react';
import RansomTitle from './RansomTitle';
import { sounds } from '../utils/audio';

// Modal kech yuklanadi (lazy)
const AddProjectModal = lazy(() => import('./AddProjectModal'));

const FILTERS_UZ = ['Hammasi', 'React', 'Python', 'JavaScript'];
const FILTERS_EN = ['All', 'React', 'Python', 'JavaScript'];

// localStorage dan mahalliy loyihalarni o'qish
const LOCAL_STORAGE_KEY = 'portfolio_local_projects';
const getLocalProjects = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};
const saveLocalProjects = (projects) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch {}
};

export default function ProjectsSection({ projects = [], isLoading = false, error = null }) {
  const { t, i18n } = useTranslation();
  const isUz = i18n.language === 'uz';
  const filters = isUz ? FILTERS_UZ : FILTERS_EN;

  const [isOpen, setIsOpen] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [showModal, setShowModal] = useState(false);
  // Mahalliy qo'shilgan loyihalar (localStorage'dan)
  const [localProjects, setLocalProjects] = useState(getLocalProjects);
  // Yangi qo'shilgan loyihani highlight qilish
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  // Backend + mahalliy loyihalar birlashtiriladi
  const allProjects = [...localProjects, ...projects];

  const filteredProjects = allProjects.filter((project) => {
    if (selectedFilter === filters[0]) return true;
    const techArr = Array.isArray(project.tech) ? project.tech : [];
    return techArr.some((tech) => tech.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  const toggleFolder = () => {
    sounds.playKick();
    setIsOpen(!isOpen);
  };

  const handleAddProject = (newProject) => {
    const updated = [newProject, ...localProjects];
    setLocalProjects(updated);
    saveLocalProjects(updated);
    setNewlyAddedId(newProject.id);
    setIsOpen(true);
    setSelectedFilter(filters[0]);
    // 3 soniyadan keyin highlight o'chadi
    setTimeout(() => setNewlyAddedId(null), 3000);
  };

  const handleDeleteLocal = (id) => {
    sounds.playKick();
    const updated = localProjects.filter((p) => p.id !== id);
    setLocalProjects(updated);
    saveLocalProjects(updated);
  };

  return (
    <section
      id="projects"
      aria-label={t('projects.title')}
      className="py-20 px-4 max-w-7xl mx-auto relative"
    >
      {/* Sarlavha */}
      <div className="flex flex-col items-center mb-10 text-center">
        <RansomTitle text={t('projects.title')} className="justify-center" />
        <p className="mt-3 text-lg font-hand font-bold text-gray-700 dark:text-gray-300">
          {t('projects.subtitle')}
        </p>
      </div>

      {/* Papka tugmasi + Yangi o'yinchi tugmasi */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={toggleFolder}
          aria-expanded={isOpen}
          aria-controls="projects-grid"
          className="flex items-center gap-3 px-6 py-3.5 bg-amber-100 border-3 border-black rounded-lg shadow-scrapbook hover:-translate-y-1 active:translate-y-0 transition-transform font-hand text-xl font-black text-black group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          {isOpen ? (
            <FolderOpen className="w-8 h-8 text-amber-700 group-hover:scale-110 transition-transform" aria-hidden="true" />
          ) : (
            <Folder className="w-8 h-8 text-amber-700 group-hover:scale-110 transition-transform" aria-hidden="true" />
          )}
          <span>{isOpen ? t('projects.close_folder') : t('projects.open_folder')}</span>
          <span
            className="text-xs font-mono bg-referee-yellow px-2 py-0.5 border border-black rounded-full"
            aria-label={`${allProjects.length} ${t('projects.count_label')}`}
          >
            {allProjects.length} {t('projects.count_label')}
          </span>
        </button>

        {/* 🆕 Yangi o'yinchi qo'sh tugmasi */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sounds.playWhistle();
            setShowModal(true);
          }}
          aria-label={isUz ? 'Yangi loyiha qo\'shish' : 'Add New Project'}
          className="flex items-center gap-2 px-6 py-3.5 bg-pitch text-white border-3 border-black rounded-lg shadow-scrapbook font-hand text-xl font-black group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pitch"
        >
          <UserPlus className="w-7 h-7 group-hover:scale-110 transition-transform" aria-hidden="true" />
          <span>{isUz ? '+ YANGI O\'YINCHI' : '+ NEW PLAYER'}</span>
        </motion.button>
      </div>

      {/* Loyihalar paneli */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="projects-grid"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            {/* Filtrlar */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="group" aria-label="Filtrlar">
              {filters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => { sounds.playKick(); setSelectedFilter(filter); }}
                    aria-pressed={isActive}
                    className={`px-4 py-1.5 font-bold font-mono text-sm border-2 border-black rounded-md transition-all shadow-scrapbook-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                      isActive
                        ? 'bg-referee-yellow text-black -rotate-2 scale-105'
                        : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-white hover:bg-gray-100'
                    }`}
                  >
                    {filter === filters[0] ? t('projects.filter_all') : `# ${filter}`}
                  </button>
                );
              })}
            </div>

            {/* Yuklanish */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-busy="true" aria-label={t('projects.loading')}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-64 bg-cream-300 dark:bg-zinc-800 border-2 border-black rounded-xl animate-pulse p-6" aria-hidden="true" />
                ))}
              </div>
            )}

            {/* Xatolik */}
            {error && (
              <div role="alert" className="text-center p-8 bg-red-100 border-2 border-black rounded-xl max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-2" aria-hidden="true" />
                <p className="font-bold font-hand text-lg text-red-900">{t(error)}</p>
              </div>
            )}

            {/* Loyihalar grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project, idx) => {
                  const stars = Array.from({ length: project.stars_count || 5 });
                  const screenshot =
                    project.screenshot_url ||
                    (project.live_url ? `https://image.thum.io/get/${project.live_url}` : null);
                  const isNew = project.id === newlyAddedId;
                  const isLocal = project._local;

                  return (
                    <motion.article
                      key={project.id || idx}
                      layout
                      initial={isNew ? { opacity: 0, scale: 0.7, rotate: -8, y: -40 } : false}
                      animate={isNew ? { opacity: 1, scale: 1, rotate: 0, y: 0 } : {}}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      whileHover={{ y: -8 }}
                      onMouseEnter={() => sounds.playKick()}
                      className={`relative bg-white dark:bg-zinc-900 border-3 rounded-xl p-5 md:p-6 shadow-scrapbook transition-all flex flex-col justify-between group ${
                        isNew ? 'border-pitch ring-4 ring-pitch/30' : 'border-black'
                      }`}
                      aria-label={`Loyiha: ${project.title}`}
                    >
                      {/* Skotch tasma */}
                      <div
                        className={`washi-tape w-24 -top-3 left-6 -rotate-6 ${isLocal ? 'washi-tape-pink' : 'washi-tape-blue'}`}
                        aria-hidden="true"
                      />

                      {/* Mahalliy (yangi qo'shilgan) belgisi */}
                      {isLocal && (
                        <div className="absolute top-3 right-10 bg-pitch text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black rounded uppercase shadow-sm" aria-label="Mahalliy qo'shilgan loyiha">
                          ✏️ {isUz ? 'Mening' : 'Mine'}
                        </div>
                      )}

                      {/* Asosiy belgi */}
                      {project.is_pinned && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black rounded uppercase shadow-sm">
                          {t('projects.pinned')}
                        </div>
                      )}

                      {/* Yangi qo'shilgan neon effekti */}
                      {isNew && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 3, delay: 0.5 }}
                          className="absolute inset-0 rounded-xl bg-pitch/10 pointer-events-none"
                          aria-hidden="true"
                        />
                      )}

                      <div>
                        {/* Yulduzlar */}
                        <div className="flex items-center gap-1 mb-2" aria-label={`${project.stars_count || 5} yulduz`}>
                          {stars.map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-black" aria-hidden="true" />
                          ))}
                          <span className="ml-1 text-xs font-mono font-bold text-gray-500">
                            ({project.stars_count || 5}/5)
                          </span>
                        </div>

                        {/* Sarlavha */}
                        <h3 className="text-2xl font-black font-hand text-navy dark:text-cream-100 group-hover:text-pitch transition-colors">
                          {project.title}
                        </h3>

                        {/* Tavsif */}
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 font-hand line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Texnologiyalar */}
                        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Texnologiyalar">
                          {project.tech && project.tech.map((tech, ti) => (
                            <span
                              key={ti}
                              className="px-2 py-0.5 text-xs font-mono font-bold bg-cream-200 dark:bg-zinc-800 text-black dark:text-white border border-black rounded shadow-scrapbook-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Skrinshot */}
                      {screenshot && (
                        <div className="mt-4 relative h-40 bg-zinc-100 border-2 border-black rounded-lg overflow-hidden">
                          <img
                            src={screenshot}
                            alt={`${project.title} skrinshotи`}
                            width={800}
                            height={400}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" aria-hidden="true" />
                        </div>
                      )}

                      {/* Tugmalar */}
                      <div className="mt-5 pt-3 border-t-2 border-dashed border-gray-300 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} GitHub kodi`}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-800 dark:text-gray-200 hover:text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded"
                            >
                              <Github className="w-4 h-4" aria-hidden="true" />
                              <span>{t('projects.github')}</span>
                            </a>
                          )}

                          {/* Mahalliy loyihani o'chirish */}
                          {isLocal && (
                            <button
                              onClick={() => handleDeleteLocal(project.id)}
                              aria-label={`${project.title} ni o'chirish`}
                              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-red-500 hover:text-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 rounded ml-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{isUz ? "O'chir" : 'Delete'}</span>
                            </button>
                          )}
                        </div>

                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live demo`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pitch text-white border-2 border-black rounded-md font-mono font-bold text-xs shadow-scrapbook-sm hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pitch"
                          >
                            <span>{t('projects.live')}</span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}

            {!isLoading && filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 font-hand text-xl mb-4">
                  ⚽ {isUz ? 'Hozircha loyihalar yo\'q. Birinchi o\'yinchini qo\'shing!' : 'No projects yet. Add your first player!'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { sounds.playWhistle(); setShowModal(true); }}
                  className="px-6 py-3 bg-pitch text-white border-3 border-black rounded-lg shadow-scrapbook font-hand text-lg font-black"
                >
                  + {isUz ? 'Yangi o\'yinchi qo\'sh' : 'Add New Player'}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <Suspense fallback={null}>
        {showModal && (
          <AddProjectModal
            onAdd={handleAddProject}
            onClose={() => setShowModal(false)}
          />
        )}
      </Suspense>
    </section>
  );
}
