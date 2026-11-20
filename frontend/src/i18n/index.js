import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uz from './uz.json';
import en from './en.json';

// Brauzer tiliga qarab sukut tili aniqlanadi, localStorage'da saqlanadi
const savedLang = localStorage.getItem('portfolio_lang');
const browserLang = navigator.language?.startsWith('uz') ? 'uz' : 'en';
const defaultLang = savedLang || browserLang;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      en: { translation: en },
    },
    lng: defaultLang,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

// Til o'zgarganda localStorage'ga saqlash
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('portfolio_lang', lng);
  document.documentElement.lang = lng;
});

export default i18n;
