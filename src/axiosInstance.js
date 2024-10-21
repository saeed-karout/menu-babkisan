// axiosInstance.js
import axios from 'axios';
import { useAppStore } from '@/stores/appStore';

// تأكد من أنك تقوم بإعداد Pinia قبل استيراد axiosInstance
// وذلك لأن `useDataStore` يحتاج إلى Pinia تكون موجودة

const axiosInstance = axios.create({
  baseURL: 'https://www.api.babkisanresturant.com/api/', // تأكد من تعيين الـ baseURL الصحيح
  // يمكنك إضافة إعدادات أخرى هنا إذا لزم الأمر
});

// إضافة interceptor لتضمين ترويسة Accept-Language
axiosInstance.interceptors.request.use((config) => {
  const dataStore = useAppStore();
  config.headers['Accept-Language'] = dataStore.language;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
