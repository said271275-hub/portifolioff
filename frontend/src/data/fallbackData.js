/**
 * Hojiakbar Bektemirov portfoliosi uchun to'liq statik ma'lumotlar.
 * Backend uxlayotgan yoki ulanmagan paytda ham sayt 100% to'laqonli ishlaydi.
 */

export const fallbackProfile = {
  full_name: "Hojiakbar Bektemirov",
  age: 19,
  birth_date: "08.03.2007",
  city: "Guliston",
  role: "FRONTEND DEVELOPER",
  jersey_number: "#8",
  team_badge: "Liverpool FC",
  bio: "Futbol maydonida Steven Gerrard kabi #8 raqamda tezkor fikrlash, aniq uzatma va g'alabaga intilish qanchalik muhim bo'lsa, frontend dasturlashda ham toza kod, mukammal dizayn va kuchli jamoaviy harakat shunchalik qadrlidir. You'll Never Walk Alone!",
  skills: [
    { name: "HTML5", level: 85, pace: 88, shooting: 80, pass: 90, dribble: 82, category: "Foundation" },
    { name: "CSS3", level: 80, pace: 84, shooting: 78, pass: 82, dribble: 85, category: "Design" },
    { name: "Tailwind CSS", level: 75, pace: 88, shooting: 76, pass: 85, dribble: 88, category: "Design" },
    { name: "JavaScript", level: 70, pace: 82, shooting: 75, pass: 86, dribble: 84, category: "Core" },
    { name: "React", level: 65, pace: 80, shooting: 72, pass: 84, dribble: 82, category: "Frontend" },
    { name: "Python", level: 55, pace: 70, shooting: 68, pass: 75, dribble: 65, category: "Backend" },
    { name: "C++", level: 30, pace: 60, shooting: 55, pass: 62, dribble: 50, category: "Algorithm" },
  ],
  languages: ["O'zbekcha (Ona tili)", "Inglizcha (O'rganmoqda)"],
  interests: ["Futbol (Liverpool muxlisi)", "UI/UX Animatsiyalar", "Web Dasturlash", "Taktik tahlil"],
  telegram: "@BXS_738",
  github: "said271275-hub",
  email: "said271275@gmail.com",
  linkedin: null,
  signature_text: "Hojiakbar",
  avatar_url: null,
};

export const fallbackProjects = [
  {
    id: 1,
    title: "RENESSANS.FRONTEND",
    description: "O'quv markazi rasmiy veb-platformasi va interaktiv frontend qismi. Zamonaviy komponentlar arxitekturasi va responsive dizayn.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    live_url: "https://renessans-frontend.vercel.app",
    github_url: "https://github.com/said271275-hub/RENESSANS.FRONTEND",
    stars_count: 5,
    is_pinned: true,
    screenshot_url: "https://image.thum.io/get/https://renessans-frontend.vercel.app",
  },
  {
    id: 2,
    title: "distribyutsiya",
    description: "Mahsulotlarni yetkazib berish, buyurtmalarni qabul qilish va savdo hisobini yuritishga mo'ljallangan qulay veb-tizim.",
    tech: ["JavaScript", "React", "CSS3", "HTML5"],
    live_url: "https://distribyutsiya.vercel.app",
    github_url: "https://github.com/said271275-hub/distribyutsiya",
    stars_count: 5,
    is_pinned: true,
    screenshot_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "it-live-academy-",
    description: "IT Live Academy o'quv markazi uchun boshqaruv paneli (admin CRM dashboard) va guruhlar monitoringi.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    live_url: "https://it-live-academy.vercel.app",
    github_url: "https://github.com/said271275-hub/it-live-academy-",
    stars_count: 5,
    is_pinned: true,
    screenshot_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "talaba.uz",
    description: "Talabalar uchun o'quv qo'llanmalari, testlar va qulay axborot platformasi.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    live_url: "https://talaba-uz.vercel.app",
    github_url: "https://github.com/said271275-hub/talaba.uz",
    stars_count: 4,
    is_pinned: false,
    screenshot_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "mebel.uz",
    description: "Sifatli uy va ofis mebellari do'koni uchun katalog va buyurtma berish interfeysi.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    live_url: "https://mebel-uz.vercel.app",
    github_url: "https://github.com/said271275-hub/mebel.uz",
    stars_count: 4,
    is_pinned: false,
    screenshot_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "burger-bot",
    description: "Burger va fast-food mahsulotlarini tezkor buyurtma qilish uchun Python dasturlash tilida yozilgan Telegram bot.",
    tech: ["Python", "Telegram Bot API"],
    live_url: "",
    github_url: "https://github.com/said271275-hub/burger-bot",
    stars_count: 4,
    is_pinned: false,
    screenshot_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    title: "coffeshopplay",
    description: "Qahva ixlosmandlari uchun maxsus qahvaxona taomnomasi va zamonaviy veb-sahifa dizayni.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    live_url: "https://coffeeshop-play.vercel.app",
    github_url: "https://github.com/said271275-hub/coffeshopplay",
    stars_count: 4,
    is_pinned: false,
    screenshot_url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    title: "tugilgan-kun",
    description: "Yaqin insonlar uchun chiroyli animatsiyalar va musiqali tabrik sahifasi.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    live_url: "https://tugilgan-kun.vercel.app",
    github_url: "https://github.com/said271275-hub/tugilgan-kun",
    stars_count: 4,
    is_pinned: false,
    screenshot_url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60",
  }
];

export const fallbackExperience = [
  {
    id: 1,
    title: "Frontend Dasturlash Yo'nalishi",
    place: "IT Live Academy",
    start: "2026",
    end: "Hozirgacha",
    description: "HTML, CSS, JavaScript, React va zamonaviy kutubxonalar bo'yicha chuqur amaliy bilimlar hamda real loyihalar yaratish.",
    role_type: "education",
    order: 1
  },
  {
    id: 2,
    title: "Mustaqil Amaliyot va Shaxsiy Loyihalar",
    place: "Frontend Arena (Self-Taught)",
    start: "2025",
    end: "Hozirgacha",
    description: "Renessans Frontend, distribyutsiya, telegram botlar va veb-ilovalarni mustaqil ishlab chiqish va GitHub'da rivojlantirish.",
    role_type: "work",
    order: 2
  }
];

export const fallbackStats = {
  total_visits: 1892,
  today_visits: 54,
  total_projects: 12,
  total_messages: 19,
  stadium_capacity: "Anfield • 61,000",
  atmosphere: "100% Elektr (YNWA)"
};
