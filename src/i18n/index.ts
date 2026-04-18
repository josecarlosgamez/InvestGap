import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es';
import en from './en';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('fondoscope-lang') : null;

i18n.use(initReactI18next).init({
  resources: { es, en },
  lng: savedLang || 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;