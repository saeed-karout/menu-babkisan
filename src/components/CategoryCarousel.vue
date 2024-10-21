<!-- CategorySlider.vue -->
<template>
  <div class="relative w-full overflow-hidden">
    <!-- Placeholder لتثبيت المساحة عند تثبيت السلايدر -->
    <div v-if="isFixed" :style="{ height: sliderHeight + 'px' }"></div>

    <!-- Slider Container -->
    <div ref="sliderRef"
      :class="[ 'flex transition-transform duration-300 ease-in-out z-30', isFixed ? 'fixed top-0 left-0 right-0 backdrop-blur-md w-[100vw] bg-opacity-80' : '' ]"
      :style="{ transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">

      <!-- عناصر الفئات -->
      <div v-for="category in categories" :key="category.id"
        class="flex-none p-2 text-center cursor-pointer hover:scale-105 transition-transform"
        :style="{ width: `${100 / itemsPerView}%` }" @click="fetchItems(category)">
        <img :src="category.thumbnail" :alt="category.name"
          class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-300 mx-auto object-cover"
          loading="lazy" />
        <span class="mt-2 text-sm text-brownColor font-medium block">
          {{ category.name }}
        </span>
      </div>
    </div>

    <!-- قسم عرض العناصر -->
    <div :class="['rounded-lg', isFixed ? 'mt-24' : 'mt-4']">
      <h2 class="text-xl text-brownColor font-semibold mb-6 pt-8 pl-4">{{ selectedCategoryName }}</h2>

      <div class="space-y-6">
        <router-link v-for="item in selectedCategoryItems" :key="item.id"
          :to="{ name: 'FoodItem', params: { slug: item.slug } }" class="block">
          <div class="flex items-start p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">{{ item.name }}</h3>
              <div class="flex items-center space-x-4 mb-2">
                <span class="bg-textBrown text-white text-xs font-semibold px-2 py-1 rounded">
                  SAR {{ item.price }}
                </span>
                <span class="text-textBrown font-semibold">{{ item.calories }} kcal</span>
              </div>
              <p class="text-brownColor font-normal">
                {{ item.description.substring(0, 50) }}{{ item.description.length > 60 ? '...' : '' }}
              </p>
            </div>
            <img :src="item.thumbnail" :alt="item.name"
              class="w-14 h-14 md:w-20 md:h-20 rounded-md mx-auto object-cover" loading="lazy" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axiosInstance from '@/axiosInstance'; // استيراد axiosInstance
import { useAppStore } from '@/stores/appStore'; // استيراد Pinia store

export default {
  name: 'CategorySlider',
  setup() {
    const appStore = useAppStore(); // استخدام الـ store من Pinia

    const categories = ref([]);
    const selectedCategoryItems = ref([]);
    const selectedCategoryName = ref('');
    const currentIndex = ref(0);
    const itemsPerView = ref(6);
    const sliderRef = ref(null);
    const startX = ref(0);
    const isDragging = ref(false);
    const autoplay = ref(null);
    const isFixed = ref(false);
    const initialSliderTop = ref(0);
    const sliderHeight = ref(0);
    const transitionDuration = 300;
    const autoplayInterval = 3000;
    const swipeThreshold = 50;

    // جلب الفئات من الـ API
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('https://www.api.babkisanresturant.com/api/categories/items');
        if (response.status === 200) {
          categories.value = response.data.data;
          if (categories.value.length > 0) {
            fetchItems(categories.value[0]);
          }
          startAutoplay();
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchItems = (category) => {
      selectedCategoryItems.value = category.items;
      selectedCategoryName.value = category.name;
      currentIndex.value = 0;
    };

    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 400) {
        itemsPerView.value = 5;
      } else if (width < 768) {
        itemsPerView.value = 5;
      } else if (width < 1024) {
        itemsPerView.value = 6;
      } else {
        itemsPerView.value = 8;
      }
    };

    const handlePrev = () => {
      currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : Math.max(categories.value.length - itemsPerView.value, 0);
    };

    const handleNext = () => {
      currentIndex.value = currentIndex.value < categories.value.length - itemsPerView.value ? currentIndex.value + 1 : 0;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (categories.value.length > itemsPerView.value) {
        autoplay.value = setInterval(handleNext, autoplayInterval);
      }
    };

    const stopAutoplay = () => {
      if (autoplay.value) {
        clearInterval(autoplay.value);
        autoplay.value = null;
      }
    };

    const handleTouchStart = (e) => {
      stopAutoplay();
      isDragging.value = true;
      startX.value = e.touches[0].clientX;
      if (sliderRef.value) {
        sliderRef.value.style.transition = 'none';
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging.value || !sliderRef.value) return;
      const deltaX = e.touches[0].clientX - startX.value;
      const sliderWidth = sliderRef.value.offsetWidth;
      const translatePercentage = (deltaX / sliderWidth) * 100;
      sliderRef.value.style.transform = `translateX(${-(currentIndex.value * (100 / itemsPerView.value)) + translatePercentage}%)`;
    };

    const handleTouchEnd = (e) => {
      if (!isDragging.value) return;
      isDragging.value = false;
      const deltaX = e.changedTouches[0].clientX - startX.value;
      if (deltaX > swipeThreshold) {
        handlePrev();
      } else if (deltaX < -swipeThreshold) {
        handleNext();
      }
      resetSliderPosition();
      startAutoplay();
    };

    const resetSliderPosition = () => {
      if (sliderRef.value) {
        sliderRef.value.style.transition = `transform ${transitionDuration}ms ease-in-out`;
        sliderRef.value.style.transform = `translateX(-${(currentIndex.value * 100) / itemsPerView.value}%)`;
      }
    };

    watch([currentIndex, itemsPerView], resetSliderPosition);

    const handleScroll = () => {
      if (!sliderRef.value) return;
      isFixed.value = window.scrollY >= initialSliderTop.value;
    };

    const updateLayout = () => {
      updateItemsPerView();
      if (sliderRef.value) {
        initialSliderTop.value = sliderRef.value.getBoundingClientRect().top + window.scrollY;
        sliderHeight.value = sliderRef.value.offsetHeight;
      }
    };

    onMounted(() => {
      fetchCategories();
      updateLayout();
      window.addEventListener('resize', updateLayout);
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('scroll', handleScroll);
      stopAutoplay();
    });

    // مراقبة تغيير اللغة وإعادة جلب الفئات
    watch(
      () => appStore.language,
      () => {
        fetchCategories();
      }
    );

    return {
      categories,
      selectedCategoryItems,
      selectedCategoryName,
      currentIndex,
      itemsPerView,
      sliderRef,
      handlePrev,
      handleNext,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      fetchItems,
      isFixed,
      sliderHeight,
    };
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #8b5e34;
}
</style>
