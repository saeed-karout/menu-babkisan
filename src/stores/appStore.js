// appStore.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    language: 'en', // اللغة الافتراضية
  }),
  actions: {
    setLanguage(lang) {
      this.language = lang;
      localStorage.setItem('appLanguage', lang);
    },
    initializeLanguage() {
      const storedLanguage = localStorage.getItem('appLanguage');
      if (storedLanguage) {
        this.language = storedLanguage;
      }
    },
  },
});
