// axiosInstance.js
import axios from 'axios';
import { useAppStore } from '@/stores/appStore';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const appStore = useAppStore();
  config.headers['Accept-Language'] = appStore.language;
  return config;
});

export default axiosInstance;
