// src/main.js
import './assets/main.css';

import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// استيراد أيقونات من حزم Font Awesome
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import i18n from './i18n'; // تأكد من أن i18n.js موجود في src/
import { useAppStore } from './stores/appStore'; // استخدم store الخاص بك

import axiosInstance from '@/plugins/axios'; // استيراد axiosInstance

const app = createApp(App);

// إضافة الأيقونات إلى المكتبة
library.add(fas, far, fab);

// دمج Pinia و router و i18n مع التطبيق
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(i18n);

// تسجيل FontAwesomeIcon كـ global component
app.component('font-awesome-icon', FontAwesomeIcon);

// تركيب التطبيق
app.mount('#app');

// الوصول إلى الـ store بعد تركيب التطبيق
const appStore = useAppStore();

// تهيئة اللغة من الـ store قبل مراقبة تغييرات اللغة
appStore.initializeLanguage();

// ضبط لغة vue-i18n واتجاه الصفحة بناءً على اللغة في الـ store
watch(
  () => appStore.language,
  (newLanguage) => {
    i18n.global.locale.value = newLanguage;
    document.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    console.log(`i18n and document.dir set to: ${newLanguage}`); // Debugging
  },
  { immediate: true }
);

// إعداد axiosInstance لتضمين Accept-Language
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Setting Accept-Language to:', appStore.language); // Debugging
    config.headers['Accept-Language'] = appStore.language;
    config.headers['Cache-Control'] = 'no-cache';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
