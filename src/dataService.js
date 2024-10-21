import axiosInstance from '@/axiosInstance';

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('https://www.api.babkisanresturant.com/api');
    // التعامل مع البيانات المستلمة
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
