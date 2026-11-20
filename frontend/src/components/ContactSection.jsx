import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Send,
  Mail,
  Github,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RansomTitle from './RansomTitle';
import { sendContactMessage } from '../api';
import { sounds } from '../utils/audio';

export default function ContactSection({ profile = {}, stats = {} }) {
  const { t } = useTranslation();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const nameErrId = useId();
  const emailErrId = useId();
  const messageErrId = useId();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [statusState, setStatusState] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Ism majburiy maydon';
    if (!formData.email.trim()) errs.email = 'Email majburiy maydon';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "To'g'ri email kiriting";
    if (!formData.message.trim()) errs.message = 'Xabar majburiy maydon';
    else if (formData.message.trim().length < 10)
      errs.message = "Xabar kamida 10 ta belgi bo'lishi kerak";
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Xatoni real vaqtda tozalash
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sounds.playKick();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatusState({ submitting: true, success: false, error: null });

    try {
      await sendContactMessage(formData);

      sounds.playGoalCheer();
      sounds.playWhistle();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#2d7a46', '#EF4444', '#1E2A5A', '#FFFFFF'],
      });

      setStatusState({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (err) {
      sounds.playWhistle();
      setStatusState({
        submitting: false,
        success: false,
        error: err.message || t('contact.error_generic'),
      });
    }
  };

  return (
    <section
      id="contact"
      aria-label={t('contact.title')}
      className="py-20 px-4 max-w-7xl mx-auto relative"
    >
      {/* Sarlavha */}
      <div className="flex flex-col items-center mb-12 text-center">
        <RansomTitle text={t('contact.title')} className="justify-center" />
        <p className="mt-3 text-lg font-hand font-bold text-gray-700 dark:text-gray-300">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Chap: Stadion tablosi */}
        <div
          className="lg:col-span-5 bg-zinc-950 border-4 border-black rounded-2xl p-6 shadow-scrapbook-lg text-white flex flex-col justify-between relative overflow-hidden"
          aria-label="Stadion tablosi va to'g'ridan-to'g'ri aloqa"
        >
          <div
            className="absolute top-2 inset-x-0 flex justify-between px-4 opacity-50"
            aria-hidden="true"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div>
            <div className="text-center border-b-2 border-dashed border-zinc-700 pb-4 pt-2">
              <span className="font-display tracking-widest text-2xl text-referee-yellow uppercase">
                STADION TABLOSI
              </span>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">
                MATCH MINUTE: 90'+3
              </div>
            </div>

            <div className="my-6 grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-zinc-900 border-2 border-zinc-700 rounded-lg">
                <span className="text-xs font-mono text-gray-400 block">{t('contact.total_visits')}</span>
                <span className="font-display text-3xl text-emerald-400">
                  {stats?.total_visits || 1240}
                </span>
                <span className="text-[10px] text-gray-500 block">Muxlislar</span>
              </div>
              <div className="p-3 bg-zinc-900 border-2 border-zinc-700 rounded-lg">
                <span className="text-xs font-mono text-gray-400 block">{t('contact.atmosphere')}</span>
                <span className="font-display text-3xl text-yellow-400">100%</span>
                <span className="text-[10px] text-gray-500 block">Elektr</span>
              </div>
            </div>

            {/* To'g'ridan-to'g'ri aloqa */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                {t('contact.direct_contact')}:
              </p>

              <a
                href={
                  profile.telegram
                    ? `https://t.me/${profile.telegram.replace('@', '')}`
                    : 'https://t.me/BXS_738'
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playKick()}
                aria-label={`Telegram: ${profile.telegram || '@BXS_738'}`}
                className="flex items-center gap-3 p-3 bg-zinc-900 border-2 border-zinc-700 hover:border-blue-400 rounded-lg transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white" aria-hidden="true">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Telegram</span>
                  <span className="font-mono text-sm font-bold text-white group-hover:text-blue-400">
                    {profile.telegram || '@BXS_738'}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${profile.email || 'said271275@gmail.com'}`}
                onClick={() => sounds.playKick()}
                aria-label={`Email: ${profile.email || 'said271275@gmail.com'}`}
                className="flex items-center gap-3 p-3 bg-zinc-900 border-2 border-zinc-700 hover:border-emerald-400 rounded-lg transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white" aria-hidden="true">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Email</span>
                  <span className="font-mono text-sm font-bold text-white group-hover:text-emerald-400 truncate block max-w-[200px]">
                    {profile.email || 'said271275@gmail.com'}
                  </span>
                </div>
              </a>

              <a
                href={`https://github.com/${profile.github || 'said271275-hub'}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playKick()}
                aria-label={`GitHub: ${profile.github || 'said271275-hub'}`}
                className="flex items-center gap-3 p-3 bg-zinc-900 border-2 border-zinc-700 hover:border-yellow-400 rounded-lg transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white" aria-hidden="true">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">GitHub</span>
                  <span className="font-mono text-sm font-bold text-white group-hover:text-yellow-400">
                    {profile.github || 'said271275-hub'}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-zinc-800 text-[11px] font-mono text-center text-zinc-500">
            FC FRONTEND • TRANSFER OYNASI OCHIQ 🟢
          </div>
        </div>

        {/* O'ng: Aloqa formasi */}
        <div className="lg:col-span-7 bg-cream-100 dark:bg-zinc-800 border-4 border-black rounded-2xl p-6 md:p-8 shadow-scrapbook-lg relative">
          <div className="washi-tape washi-tape-pink w-32 -top-3 left-10 -rotate-3" aria-hidden="true" />
          <div className="washi-tape washi-tape-blue w-28 -top-3 right-10 rotate-6" aria-hidden="true" />

          <div className="mb-6">
            <h2 className="font-hand font-black text-3xl text-navy dark:text-cream-100">
              📝 {t('contact.subtitle').replace('📢 ', '')}
            </h2>
          </div>

          {/* Muvaffaqiyat */}
          {statusState.success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              role="status"
              aria-live="polite"
              className="p-5 bg-emerald-100 border-3 border-black rounded-xl mb-6 flex items-center gap-3 shadow-scrapbook"
            >
              <CheckCircle className="w-8 h-8 text-emerald-700 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-hand font-black text-xl text-emerald-900">{t('contact.success')}</p>
                <p className="text-xs font-mono text-emerald-800 mt-0.5">
                  Tez orada javob beraman!
                </p>
              </div>
            </motion.div>
          )}

          {/* Xatolik */}
          {statusState.error && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 bg-red-100 border-2 border-black rounded-xl mb-6 flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />
              <span className="text-xs font-mono font-bold text-red-800">{statusState.error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Aloqa formasi">
            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none' }}
            />

            {/* Ism */}
            <div>
              <label
                htmlFor={nameId}
                className="block text-sm font-mono font-bold text-gray-800 dark:text-gray-200 mb-1"
              >
                {t('contact.name')} <span aria-hidden="true">*</span>
              </label>
              <input
                id={nameId}
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name_placeholder')}
                aria-describedby={errors.name ? nameErrId : undefined}
                aria-invalid={!!errors.name}
                className={`w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 rounded-lg shadow-scrapbook-sm font-hand text-lg focus:outline-none focus:ring-2 focus:ring-referee-yellow ${
                  errors.name ? 'border-red-500' : 'border-black'
                }`}
              />
              {errors.name && (
                <p id={nameErrId} role="alert" className="text-xs font-mono text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor={emailId}
                className="block text-sm font-mono font-bold text-gray-800 dark:text-gray-200 mb-1"
              >
                {t('contact.email')} <span aria-hidden="true">*</span>
              </label>
              <input
                id={emailId}
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email_placeholder')}
                aria-describedby={errors.email ? emailErrId : undefined}
                aria-invalid={!!errors.email}
                className={`w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 rounded-lg shadow-scrapbook-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-referee-yellow ${
                  errors.email ? 'border-red-500' : 'border-black'
                }`}
              />
              {errors.email && (
                <p id={emailErrId} role="alert" className="text-xs font-mono text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Xabar */}
            <div>
              <label
                htmlFor={messageId}
                className="block text-sm font-mono font-bold text-gray-800 dark:text-gray-200 mb-1"
              >
                {t('contact.message')} <span aria-hidden="true">*</span>
              </label>
              <textarea
                id={messageId}
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message_placeholder')}
                aria-describedby={errors.message ? messageErrId : undefined}
                aria-invalid={!!errors.message}
                className={`w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 rounded-lg shadow-scrapbook-sm font-hand text-lg focus:outline-none focus:ring-2 focus:ring-referee-yellow resize-none ${
                  errors.message ? 'border-red-500' : 'border-black'
                }`}
              />
              {errors.message && (
                <p id={messageErrId} role="alert" className="text-xs font-mono text-red-600 mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Yuborish */}
            <button
              type="submit"
              disabled={statusState.submitting}
              aria-busy={statusState.submitting}
              className="w-full py-4 bg-referee-yellow hover:bg-yellow-400 active:scale-95 text-black border-3 border-black rounded-xl font-display font-black text-xl tracking-wider uppercase shadow-scrapbook transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
              <span>
                {statusState.submitting ? t('contact.sending') : t('contact.send')}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
