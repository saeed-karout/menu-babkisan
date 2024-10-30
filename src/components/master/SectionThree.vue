<template>
  <div :dir="currentLanguage === 'ar' ? 'rtl' : 'ltr'" class="slider-container lg:p-20 md:p-12 sm:p-5 p-5">
    <div class="container mx-auto px-4">
      <!-- قسم العنوان -->
      <div class="mb-8 text-center md:text-left">
        <p class="text-xs sm:text-sm tracking-widest uppercase">
          {{ t('sectionThree.subtitle') }}
        </p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-thin mb-4">
          {{ t('sectionThree.heading.part1') }} <span class="text-Gold">{{ t('sectionThree.heading.part2') }}</span> {{ t('sectionThree.heading.part3') }}
          <br class="hidden md:block" />
          {{ t('sectionThree.heading.part4') }} <span class="text-Gold">{{ t('sectionThree.heading.part5') }}</span>
          <span class="text-green-600"> {{ t('sectionThree.heading.part6') }}</span>
        </h2>
        <div
          class="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-8"
        >
          <p class="max-w-3xl text-sm md:text-base leading-relaxed">
            {{ t('sectionThree.description') }}
          </p>
          <RouterLink to="/menu">

            <button
              class="text-md bg-transparent border border-white text-white py-2 px-6 rounded-full h-12 flex items-center justify-center hover:bg-Gold transition duration-300"
            >
              {{ t('sectionThree.buttonText') }}
            </button>
          </RouterLink>
        </div>
      </div>

      <!-- قسم السلايدر -->
      <div class="relative">
        <div
          class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4"
          ref="slider"
        >
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="flex-none w-full md:w-1/2 lg:w-1/3 snap-center"
          >
            <div
              class="item-content bg-[#704f27] p-4 rounded-2xl shadow-lg text-white flex flex-col h-full"
            >
              <div class="aspect-w-16 aspect-h-9">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="object-cover rounded-2xl w-full h-full"
                />
              </div>
              <h3 class="font-bold text-xl mt-4 mx-2">{{ item.title }}</h3>
              <p class="text-md mx-2 mt-2 flex-grow">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <!-- أزرار التنقل -->
        <button
          class="slider-button prev-button hidden md:flex"
          @click="scrollSlider(-1)"
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button
          class="slider-button next-button hidden md:flex"
          @click="scrollSlider(1)"
          aria-label="Next Slide"
        >
          &#10095;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import img1 from '@/assets/images/itemSectionTwo.png';
import { useAppStore } from '@/stores/appStore';

const { t } = useI18n({ useScope: 'global' });

// استدعاء الـ store للحصول على اللغة الحالية
const appStore = useAppStore();
const currentLanguage = computed(() => appStore.language);

// تعريف الـ ref للـ slider بشكل صحيح
const slider = ref(null);

// تعريف menuItems كمجموعة محوسبة تعتمد على اللغة الحالية
const menuItems = computed(() => [
  {
    title: t('sectionThree.menuItems.item1.title'),
    image: img1,
    description: t('sectionThree.menuItems.item1.description'),
  },
  {
    title: t('sectionThree.menuItems.item2.title'),
    image: img1,
    description: t('sectionThree.menuItems.item2.description'),
  },
  {
    title: t('sectionThree.menuItems.item3.title'),
    image: img1,
    description: t('sectionThree.menuItems.item3.description'),
  },
  {
    title: t('sectionThree.menuItems.item4.title'),
    image: img1,
    description: t('sectionThree.menuItems.item4.description'),
  },
]);

// دالة تمرير السلايدر
function scrollSlider(direction) {
  if (slider.value) {
    const scrollAmount = slider.value.clientWidth * 0.9;
    slider.value.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  }
}
</script>

<style scoped>
.slider-container {
  background: url('../../assets/images/bgSectionThree.jpg') no-repeat center center;
  background-size: cover;
  color: white;
}

.container {
  max-width: 1280px;
}

.item-content {
  background-color: #704f27;
  height: 100%;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #ffd700;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.slider-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.prev-button {
  left: 0.5rem;
}

.next-button {
  right: 0.5rem;
}

@media (max-width: 767px) {
  .slider-button {
    display: none;
  }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* إضافة نسبة العرض إلى الارتفاع باستخدام Tailwind CSS */
.aspect-w-16 {
  aspect-ratio: 16 / 9;
}

.aspect-h-9 {
  aspect-ratio: 16 / 9;
}
</style>
