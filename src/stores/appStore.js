// src/stores/appStore.js
import { defineStore } from 'pinia';
import i18n from '../i18n'; // تأكد من صحة المسار

export const useAppStore = defineStore('app', {
  state: () => ({
    language: localStorage.getItem('language') || 'en',
  }),
  actions: {
    setLanguage(lang) {
      this.language = lang;
      localStorage.setItem('language', lang);
      i18n.global.locale.value = lang; // تحديث لغة i18n هنا
      console.log(`Language set to: ${lang}`); // Debugging
    },
    initializeLanguage() {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        this.language = savedLanguage;
        console.log(`Initialized language from localStorage: ${savedLanguage}`); // Debugging
      } else {
        this.language = 'en';
        console.log(`Initialized language to default: en`); // Debugging
      }
      i18n.global.locale.value = this.language; // تعيين لغة i18n هنا أيضًا
    },
  },
});
