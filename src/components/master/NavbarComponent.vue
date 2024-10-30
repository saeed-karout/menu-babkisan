<template>
  <nav :dir="currentLanguage === 'ar' ? 'ltr' : 'ltr'" class="bg-green-900 text-white fixed h-16 px-4 md:px-16 w-full z-50 flex items-center justify-between">

    <!-- Mobile Layout -->
    <div class="flex items-center justify-between w-full md:hidden">
      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" aria-label="Toggle Menu" class="flex-none">
        <!-- أيقونة القائمة -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- صورة وسطية -->
      <img src="@/assets/images/middle.png" alt="Mobile Image" class="w-1/2 flex-none" />

      <!-- الشعار -->
      <router-link to="/">
        <img src="@/assets/logoNav.png" alt="Logo" class="w-10 flex-none" />
      </router-link>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden md:flex items-center justify-between w-full">

      <!-- قسم الروابط -->
      <div class="flex items-center space-x-12">
        <a href="#section-two" @click.prevent="scrollToSection('#section-two')" class="hover:text-gray-300 uppercase">{{ t('who_are_we') }}</a>
        <a href="#section-reviews" @click.prevent="scrollToSection('#section-reviews')" class="hover:text-gray-300">{{ t('reviews') }}</a>
        <a href="#section-three" @click.prevent="scrollToSection('#section-three')" class="hover:text-gray-300">{{ t('offers') }}</a>
        <router-link to="/menu" class="hover:text-gray-300 uppercase pr-28">{{ t('menus') }}</router-link>
      </div>

      <!-- الشعار في الوسط -->
      <div class="flex items-center">
        <img src="@/assets/logoNav.png" alt="Logo" class="w-10" />
      </div>

      <!-- الأزرار وبيانات الاتصال -->
      <div class="flex items-center space-x-6">
        <!-- رقم الهاتف -->
        <div class="flex items-center mx-2 space-x-2 lg:block">
          <font-awesome-icon :icon="['fas', 'phone']" />
          <span>{{ t('phone') }}</span>
        </div>
        <!-- زر Reserve -->
        <a
          :href="whatsappReserveLink"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-transparent border border-white text-center py-2 px-4 rounded-full hover:bg-white hover:text-green-900 transition duration-300"
        >
          {{ t('reserve') }}
        </a>
        <!-- زر Order Now -->
        <a
          :href="whatsappOrderLink"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white text-green-900 text-center py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300"
        >
          {{ t('order_now') }}
        </a>
        <!-- زر تغيير اللغة -->
        <button @click="toggleLanguage" class="flex items-center bg-transparent border border-white py-1 px-3 rounded-full hover:bg-white hover:text-green-900 transition duration-300" aria-label="Toggle Language">
      <font-awesome-icon :icon="['fas', 'globe']" class="mr-2" />
      <span class="text-sm">{{ currentLanguage === 'en' ? 'En' : 'ع' }}</span>
    </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-16 left-0 right-0 rounded-b-lg bg-green-900 text-white py-4 px-6 space-y-4 flex flex-col  md:hidden z-10"
        :dir="currentLanguage === 'ar' ? 'rtl' : 'ltr'"
      >

      <div class="flex flex-col items-center gap-5">

        <a href="#section-two" @click.prevent="handleMobileMenuClick($event, '#section-two')" class="hover:text-gray-300 uppercase">{{ t('who_are_we') }}</a>
        <a href="#section-reviews" @click.prevent="handleMobileMenuClick($event, '#section-reviews')" class="hover:text-gray-300">{{ t('reviews') }}</a>
        <a href="#section-three" @click.prevent="handleMobileMenuClick($event, '#section-three')" class="hover:text-gray-300">{{ t('offers') }}</a>
        <router-link to="/menu" class="hover:text-gray-300 uppercase">{{ t('menus') }}</router-link>
        <div class="flex items-center space-x-2">
          <font-awesome-icon :icon="['fas', 'phone']" />
          <span>{{ t('phone') }}</span>
        </div>
      </div>


        <!-- زر Reserve -->
        <a
          :href="whatsappReserveLink"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-transparent border border-white text-center py-2 px-4 rounded-full hover:bg-white hover:text-green-900 transition duration-300"
        >
          {{ t('reserve') }}
        </a>
        <!-- زر Order Now -->
        <a
          :href="whatsappOrderLink"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white text-green-900 text-center py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300"
        >
          {{ t('order_now') }}
        </a>
        <!-- زر تغيير اللغة -->
        <button @click="toggleLanguage" class="self-center flex items-center bg-transparent border border-white py-1 px-3 rounded-full hover:bg-white hover:text-green-900 transition duration-300" aria-label="Toggle Language">
          <font-awesome-icon :icon="['fas', 'globe']" class="mr-2" />
          <span class="text-sm">{{ currentLanguage === 'en' ? 'En' : 'ع' }}</span>


        </button>
      </div>
    </transition>
  </nav>
</template>


<script setup>
import { useAppStore } from '@/stores/appStore';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

// استدعاء i18n واستخدام نطاق الترجمة العالمي
const { t, locale } = useI18n({ useScope: 'global' });

// استدعاء الـ store
const appStore = useAppStore();

// حالة فتح القائمة للموبايل
const isMobileMenuOpen = ref(false);

// وظيفة فتح/إغلاق القائمة للموبايل
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

// وظيفة التمرير إلى قسم معين
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// وظيفة التعامل مع نقرات القائمة للموبايل
function handleMobileMenuClick(event, sectionId) {
  event.preventDefault();
  isMobileMenuOpen.value = false; // أغلق قائمة الموبايل
  scrollToSection(sectionId);
}

// اللغة الحالية بناءً على الـ store
const currentLanguage = computed(() => appStore.language);

// وظيفة تغيير اللغة
function toggleLanguage() {
  const newLanguage = currentLanguage.value === 'en' ? 'ar' : 'en';
  console.log(`Changing language to: ${newLanguage}`);
  appStore.setLanguage(newLanguage);
}

// تحديث اللغة في i18n واتجاه الصفحة عند تغييرها في الـ store
watch(
  () => appStore.language,
  (newLanguage) => {
    locale.value = newLanguage;
    document.dir = newLanguage === 'ar' ? 'ltr' : 'ltr'; // تصحيح الاتجاه
    console.log(`i18n and document.dir set to: ${newLanguage}`); // Debugging
  },
  { immediate: true }
);

// روابط واتساب مع رسائل مترجمة
const whatsappReserveLink = computed(() => {
  const message = currentLanguage.value === 'ar' ? 'أود حجز طاولة' : 'I would like to reserve a table';
  return `https://wa.me/966555774920?text=${encodeURIComponent(message)}`;
});

const whatsappOrderLink = computed(() => {
  const message = currentLanguage.value === 'ar' ? 'أود تقديم طلب' : 'I would like to place an order';
  return `https://wa.me/966555774920?text=${encodeURIComponent(message)}`;
});
</script>


<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* إذا كنت تستخدم Tailwind CSS RTL Plugin، يمكنك استخدام فئات RTL مباشرة */
</style>
