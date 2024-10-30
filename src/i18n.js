// src/i18n.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';

const messages = {
  en,
  ar,
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ar', // تغيير اللغة الافتراضية إلى العربية
  fallbackLocale: 'ar', // تعيين اللغة الاحتياطية إلى العربية
  messages,
});

export default i18n;
