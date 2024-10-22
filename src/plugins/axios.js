// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.api.babkisanresturant.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
