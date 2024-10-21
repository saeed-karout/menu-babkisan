// src/stores/appStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('appStore', () => {
  const language = ref('en') // اللغة الافتراضية

  const setLanguage = (lang) => {
    language.value = lang
    localStorage.setItem('appLanguage', lang)
  }

  const initializeLanguage = () => {
    const storedLanguage = localStorage.getItem('appLanguage')
    if (storedLanguage) {
      language.value = storedLanguage
    }
  }

  return { language, setLanguage, initializeLanguage }
})
