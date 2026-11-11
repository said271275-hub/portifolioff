import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FloatingStickers from './components/FloatingStickers';
import HeroIDCard from './components/HeroIDCard';
import PitchFloor from './components/PitchFloor';
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
  recordVisit
} from './api';

export default function App() {
  const [isNight, setIsNight] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // API Ma'lumotlari
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [stats, setStats] = useState(null);

  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  // Sahifa yuklanganda API chaqiruvlari va tashrifni qayd etish
  useEffect(() => {
    // 1. Tashrifni fon rejimida qayd etish (/api/visit/)
    recordVisit();

    // 2. Profilni yuklash
    fetchProfile().then(res => setProfile(res.data));

    // 3. Loyihalarni yuklash
    fetchProjects()
      .then(res => {
        setProjects(res.data);
        setIsLoadingProjects(false);
      })
      .catch(err => {
        setProjectsError("Loyihalarni yuklashda xatolik yuz berdi.");
        setIsLoadingProjects(false);
      });

    // 4. Tajriba / Mavsumlarni yuklash
    fetchExperience().then(res => setExperience(res.data));

    // 5. Stadion statistikasini yuklash
    fetchStats().then(data => setStats(data));
  }, []);

  // Tungi stadion (projektorlar) klassini html/body ga qo'llash
  useEffect(() => {
    if (isNight) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isNight]);

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-referee-yellow selection:text-black">
      
      {/* Tungi rejimda stadion projektorlari (Floodlight nurlari) */}
      {isNight && (
        <div className="fixed inset-0 pointer-events-none z-0 floodlight-beam"></div>
      )}

      {/* Fonda suzuvchi stikerlar (To'p, hushtak, kartochkalar) */}
      <FloatingStickers />

      {/* Yuqori tasma va sozlamalar */}
      <Navbar
        isNight={isNight}
        setIsNight={setIsNight}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      <main className="flex-1 relative z-10">
        {/* A) Hero / Osilgan ID karta */}
        <HeroIDCard profile={profile} />

        {/* 3D Perspektivali futbol maydoni poli (rasmdagi pastki pol effekti) */}
        <PitchFloor />

        {/* B) Skills / O'yinchi statistikasi (Polaroid FIFA kartalari) */}
        <SkillsSection skills={profile.skills} />

        {/* C) Projects / O'yinlar qaydnomasi (Ochiluvchi papka va Match Cards) */}
        <ProjectsSection
          projects={projects}
          isLoading={isLoadingProjects}
          error={projectsError}
        />

        {/* D) About / Retro kompyuter (Amiga OS va 4-3-3 taktika doskasi) */}
        <AboutSection profile={profile} experience={experience} />

        {/* E) Contact / Stadion Tablosi va Final Hushtagi */}
        <ContactSection profile={profile} stats={stats} />
      </main>

      {/* Sayt pastki qismi */}
      <Footer profile={profile} />

    </div>
  );
}

