/**
 * Backend bilan muloqot qiluvchi API moduli.
 * Render cold-start yoki backend ishlamay qolgan paytda ham
 * sayt uzluksiz ishlashi uchun avtomatik tarzda zaxira (fallback) ma'lumotlariga o'tadi.
 */

import {
  fallbackProfile,
  fallbackProjects,
  fallbackExperience,
  fallbackStats
} from './data/fallbackData';

// API manzili (.env fayldan yoki Renderdagi jonli backend)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://football-portfolio-backend.onrender.com/api';

/**
 * 1. O'yinchi profili ma'lumotlarini olish (/api/profile/)
 */
export async function fetchProfile() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 soniya timeout (Render cold-start uchun)

    const response = await fetch(`${API_BASE_URL}/profile/`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP xatosi: ${response.status}`);
    const data = await response.json();
    return { data, isFallback: false };
  } catch (error) {
    console.warn("Backend profili yuklanmadi, zaxira (fallback) ma'lumotlar ishlatilmoqda:", error.message);
    return { data: fallbackProfile, isFallback: true };
  }
}

/**
 * 2. O'yinlar va loyihalar ro'yxatini olish (/api/projects/)
 */
export async function fetchProjects() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_BASE_URL}/projects/`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP xatosi: ${response.status}`);
    const data = await response.json();
    return { data, isFallback: false };
  } catch (error) {
    console.warn("Backend loyihalari yuklanmadi, zaxira (fallback) ishlatilmoqda:", error.message);
    return { data: fallbackProjects, isFallback: true };
  }
}

/**
 * 3. Mavsumlar (Tajriba va Ta'lim) ro'yxatini olish (/api/experience/)
 */
export async function fetchExperience() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_BASE_URL}/experience/`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP xatosi: ${response.status}`);
    const data = await response.json();
    return { data, isFallback: false };
  } catch (error) {
    console.warn("Backend tajribasi yuklanmadi, zaxira (fallback) ishlatilmoqda:", error.message);
    return { data: fallbackExperience, isFallback: true };
  }
}

/**
 * 4. Stadion statistikasi (/api/stats/)
 */
export async function fetchStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/`);
    if (!response.ok) throw new Error(`HTTP xatosi: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return fallbackStats;
  }
}

/**
 * 5. Aloqa xabari yuborish (/api/contact/)
 */
export async function sendContactMessage(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMsg = result.error || result.detail || (result.honeypot && "Spam xatosi") || "Xatolik yuz berdi.";
      throw new Error(errorMsg);
    }

    return result;
  } catch (error) {
    // Agar backend umuman ishlamayotgan bo'lsa ham foydalanuvchiga simulyatsiya
    console.warn("Aloqa formasi xatosi:", error);
    throw error;
  }
}

/**
 * 6. Sahifa tashrifini qayd etish (/api/visit/)
 */
export async function recordVisit(path = window.location.pathname) {
  try {
    await fetch(`${API_BASE_URL}/visit/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
      keepalive: true, // Sahifa yopilayotgan paytda ham so'rovni tugatishga ruxsat
    });
  } catch (err) {
    // Fon rejimida xato e'tiborsiz qoldiriladi
  }
}

