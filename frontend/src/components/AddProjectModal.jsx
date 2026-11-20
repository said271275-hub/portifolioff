import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Plus, Github, ExternalLink, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

const TECH_OPTIONS = [
  'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS',
  'Python', 'Django', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB',
  'Telegram Bot API', 'REST API', 'Next.js', 'Vue.js',
];

export default function AddProjectModal({ onAdd, onClose }) {
  const { t, i18n } = useTranslation();
  const isUz = i18n.language === 'uz';

  const [form, setForm] = useState({
    title: '',
    description: '',
    tech: [],
    live_url: '',
    github_url: '',
    screenshot_url: '',
    is_pinned: false,
  });
  const [errors, setErrors] = useState({});
  const [techInput, setTechInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = isUz ? 'Loyiha nomi majburiy' : 'Project name required';
    if (!form.description.trim()) errs.description = isUz ? 'Tavsif majburiy' : 'Description required';
    if (form.tech.length === 0) errs.tech = isUz ? 'Kamida 1 ta texnologiya tanlang' : 'Select at least 1 technology';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const addTech = (tech) => {
    if (!tech.trim() || form.tech.includes(tech)) return;
    setForm((prev) => ({ ...prev, tech: [...prev.tech, tech] }));
    setTechInput('');
    if (errors.tech) setErrors((prev) => ({ ...prev, tech: null }));
  };

  const removeTech = (tech) => {
    setForm((prev) => ({ ...prev, tech: prev.tech.filter((t) => t !== tech) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playKick();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newProject = {
      id: Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      tech: form.tech,
      live_url: form.live_url.trim(),
      github_url: form.github_url.trim(),
      screenshot_url: form.screenshot_url.trim() || null,
      is_pinned: form.is_pinned,
      stars_count: 5,
      _local: true, // localStorage'dan ekanligini bildiradi
    };

    setSubmitted(true);
    sounds.playGoalCheer();
    sounds.playWhistle();

    setTimeout(() => {
      onAdd(newProject);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-label={isUz ? 'Yangi loyiha qo\'shish' : 'Add New Project'}
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -4, y: 40 }}
          animate={submitted ? { scale: 1.05, rotate: 0, y: 0 } : { scale: 1, rotate: 0, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-lg bg-cream-100 dark:bg-zinc-900 border-4 border-black rounded-2xl shadow-scrapbook-lg overflow-hidden"
        >
          {/* Skotch tasmalar */}
          <div className="washi-tape washi-tape-pink w-28 -top-2 left-8 -rotate-3" aria-hidden="true" />
          <div className="washi-tape washi-tape-blue w-24 -top-2 right-8 rotate-2" aria-hidden="true" />

          {/* Muvaffaqiyat holati */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-pitch text-white rounded-2xl"
              >
                <div className="text-7xl mb-4">⚽</div>
                <div className="font-display text-3xl tracking-widest text-referee-yellow">
                  {isUz ? 'GOL!' : 'GOAL!'}
                </div>
                <div className="font-hand text-xl mt-2 font-bold">
                  {isUz ? 'Loyiha qo\'shildi!' : 'Project added!'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b-2 border-black pt-7">
            <div>
              <div className="font-display text-2xl text-navy dark:text-cream-100 tracking-wider">
                {isUz ? '+ YANGI O\'YINCHI' : '+ NEW PLAYER'}
              </div>
              <div className="text-xs font-mono text-gray-500 mt-0.5">
                {isUz ? 'Transfer oynasiga yangi loyiha qo\'sh' : 'Add a new project to the transfer window'}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label={isUz ? 'Yopish' : 'Close'}
              className="w-9 h-9 rounded-full border-2 border-black bg-referee-red text-white flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">

            {/* Loyiha nomi */}
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                {isUz ? 'Loyiha nomi' : 'Project Name'} *
              </label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder={isUz ? 'masalan: RENESSANS.FRONTEND' : 'e.g. My Awesome App'}
                className={`w-full px-3 py-2 bg-white dark:bg-zinc-800 border-2 rounded-lg font-hand text-lg focus:outline-none focus:ring-2 focus:ring-referee-yellow ${errors.title ? 'border-red-500' : 'border-black'}`}
              />
              {errors.title && (
                <p className="text-xs font-mono text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.title}
                </p>
              )}
            </div>

            {/* Tavsif */}
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                {isUz ? 'Tavsif' : 'Description'} *
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder={isUz ? 'Loyiha haqida qisqacha...' : 'Short description of your project...'}
                className={`w-full px-3 py-2 bg-white dark:bg-zinc-800 border-2 rounded-lg font-hand text-base focus:outline-none focus:ring-2 focus:ring-referee-yellow resize-none ${errors.description ? 'border-red-500' : 'border-black'}`}
              />
              {errors.description && (
                <p className="text-xs font-mono text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.description}
                </p>
              )}
            </div>

            {/* Texnologiyalar */}
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                {isUz ? 'Texnologiyalar' : 'Technologies'} *
              </label>

              {/* Tanlangan texnologiyalar */}
              <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
                {form.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-pitch text-white text-xs font-mono font-bold border border-black rounded shadow-scrapbook-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      aria-label={`${tech} ni olib tashlash`}
                      className="hover:text-red-300 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Tez tanlash tugmalari */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {TECH_OPTIONS.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => addTech(tech)}
                    disabled={form.tech.includes(tech)}
                    className={`px-2 py-0.5 text-xs font-mono font-bold border border-black rounded transition-all ${
                      form.tech.includes(tech)
                        ? 'bg-pitch text-white opacity-50 cursor-not-allowed'
                        : 'bg-cream-200 dark:bg-zinc-700 text-black dark:text-white hover:bg-referee-yellow hover:border-black'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>

              {/* Qo'lda kiritish */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); addTech(techInput); }
                  }}
                  placeholder={isUz ? 'Boshqa texnologiya...' : 'Other technology...'}
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-zinc-800 border-2 border-black rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-referee-yellow"
                />
                <button
                  type="button"
                  onClick={() => addTech(techInput)}
                  className="px-3 py-1.5 bg-referee-yellow border-2 border-black rounded-lg font-bold text-sm hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {errors.tech && (
                <p className="text-xs font-mono text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.tech}
                </p>
              )}
            </div>

            {/* Live URL */}
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                <ExternalLink className="inline w-3 h-3 mr-1" />
                Live URL
              </label>
              <input
                name="live_url"
                type="url"
                value={form.live_url}
                onChange={handleChange}
                placeholder="https://my-project.vercel.app"
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border-2 border-black rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-referee-yellow"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                <Github className="inline w-3 h-3 mr-1" />
                GitHub URL
              </label>
              <input
                name="github_url"
                type="url"
                value={form.github_url}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border-2 border-black rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-referee-yellow"
              />
            </div>

            {/* Skrinshot URL */}
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                📸 {isUz ? 'Skrinshot URL (ixtiyoriy)' : 'Screenshot URL (optional)'}
              </label>
              <input
                name="screenshot_url"
                type="url"
                value={form.screenshot_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border-2 border-black rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-referee-yellow"
              />
            </div>

            {/* Asosiy loyiha */}
            <div className="flex items-center gap-2">
              <input
                id="is_pinned"
                name="is_pinned"
                type="checkbox"
                checked={form.is_pinned}
                onChange={handleChange}
                className="w-4 h-4 border-2 border-black rounded accent-referee-yellow cursor-pointer"
              />
              <label htmlFor="is_pinned" className="text-sm font-hand font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                🔥 {isUz ? 'Asosiy loyiha sifatida belgilash' : 'Mark as featured project'}
              </label>
            </div>

            {/* Yuborish */}
            <button
              type="submit"
              className="w-full py-3.5 bg-referee-yellow hover:bg-yellow-400 active:scale-95 text-black border-3 border-black rounded-xl font-display font-black text-xl tracking-wider uppercase shadow-scrapbook transition-all flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <span>⚽</span>
              {isUz ? 'O\'YINCHINI QABUL QIL!' : 'ADD PLAYER!'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
