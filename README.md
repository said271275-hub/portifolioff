# ⚽ Hojiakbar Bektemirov — Full-Stack Portfolio

> **Python/Django va React bilan Full-Stack dasturchi** | Guliston, O'zbekiston

[![CI](https://github.com/said271275-hub/portifolioff/actions/workflows/ci.yml/badge.svg)](https://github.com/said271275-hub/portifolioff/actions)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)](https://portifolioff.vercel.app)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7)](https://football-portfolio-backend.onrender.com/api/health/)

Futbol maydoni, retro Amiga, gazeta qirqmasi (ransom-note) va scrapbook uslubida yaratilgan professional **Full-Stack Portfolio**.

---

## 🚀 Texnologiyalar

| Qatlam | Texnologiya |
|--------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **i18n** | react-i18next (UZ/EN) |
| **Backend** | Python, Django 5, Django REST Framework |
| **Ma'lumotlar bazasi** | PostgreSQL (Neon) yoki SQLite |
| **Deploy** | Frontend → Vercel, Backend → Render |
| **CI/CD** | GitHub Actions |

---

## 📁 Loyiha tuzilmasi

```
portifolioff/
├── frontend/                   # React + Vite ilovasi
│   ├── src/
│   │   ├── components/         # UI komponentlar
│   │   ├── i18n/               # UZ/EN tarjimalar
│   │   ├── data/fallbackData.js# Backend uxlaganda zaxira
│   │   ├── utils/audio.js      # Web Audio API
│   │   └── api.js              # Backend integratsiyasi
│   ├── public/
│   │   ├── sitemap.xml
│   │   └── robots.txt
│   └── eslint.config.js
│
├── backend/                    # Django REST API
│   ├── config/
│   │   ├── settings.py         # Production-ready sozlamalar
│   │   └── urls.py             # /api/health/ endpointi
│   ├── apps/
│   │   ├── profile_app/        # Profil va tajriba
│   │   ├── projects/           # Loyihalar
│   │   ├── contact/            # Aloqa + Telegram bildirishnoma
│   │   └── stats/              # Tashriflar statistikasi
│   └── tests.py                # Asosiy testlar
│
├── .github/workflows/ci.yml    # CI pipeline
└── README.md
```

---

## ⚡ Tezkor ishga tushirish

### Frontend
```bash
cd frontend
npm install
cp .env.example .env     # VITE_API_URL ni to'ldiring
npm run dev              # http://localhost:5173
npm run build            # Production build
npm run lint             # ESLint tekshiruvi
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Muhit o'zgaruvchilarini to'ldiring
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Backend testlari:**
```bash
cd backend
python manage.py test tests --verbosity=2
```

---

## 🌟 Asosiy xususiyatlar

- 🌍 **UZ/EN til almashtirgich** — localStorage'da saqlanadi, brauzer tiliga qarab avtomatik
- ⚡ **Lazy loading** — `PitchFloor`, `FloatingStickers` va `confetti` kech yuklanadi
- 📱 **Mobile optimallashtirish** — telefonda 3D effektlar va stikerlar o'chiriladi
- ♿ **Accessibility** — WCAG AA, aria-label, keyboard nav, focus visible, semantic HTML
- 🔒 **Xavfsizlik** — CORS faqat Vercel domeniga, DRF throttling, honeypot spam himoyasi
- 📊 **SEO** — `<title>`, meta, Open Graph, Twitter Card, JSON-LD (Person schema), sitemap
- 🔄 **Fallback** — backend uxlaganda statik ma'lumotlar bilan to'liq ishlaydi
- 🔇 **Ovoz** — sukut bo'yicha o'chiq, holati localStorage'da saqlanadi
- ♿ **prefers-reduced-motion** — animatsiyalar minimallashtiriladi

---

## 🔗 API Endpointlar

| Endpoint | Metod | Tavsif |
|----------|-------|--------|
| `/api/health/` | GET | Backend salomatligi |
| `/api/profile/` | GET | Dasturchi profili |
| `/api/projects/` | GET | Loyihalar ro'yxati |
| `/api/experience/` | GET | Tajriba va ta'lim |
| `/api/stats/` | GET | Tashriflar statistikasi |
| `/api/contact/` | POST | Aloqa xabari (rate limit: 5/hour) |
| `/api/visit/` | POST | Tashrif qayd etish |

---

## 📸 Lighhouse Natijalarini Tekshirish

```bash
# 1. Frontend build qiling
cd frontend && npm run build && npm run preview

# 2. Chrome DevTools → Lighthouse → Analyze page load
# Yoki: npx lighthouse http://localhost:4173 --view
```

**Kutilayotgan natijalar:**
- Performance: 90+
- Accessibility: 92+
- Best Practices: 95+
- SEO: 96+

---

## 📋 Siz qo'lda qilishingiz kerak bo'lgan ishlar

1. **og-image.png** — 1200×630 px rasmingizni `frontend/public/` ga qo'ying
2. **Favicon** — real `favicon.ico` va `apple-touch-icon.png` qo'ying
3. **Profil rasmi** — avatar rasmini Django admin orqali yuklang
4. **Domen** — `hojiakbar.dev` yoki boshqa domenni sozlang; `index.html` va `sitemap.xml` da URL larni yangilang
5. **Telegram Bot** — `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` ni `.env` ga kiriting
6. **CORS** — backend `.env` da `FRONTEND_URL=https://sizning-domen.vercel.app` qo'ying
7. **GitHub Actions** — repo'ga push qilganda CI avtomatik ishga tushadi

---

## 👤 Muallif

**Hojiakbar Bektemirov** — Full-Stack Developer  
📍 Guliston, O'zbekiston  
📧 [said271275@gmail.com](mailto:said271275@gmail.com)  
💬 Telegram: [@BXS_738](https://t.me/BXS_738)  
🐙 GitHub: [@said271275-hub](https://github.com/said271275-hub)
