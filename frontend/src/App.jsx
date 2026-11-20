import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import HeroIDCard from './components/HeroIDCard';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import {
  fetchProfile,
  fetchProjects,
  fetchExperience,
  fetchStats,
  recordVisit,
} from './api';

import {
  fallbackProfile,
  fallbackProjects,
  fallbackExperience,
  fallbackStats,
} from './data/fallbackData';

// Og'ir komponentlar kech yuklanadi
const FloatingStickers = lazy(() => import('./components/FloatingStickers'));
const PitchFloor = lazy(() => import('./components/PitchFloor'));

// prefers-reduced-motion
const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

// Mobile (<768px) aniqlash
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function App() {
  const { i18n } = useTranslation();
  const [isNight, setIsNight] = useState(false);
  // Ovoz sukut bo'yicha MUTED — localStorage'dan o'qiladi
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('portfolio_sound');
    return saved !== null ? saved === 'true' : true;
  });

  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [experience, setExperience] = useState(fallbackExperience);
  const [stats, setStats] = useState(fallbackStats);

  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // lang atributi
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    recordVisit();

    fetchProfile().then((res) => {
      setProfile(res.data);
      if (res.isFallback) setIsFallback(true);
    });

    fetchProjects()
      .then((res) => {
        setProjects(res.data);
        setIsLoadingProjects(false);
      })
      .catch(() => {
        setProjectsError('projects.error');
        setIsLoadingProjects(false);
      });

    fetchExperience().then((res) => setExperience(res.data));
    fetchStats().then((data) => setStats(data));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isNight);
  }, [isNight]);

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-referee-yellow selection:text-black">
      {/* Tungi stadion projektorlari */}
      {isNight && !prefersReducedMotion && (
        <div
          className="fixed inset-0 pointer-events-none z-0 floodlight-beam"
          aria-hidden="true"
        />
      )}

      {/* Suzuvchi stikerlar: mobile yoki reduced-motion da o'chiriladi */}
      {!isMobile && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <FloatingStickers />
        </Suspense>
      )}

      {/* Backend fallback banneri */}
      {isFallback && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 bg-amber-100 border-2 border-black px-4 py-2 rounded-lg shadow-scrapbook text-sm font-mono font-bold text-amber-900"
        >
          ⚠️ Demo rejim — backend uxlamoqda
        </div>
      )}

      <Navbar
        isNight={isNight}
        setIsNight={setIsNight}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      <main id="main-content" className="flex-1 relative z-10">
        {/* Hero */}
        <HeroIDCard profile={profile} />

        {/* 3D Futbol maydoni poli */}
        <Suspense fallback={<div className="h-32 bg-pitch-dark" aria-hidden="true" />}>
          <PitchFloor />
        </Suspense>

        {/* Ko'nikmalar */}
        <SkillsSection skills={profile.skills} />

        {/* Loyihalar */}
        <ProjectsSection
          projects={projects}
          isLoading={isLoadingProjects}
          error={projectsError}
        />

        {/* Men haqimda */}
        <AboutSection experience={experience} />

        {/* Bog'lanish */}
        <ContactSection profile={profile} stats={stats} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
