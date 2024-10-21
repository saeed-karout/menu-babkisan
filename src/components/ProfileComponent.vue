<!-- ProfileCard.vue -->
<template>
  <div class="w-full h-[430px] mx-auto rounded-lg">
    <!-- صورة الغلاف -->
    <div class="relative">
      <img :src="imgBg" alt="Restaurant Cover" class="w-full h-[36vh] object-cover rounded-t-lg" />
    </div>

    <!-- زر تغيير اللغة -->
    <div class="text-right relative">
      <button
        @click="toggleLanguage"
        class="text-gray-700 hover:text-gray-900 text-lg dark:text-gray-300"
        aria-label="Toggle Language"
      >
        {{ currentLanguage === 'en' ? 'AR' : 'EN' }}
      </button>
    </div>

    <!-- صورة الملف الشخصي والاسم وروابط التواصل الاجتماعي -->
    <div class="text-center mt-4 relative -top-[70px]">
      <img :src="imgProfile" alt="Albab Alsharqy Logo"
        class="w-28 h-28 mx-auto rounded-full  border-white shadow-md" />
      <h1 class="text-2xl font-bold">Bab Kisan</h1>
      <div class="flex justify-center space-x-4 text-xl">
        <a v-for="(social, index) in socialLinks" :key="index" :href="social.url" target="_blank"
          rel="noopener noreferrer" class="text-brownColor hover:text-gray-700 transition" :aria-label="social.name">
          <font-awesome-icon :icon="[social.platform, social.icon]" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/appStore';
import imgBg from '@/assets/images/bg-profile.jpg';
import imgProfile from '@/assets/images/img-profile.jpg';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ProfileCard',
  setup() {
    const dataStore = useAppStore();
    const { t, locale } = useI18n();

    const currentLanguage = computed(() => dataStore.language);

    const toggleLanguage = () => {
      const newLanguage = currentLanguage.value === 'en' ? 'ar' : 'en';
      dataStore.setLanguage(newLanguage);
      locale.value = newLanguage;
      // تحديث اتجاه الصفحة
      document.documentElement.setAttribute('dir', newLanguage === 'ar' ? 'rtl' : 'ltr');
    };

    onMounted(() => {
      dataStore.initializeLanguage();
      locale.value = dataStore.language;
      // تحديث اتجاه النص عند بدء المكون
      document.documentElement.setAttribute('dir', dataStore.language === 'ar' ? 'rtl' : 'ltr');
    });

    const socialLinks = [
      { platform: 'fab', icon: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/+966503954909' },
      {
        platform: 'fab',
        icon: 'instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/bab_kisan_resturant',
      },
      {
        platform: 'fab',
        icon: 'facebook',
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61566950593213&mibextid=ZbWKwL',
      },
      {
        platform: 'fab',
        icon: 'tiktok',
        name: 'TikTok',
        url: 'https://www.tiktok.com/@bab.kisam?_t=8qhIR2eqDUf&_r=1',
      },
      { platform: 'fab', icon: 'snapchat', name: 'Snapchat', url: 'https://snapchat.com/t/4U95CAW3' },
    ];

    return {
      currentLanguage,
      toggleLanguage,
      socialLinks,
      imgBg,
      imgProfile,
    };
  },
});
</script>

<style scoped>

/* تحسينات إضافية */
button {
  cursor: pointer;
}
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #8b5e34;
}
</style>
