# 🖼️ Rasmlar va Media Fayllar Yo'riqnomasi

Ushbu papka (`frontend/public/images/`) loyihangizning barcha rasmlarini saqlash uchun mo'ljallangan.

---

### 1. `avatar.jpg` (O'yinchi fotosurati)
- **Joylashuvi:** `frontend/public/images/avatar.jpg`
- **Qayerda ishlatiladi:** Tepadan osilgan ID karta (Hero qismida) va polaroid fotosuratda.
- **Tavsiya etilgan o'lcham:** `400x400` yoki `500x500` piksel (kvadrat formatda).
- **Format:** JPG, PNG yoki WebP.
- **Qanday o'zgartiriladi:** 
  - Django admin paneliga kirib (`/admin/`), **Profil** bo'limidan o'z rasmingizni yuklashingiz mumkin.
  - Yoki ushbu papkaga `avatar.jpg` nomli rasmingizni qo'ysangiz, sayt avtomatik ko'rsatadi.

---

### 2. `projects/` (O'yinlar / Loyihalar skrinshotlari)
- **Joylashuvi:** `frontend/public/images/projects/`
- **Qayerda ishlatiladi:** O'yinlar (Match cards) papkasidagi kartalarda hover qilinganda.
- **Eslatma:** Agar siz rasm yuklamasangiz, loyiha avtomatik tarzda `https://image.thum.io/get/{live_url}` orqali loyihangizning jonli saytidan skrinshot olib ko'rsatadi! Maxsus rasm qo'ymoqchi bo'lsangiz, Django admindan yuklashingiz yoki `public/images/projects/` papkasiga solishingiz mumkin.

---

### 3. `cv.pdf` (Rezyume fayli)
- **Joylashuvi:** `frontend/public/cv.pdf`
- **Qayerda ishlatiladi:** Retro kompyuter (About) bo'limidagi **"Rasmiy Shartnoma (CV PDF)"** tugmasi bosilganda yuklab olinadi.

