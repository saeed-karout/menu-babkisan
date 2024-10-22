// src/i18n.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';

const messages = {
  en,
  ar,
};

const i18n = createI18n({
  legacy: false, // استخدام Composition API
  globalInjection: true, // تمكين الحقن العالمي
  locale: 'en', // سيتم ضبطها لاحقًا في main.js بناءً على الـ Store
  fallbackLocale: 'en',
  messages,
});

export default i18n;
