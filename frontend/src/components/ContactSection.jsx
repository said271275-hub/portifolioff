import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, MessageCircle, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import RansomTitle from './RansomTitle';
import { sendContactMessage } from '../api';
import { sounds } from '../utils/audio';

export default function ContactSection({ profile, stats }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Spam botlar uchun yashirin maydon
  });

  const [statusState, setStatusState] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sounds.playKick();

    setStatusState({ submitting: true, success: false, error: null });

    try {
      await sendContactMessage(formData);
      
      // Gol ovozi va hushtak
      sounds.playGoalCheer();
      sounds.playWhistle();

      // Stadion konfettisi (Gol nishonlash)
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#2d7a46', '#EF4444', '#1E2A5A', '#FFFFFF']
      });

      setStatusState({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (err) {
      sounds.playWhistle();
      setStatusState({
        submitting: false,
        success: false,
        error: err.message || "Xabar yuborishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring."
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-7xl mx-auto relative">
      
      {/* Sarlavha: Gazeta qirqmasi */}
      <div className="flex flex-col items-center mb-12 text-center">
        <RansomTitle text="FINAL WHISTLE SCOREBOARD" className="justify-center" />
        <p className="mt-3 text-lg font-hand font-bold text-gray-700 dark:text-gray-300">
          📢 Final hushtagi va stadion tablosi — jamoaga yangi transfer taklifini yuboring!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Chap taraf: Stadion elektron Tablosi (LED Scoreboard) */}
        <div className="lg:col-span-5 bg-zinc-950 border-4 border-black rounded-2xl p-6 shadow-scrapbook-lg text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Tablo lampochkalari */}
          <div className="absolute top-2 inset-x-0 flex justify-between px-4 opacity-50">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>

          <div>
            {/* Tablo sarlavhasi */}
            <div className="text-center border-b-2 border-dashed border-zinc-700 pb-4 pt-2">
              <span className="font-display tracking-widest text-2xl text-referee-yellow uppercase">
                STADION TABLOSI
              </span>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">
                MATCH MINUTE: 90'+3 (INJURY TIME)
              </div>
            </div>

            {/* Hisob va Muxlislar */}
            <div className="my-6 grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-zinc-900 border-2 border-zinc-700 rounded-lg">
                <span className="text-xs font-mono text-gray-400 block">JAMI TASHRIF</span>
                <span className="font-display text-3xl text-emerald-400">
                  {stats?.total_visits || 1240}
                </span>
                <span className="text-[10px] text-gray-500 block">Muxlislar</span>
              </div>
              <div className="p-3 bg-zinc-900 border-2 border-zinc-700 rounded-lg">
                <span className="text-xs font-mono text-gray-400 block">ATMOSFERA</span>
                <span className="font-display text-3xl text-yellow-400">
                  100%
                </span>
                <span className="text-[10px] text-gray-500 block">Elektr</span>
              </div>
            </div>

            {/* Ijtimoiy tarmoqlar (Klub kanallari) */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                To'g'ridan-to'g'ri aloqa:
              </div>

              {/* Telegram */}
              <a
                href={profile.telegram ? `https://t.me/${profile.telegram.replace('@', '')}` : "https://t.me"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playKick()}
                className="flex items-center gap-3 p-3 bg-zinc-900 border-2 border-zinc-700 hover:border-blue-400 rounded-lg transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Telegram</span>
                  <span className="font-mono text-sm font-bold text-white group-hover:text-blue-400">
                    {profile.telegram || "@username"}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.email || "developer@example.com"}`}
                onClick={() => sounds.playKick()}
                className="flex items-center gap-3 p-3 bg-zinc-900 border-2 border-zinc-700 hover:border-emerald-400 rounded-lg transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Email</span>
                  <span className="font-mono text-sm font-bold text-white group-hover:text-emerald-400 truncate max-w-[200px]">
                    {profile.email || "developer@example.com"}
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={`https://github.com/${profile.github || "username"}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playKick()}
                className="flex items-center gap-3 p-3 bg-zinc-900 border-2 border-zinc-700 hover:border-yellow-400 rounded-lg transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">GitHub Profil</span>
                  <span className="font-mono text-sm font-bold text-white group-hover:text-yellow-400">
                    {profile.github || "username"}
                  </span>
                </div>
              </a>
            </div>

          </div>

          <div className="mt-6 pt-3 border-t border-zinc-800 text-[11px] font-mono text-center text-zinc-500">
            FC FRONTEND • TRANSFER OYNASI OCHIQ 🟢
          </div>

        </div>

        {/* O'ng taraf: Transfer / Aloqa formasi (Kollaj qog'oz varag'i) */}
        <div className="lg:col-span-7 bg-cream-100 dark:bg-zinc-800 border-4 border-black rounded-2xl p-6 md:p-8 shadow-scrapbook-lg relative">
          
          {/* Skotch tasma */}
          <div className="washi-tape washi-tape-pink w-32 -top-3 left-10 -rotate-3"></div>
          <div className="washi-tape washi-tape-blue w-28 -top-3 right-10 rotate-6"></div>

          <div className="mb-6">
            <h3 className="font-hand font-black text-3xl text-navy dark:text-cream-100">
              📝 Jamoaga Qo'shilish / Taklif Formasi
            </h3>
            <p className="text-sm font-hand font-bold text-gray-600 dark:text-gray-300 mt-1">
              Savol, loyiha taklifi yoki ish shartnomasi bo'yicha to'g'ridan-to'g'ri xabar qoldiring.
            </p>
          </div>

          {/* Muvaffaqiyat xabari */}
          {statusState.success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 bg-emerald-100 border-3 border-black rounded-xl mb-6 flex items-center gap-3 shadow-scrapbook"
            >
              <CheckCircle className="w-8 h-8 text-emerald-700 shrink-0" />
              <div>
                <h4 className="font-hand font-black text-xl text-emerald-900">
                  Xabar yuborildi, gol! ⚽
                </h4>
                <p className="text-xs font-mono text-emerald-800 mt-0.5">
                  Xabaringiz jamoa shtabiga va Telegramga yetkazildi. Tez orada javob beraman!
                </p>
              </div>
            </motion.div>
          )}

          {/* Xatolik xabari */}
          {statusState.error && (
            <div className="p-4 bg-red-100 border-2 border-black rounded-xl mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="text-xs font-mono font-bold text-red-800">{statusState.error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Yashirin Honeypot (Spam botlarni tutish uchun) */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            {/* Ism */}
            <div>
              <label className="block text-sm font-mono font-bold text-gray-800 dark:text-gray-200 mb-1">
                Ismingiz yoki Kompaniya / Klub nomi *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Masalan: Sardor yoki Real Madrid FC"
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-black rounded-lg shadow-scrapbook-sm font-hand text-lg focus:outline-none focus:ring-2 focus:ring-referee-yellow"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-mono font-bold text-gray-800 dark:text-gray-200 mb-1">
                Email manzilingiz *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="aloqa@kompaniya.uz"
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-black rounded-lg shadow-scrapbook-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-referee-yellow"
              />
            </div>

            {/* Xabar matni */}
            <div>
              <label className="block text-sm font-mono font-bold text-gray-800 dark:text-gray-200 mb-1">
                Taktik xabar / Taklif matni *
              </label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Assalomu alaykum! Loyihangiz yoqdi, bizning jamoada frontend bo'yicha hamkorlik qilaylik..."
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-black rounded-lg shadow-scrapbook-sm font-hand text-lg focus:outline-none focus:ring-2 focus:ring-referee-yellow resize-none"
              ></textarea>
            </div>

            {/* Yuborish tugmasi: "Jamoaga qo'shil" */}
            <button
              type="submit"
              disabled={statusState.submitting}
              className="w-full py-4 bg-referee-yellow hover:bg-yellow-400 active:scale-95 text-black border-3 border-black rounded-xl font-display font-black text-xl tracking-wider uppercase shadow-scrapbook transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{statusState.submitting ? "Zarba berilmoqda..." : "Jamoaga qo'shil ⚽"}</span>
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

