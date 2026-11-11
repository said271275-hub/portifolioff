# ⚽ Futbol Mavzusidagi Interaktiv Portfolio (Scrapbook / Retro Collage)

Ushbu loyiha futbol maydoni, retro Amiga kompyuteri, gazeta qirqmalari (ransom-note) va interaktiv scrapbook uslubida yaratilgan professional **Full-Stack Portfolio** platformasidir.

- **Frontend:** React + Vite + Tailwind CSS + Framer Motion + Web Audio API (Hushtak va to'p tovushlari) + Canvas Confetti
- **Backend:** Python + Django 5 + Django REST Framework + CORS Headers + WhiteNoise + Gunicorn
- **Ma'lumotlar bazasi:** PostgreSQL (Neon) yoki lokal SQLite
- **Deploy:** Frontend Vercel, Backend Render, Media Cloudinary

---

## 📁 1. Papka Tuzilmasi va Komponentlar Ro'yxati

```text
portfolio/
├── backend/                        # Django REST API
│   ├── config/                     # Asosiy Django konfiguratsiyasi
│   │   ├── settings.py             # CORS, Database, Cache, DRF throttling
│   │   ├── urls.py                 # Asosiy API yo'naltiruvchilari
│   │   ├── wsgi.py                 # Render / Gunicorn server ulanishi
│   │   └── asgi.py
│   ├── apps/
│   │   ├── profile_app/            # O'yinchi profili va tajriba (mavsumlar)
│   │   ├── projects/               # Loyihalar va GitHub Proxy xizmati
│   │   ├── contact/                # Aloqa formasi va Telegram Bot bildirishnomasi
│   │   └── stats/                  # Tashriflar va stadion statistikasi
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
│
└── frontend/                       # React + Vite Ilovasi
    ├── public/
    │   └── images/                 # Rasmlar va media yo'riqnomasi
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx          # Kun/Tun stadion projektori va ovoz sozlamasi
    │   │   ├── HeroIDCard.jsx      # Tepadan osilgan ID karta (Framer motion spring drag)
    │   │   ├── PitchFloor.jsx      # 3D perspektivali yashil futbol maydoni
    │   │   ├── SkillsSection.jsx   # Polaroid FIFA o'yinchi kartalari va stamina barlar
    │   │   ├── ProjectsSection.jsx # Ochiluvchi papka va o'yin qaydnomalari (Match Cards)
    │   │   ├── AboutSection.jsx    # Retro Amiga kompyuteri va 4-3-3 taktika doskasi
    │   │   ├── ContactSection.jsx  # Stadion elektron tablosi va aloqa formasi
    │   │   ├── RansomTitle.jsx     # Gazeta qirqmasi sarlavhalar komponenti
    │   │   ├── FloatingStickers.jsx# Suzib yuruvchi to'p, kartochka va stikerlar
    │   │   └── Footer.jsx          # Stadion yakuni va tepaga qaytish
    │   ├── data/
    │   │   └── fallbackData.js     # Server uxlaganda ham ishlaydigan zaxira ma'lumotlar
    │   ├── utils/
    │   │   └── audio.js            # Web Audio API (Hushtak, to'p zarbasi, gol olqishi)
    │   ├── api.js                  # Backend bilan fetch integratsiyasi
    │   ├── App.jsx                 # Asosiy sahifa yig'uvchisi
    │   ├── index.css               # Katak daftar, 3D pol va retro stillar
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## ⚡ 2. Tezkor Ishga Tushirish (Lokalda)

### A) Backendni ishga tushirish (Django):
```bash
# 1. Backend papkasiga o'ting
cd backend

# 2. Virtual muhit yaratish va faollashtirish
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 3. Kerakli paketlarni o'rnatish
pip install -r requirements.txt

# 4. Bazani tayyorlash (Migratsiya)
python manage.py makemigrations
python manage.py migrate

# 5. Admin profilini yaratish (Admin panelga kirish uchun)
python manage.py createsuperuser

# 6. Serverni yurgizish
python manage.py runserver
```
Backend `http://127.0.0.1:8000/` manzilida ishga tushadi.  
Admin panel: `http://127.0.0.1:8000/admin/`

---

### B) Frontendni ishga tushirish (React):
Yangi terminal oynasida:
```bash
# 1. Frontend papkasiga o'ting
cd frontend

# 2. Kutubxonalarni o'rnatish
npm install

# 3. Serverni yurgizish
npm run dev
```
Sayt `http://localhost:5173/` manzilida ochiladi!

---

## 🧪 3. Backend API Tekshirish Misollari (cURL)

Backend ishlayotganini terminal orqali tekshirish uchun ushbu buyruqlarni yuboring:

### 1. O'yinchi Profilini Olish:
```bash
curl -X GET http://127.0.0.1:8000/api/profile/
```

### 2. Loyihalar va GitHub repolarni olish:
```bash
curl -X GET http://127.0.0.1:8000/api/projects/
```

### 3. Yangi Xabar (Aloqa) Yuborish:
```bash
curl -X POST http://127.0.0.1:8000/api/contact/ \
     -H "Content-Type: application/json" \
     -d "{\"name\": \"Sardor\", \"email\": \"sardor@example.com\", \"message\": \"Loyiha ajoyib chiqibdi! Jamoaga taklif qilamiz.\"}"
```

### 4. Stadion Statistikasini Ko'rish:
```bash
curl -X GET http://127.0.0.1:8000/api/stats/
```

---

## 🚀 4. Yangi Loyihani GitHub orqali Avtomatik Chiqarish

Siz sayt kodingizni o'zgartirmasdan, yangi loyihangizni portfolioda ko'rsatishingiz mumkin:

1. Yangi loyihangizni **GitHub** akkauntingizga yuklaysiz (`push`).
2. GitHub repo sahifasiga kiring. O'ng tomondagi **About** bo'limida tishli g'ildirakcha (⚙️) belgisini bosing.
3. **Website** maydoniga deploy qilingan jonli havolangizni (masalan, `https://my-project.vercel.app`) yozib saqlang.
4. **Bo'ldi!** Backenddagi GitHub Proxy har 30 daqiqada yangilanadi va ushbu repongizni avtomatik topib, jonli skrinshoti (`image.thum.io`) va GitHub tugmalari bilan portfoliongizga qo'shadi!

---

## 🌐 5. Deploy Qadamlari (Production)

### 1. Neon Database (Bepul PostgreSQL):
1. [neon.tech](https://neon.tech) saytida ro'yxatdan o'ting va yangi proyekt yarating.
2. `Connection string` manzilini oling:
   `postgresql://user:password@ep-sample...neon.tech/neondb?sslmode=require`

### 2. Render.com (Backend Deploy):
1. [render.com](https://render.com) ga kiring va **New Web Service** yarating.
2. GitHub'dagi repongizni tanlang.
3. Sozlamalar:
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command:** `gunicorn config.wsgi:application`
4. **Environment Variables** bo'limiga quyidagilarni kiriting:
   - `SECRET_KEY` = sizning kuchli kalitingiz
   - `DEBUG` = `False`
   - `ALLOWED_HOSTS` = `.onrender.com`
   - `DATABASE_URL` = Neon'dagi PostgreSQL manzili
   - `GITHUB_USERNAME` = sizning github nomingiz
   - `GITHUB_TOKEN` = github shaxsiy tokeni
   - `TELEGRAM_BOT_TOKEN` = telegram bot tokeni
   - `TELEGRAM_CHAT_ID` = chat id
   - `FRONTEND_URL` = sizning Vercel domeningiz

### 3. Vercel (Frontend Deploy):
1. [vercel.com](https://vercel.com) ga kiring va loyihani import qiling.
2. **Root Directory:** `frontend` deb tanlang.
3. **Environment Variables** ga qo'shing:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
4. **Deploy** tugmasini bosing!

