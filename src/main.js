// src/main.js
import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// استيراد أيقونات من حزم Font Awesome
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import i18n from './i18n' // تأكد من أن i18n.js موجود في src/

import { useAppStore } from './stores/appStore' // استخدم store الخاص بك


import axiosInstance from './axiosInstance' // استيراد axiosInstance

const app = createApp(App)

// إضافة الأيقونات إلى المكتبة
library.add(fas, far, fab)

// دمج Pinia و router و i18n مع التطبيق
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(i18n)

// تسجيل FontAwesomeIcon كـ global component
app.component('font-awesome-icon', FontAwesomeIcon)

// تهيئة اللغة من الـ store
const appStore = useAppStore()
appStore.initializeLanguage()

// إعداد interceptor لتضمين ترويسة Accept-Language
axiosInstance.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = appStore.language
  return config
}, (error) => {
  return Promise.reject(error)
})

// ضبط لغة vue-i18n بناءً على اللغة في الـ store
i18n.global.locale.value = appStore.language

// ضبط اتجاه النص بناءً على اللغة
const updateDirection = (lang) => {
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
}

// ضبط الاتجاه عند بدء التطبيق
updateDirection(appStore.language)

// مراقبة تغييرات اللغة لتحديث vue-i18n والاتجاه
watch(
  () => appStore.language,
  (newLang) => {
    i18n.global.locale.value = newLang
    updateDirection(newLang)
  }
)



// تركيب التطبيق
app.mount('#app')
