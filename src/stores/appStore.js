// src/stores/appStore.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    language: localStorage.getItem('language') || 'ar', // تعيين العربية كافتراضية
  }),
  actions: {
    setLanguage(lang) {
      this.language = lang;
      localStorage.setItem('language', lang);
      console.log(`Language set to: ${lang}`); // Debugging
    },
    initializeLanguage() {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        this.language = savedLanguage;
        console.log(`Initialized language from localStorage: ${savedLanguage}`); // Debugging
      } else {
        this.language = 'ar'; // تعيين العربية كافتراضية
        localStorage.setItem('language', 'ar'); // حفظ اللغة الافتراضية في localStorage
        console.log(`Initialized language to default: ar`); // Debugging
      }
    },
  },
});
