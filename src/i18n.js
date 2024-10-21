// src/i18n.js
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

const messages = {
  en,
  ar,
}

const i18n = createI18n({
  legacy: false, // استخدم Composition API
  locale: 'ar', // اللغة الافتراضية
  fallbackLocale: 'en',
  messages,
})

export default i18n
