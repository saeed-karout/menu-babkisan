<template>
  <div class="w-full h-[100vh] flex justify-center items-center">
    <div class="bg-[url('../assets/images/heroSection.jpg')] h-full w-full bg-cover bg-center flex justify-center items-center">
      <div class="flex flex-col justify-center items-center text-white space-y-4 px-4 sm:px-8 text-center max-w-screen-lg">

        <!-- Logo Section -->
        <div>
          <img src="../../assets/images/babkisan.png" class="w-28 sm:w-36 mb-6 sm:mb-8 h-auto" alt="Bab Kisan Logo">
        </div>

        <!-- Title Section -->
        <div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-light">{{ t('hero.welcome') }}</h2>
          <p class="text-sm sm:text-md lg:text-lg">{{ t('hero.subtitle') }}</p>
          <p class="text-sm sm:text-md lg:text-lg mt-4 max-w-full lg:max-w-[50vw] mx-auto">
            {{ t('hero.description') }}
          </p>
          <p class="text-md lg:text-lg mt-2">{{ t('hero.reservePrompt') }}</p>
        </div>

        <!-- Button Section -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-6">


          <a
              :href="whatsappReserveLink"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-green-900 border border-white py-2 px-6 rounded-full hover:bg-white hover:text-green-900 transition duration-300 text-white uppercase font-light"
            >
              {{ t('hero.buttons.reserve') }}
            </a>
            <!-- زر اقرأ المزيد -->
            <router-link
              to="/menu"
              class="bg-transparent text-white border border-white py-2 px-6 rounded-full hover:bg-gray-200 hover:text-green-900 transition duration-300 uppercase font-light"
            >
              {{ t('hero.buttons.learnMore') }}
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const appStore = useAppStore();
const currentLanguage = computed(() => appStore.language);
const { t } = useI18n({ useScope: 'global' });
// روابط واتساب مع رسائل مترجمة
const whatsappReserveLink = computed(() => {
  const message = currentLanguage.value === 'ar' ? 'أود حجز طاولة' : 'I would like to reserve a table';
  return `https://wa.me/966555774920?text=${encodeURIComponent(message)}`;
});
</script>
