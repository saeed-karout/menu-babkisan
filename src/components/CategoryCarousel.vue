<!-- src/components/CategorySlider.vue -->
<template>
  <div class="relative max-w-[600px] mt-12 overflow-hidden">
    <!-- Placeholder لتثبيت المساحة عند تثبيت السلايدر -->
    <div v-if="isFixed" :style="{ height: sliderHeight + 'px' }"></div>

    <!-- Slider Container -->

    <div
      ref="sliderRef"
      :class="[
        'flex transition-transform duration-300 ease-in-out z-30 w-full  ',
        isFixed ? 'fixed top-0   mx-auto ' : '',
      ]"
      :style="{ transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- عناصر الفئات -->
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex-none p-2 text-center cursor-pointer hover:scale-105 transition-transform"
        :style="{ width: `${100 / itemsPerView}%` }"
        @click="fetchItems(category)"
      >
        <img
          :src="category.thumbnail"
          :alt="category.name"
          class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-300 mx-auto object-cover"
          loading="lazy"
        />
        <span class="mt-2 text-sm text-brownColor font-medium block">
          {{ category.name }}
        </span>
      </div>
    </div>



    <!-- قسم عرض العناصر -->
    <div :class="['rounded-lg', isFixed ? 'mt-20' : 'mt-0']">
      <h2 class="text-xl text-brownColor font-semibold mb-6 pt-8 pl-4">{{ selectedCategoryName }}</h2>

      <!-- مؤشرات التحميل والأخطاء -->
      <div v-if="isLoadingItems" class="flex justify-center items-center">
        <span class="text-gray-500">{{ t('loadingItems') }}</span>
      </div>

      <div v-else-if="errorItems" class="text-red-500 text-center">
        {{ errorItems }}
      </div>

      <div v-else class="space-y-6">
        <router-link
          v-for="item in selectedCategoryItems"
          :key="item.id"
          :to="{ name: 'FoodItem', params: { slug: item.slug } }"
          class="block"
        >
          <div class="flex items-start p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">{{ item.name }}</h3>
              <div class="flex items-center space-x-4 mb-2">
                <span class="bg-textBrown text-white text-xs font-semibold px-2 py-1 rounded">
                  {{ t('sar') }} {{ item.price }}
                </span>
                <span class="text-textBrown font-semibold">{{ item.calories }} kcal</span>
              </div>
              <p class="text-brownColor font-normal">
                {{ item.description.substring(0, 50) }}{{ item.description.length > 60 ? '...' : '' }}
              </p>
            </div>
            <img
              :src="item.thumbnail"
              :alt="item.name"
              class="w-14 h-14 md:w-20 md:h-20 rounded-md mx-auto object-cover"
              loading="lazy"
            />
          </div>
        </router-link>
      </div>
    </div>

    <!-- مؤشرات تحميل الفئات والأخطاء -->
    <div v-if="isLoadingCategories" class="flex justify-center items-center mt-4">
      <span class="text-gray-500">{{ t('loadingCategories') }}</span>
    </div>

    <div v-else-if="errorCategories" class="text-red-500 text-center mt-4">
      {{ errorCategories }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useAppStore } from '@/stores/appStore';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash';

export default {
  name: 'CategorySlider',
  setup() {
    const appStore = useAppStore();
    const { t } = useI18n({ useScope: 'global' });

    const categories = ref([]);
    const selectedCategoryItems = ref([]);
    const selectedCategoryName = ref('');
    const selectedCategoryId = ref(null); // معرف الفئة المختارة
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

    const isLoadingCategories = ref(false);
    const isLoadingItems = ref(false);
    const errorCategories = ref('');
    const errorItems = ref('');

    // جلب الفئات من الـ API
    const fetchCategories = async () => {
      isLoadingCategories.value = true;
  errorCategories.value = '';
  try {
    const response = await axiosInstance.get('categories/items');
        if (response.status === 200) {
          categories.value = response.data.data;
          console.log('Categories fetched:', categories.value);

          // إذا لم يكن هناك فئة مختارة، اختر الأولى
          if (!selectedCategoryId.value && categories.value.length > 0) {
            selectedCategoryId.value = categories.value[0].id;
          }

          // ابحث عن الفئة المختارة في القائمة الجديدة
          const selectedCategory = categories.value.find(
            (category) => category.id === selectedCategoryId.value
          );

          if (selectedCategory) {
            fetchItems(selectedCategory);
          } else if (categories.value.length > 0) {
            // إذا لم يتم العثور على الفئة، اختر الأولى
            selectedCategoryId.value = categories.value[0].id;
            fetchItems(categories.value[0]);
          }

          startAutoplay();
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        errorCategories.value = t('errorCategories');
      } finally {
        isLoadingCategories.value = false;
      }
    };

    // جلب العناصر بناءً على الفئة المختارة
    const fetchItems = (category) => {
      isLoadingItems.value = true;
      errorItems.value = '';
      try {
        selectedCategoryId.value = category.id;
        selectedCategoryItems.value = category.items;
        selectedCategoryName.value = category.name;
        currentIndex.value = 0;
        console.log(`Fetched items for category: ${category.name}`);
      } catch (error) {
        console.error('Error fetching items:', error);
        errorItems.value = t('errorItems');
      } finally {
        isLoadingItems.value = false;
      }
    };

    // تحديث عدد العناصر المعروضة بناءً على حجم الشاشة
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 400) {
        itemsPerView.value = 5;
      } else if (width < 768) {
        itemsPerView.value = 5;
      } else if (width < 1024) {
        itemsPerView.value = 6;
      }
      console.log(`Items per view updated to: ${itemsPerView.value}`);
    };

    const handlePrev = () => {
      currentIndex.value =
        currentIndex.value > 0
          ? currentIndex.value - 1
          : Math.max(categories.value.length - itemsPerView.value, 0);
      console.log(`Moved to previous index: ${currentIndex.value}`);
    };

    const handleNext = () => {
      currentIndex.value =
        currentIndex.value < categories.value.length - itemsPerView.value
          ? currentIndex.value + 1
          : 0;
      console.log(`Moved to next index: ${currentIndex.value}`);
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (categories.value.length > itemsPerView.value) {
        autoplay.value = setInterval(handleNext, autoplayInterval);
        console.log('Autoplay started');
      }
    };

    const stopAutoplay = () => {
      if (autoplay.value) {
        clearInterval(autoplay.value);
        autoplay.value = null;
        console.log('Autoplay stopped');
      }
    };

    const handleTouchStart = (e) => {
      stopAutoplay();
      isDragging.value = true;
      startX.value = e.touches[0].clientX;
      if (sliderRef.value) {
        sliderRef.value.style.transition = 'none';
      }
      console.log('Touch start');
    };

    const handleTouchMove = (e) => {
      if (!isDragging.value || !sliderRef.value) return;
      const deltaX = e.touches[0].clientX - startX.value;
      const sliderWidth = sliderRef.value.offsetWidth;
      const translatePercentage = (deltaX / sliderWidth) * 100;
      sliderRef.value.style.transform = `translateX(${
        -(currentIndex.value * (100 / itemsPerView.value)) + translatePercentage
      }%)`;
      console.log(`Touch move: deltaX=${deltaX}, translatePercentage=${translatePercentage}`);
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
      console.log('Touch end');
    };

    const resetSliderPosition = () => {
      if (sliderRef.value) {
        sliderRef.value.style.transition = `transform ${transitionDuration}ms ease-in-out`;
        sliderRef.value.style.transform = `translateX(-${
          (currentIndex.value * 100) / itemsPerView.value
        }%)`;
        console.log('Slider position reset');
      }
    };

    watch([currentIndex, itemsPerView], resetSliderPosition);

    // إدارة حالة تثبيت السلايدر عند التمرير
    const handleScroll = () => {
      if (!sliderRef.value) return;
      isFixed.value = window.scrollY >= initialSliderTop.value;
    };

    // تحديث تخطيط السلايدر بناءً على حجم الشاشة
    const updateLayout = debounce(() => {
      updateItemsPerView();
      if (sliderRef.value) {
        initialSliderTop.value = sliderRef.value.getBoundingClientRect().top + window.scrollY;
        sliderHeight.value = sliderRef.value.offsetHeight;
        console.log(
          `Layout updated: initialSliderTop=${initialSliderTop.value}, sliderHeight=${sliderHeight.value}`
        );
      }
    }, 200);

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
        console.log(`Language changed to: ${appStore.language}`);
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
      isLoadingCategories,
      isLoadingItems,
      errorCategories,
      errorItems,
      t, // لإستخدام الترجمة في القالب
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
