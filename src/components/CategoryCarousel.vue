<template>
  <div class="relative w-full overflow-hidden">
    <!-- Slider Container -->
    <div
      ref="sliderRef"
      class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- Category Items -->
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex-none p-2 text-center"
        :style="{ width: `${100 / itemsPerView}%` }"
      >
        <img
          :src="category.thumbnail"
          :alt="category.name"
          class="w-20 h-20 rounded-full border-2 border-gray-300 mx-auto"
        />
        <span class="mt-2 text-sm text-brownColor font-medium block">{{ category.name }}</span>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="handlePrev"
      class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
    >
      <!-- Left Arrow Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brownColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="handleNext"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
    >
      <!-- Right Arrow Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'CategorySlider',
  setup() {
    // Reactive state variables
    const categories = ref([]);
    const currentIndex = ref(0);
    const itemsPerView = ref(6);

    // Refs for DOM elements and other variables
    const sliderRef = ref(null);
    const startX = ref(0);
    const isDragging = ref(false);
    const autoplay = ref(null);

    // Configuration constants
    const transitionDuration = 300; // in milliseconds
    const autoplayInterval = 3000; // in milliseconds
    const swipeThreshold = 50; // in pixels

    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.api.babkisanresturant.com/api/categories');
        if (response.status === 200) {
          categories.value = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Update itemsPerView based on window width for responsiveness
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        itemsPerView.value = 4; // Small mobile devices
      } else if (width < 1024) {
        itemsPerView.value = 6; // Tablets
      } else {
        itemsPerView.value = 6; // Large screens
      }
    };

    // Navigate to the previous set of categories
    const handlePrev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value -= 1;
      } else {
        // Loop to the end if at the beginning
        currentIndex.value = Math.max(categories.value.length - itemsPerView.value, 0);
      }
    };

    // Navigate to the next set of categories
    const handleNext = () => {
      if (currentIndex.value < categories.value.length - itemsPerView.value) {
        currentIndex.value += 1;
      } else {
        // Loop back to the start if at the end
        currentIndex.value = 0;
      }
    };

    // Start autoplay functionality
    const startAutoplay = () => {
      stopAutoplay(); // Ensure no existing interval
      if (categories.value.length > itemsPerView.value) {
        autoplay.value = setInterval(() => {
          handleNext();
        }, autoplayInterval);
      }
    };

    // Stop autoplay functionality
    const stopAutoplay = () => {
      if (autoplay.value) {
        clearInterval(autoplay.value);
        autoplay.value = null;
      }
    };

    // Handle touch start event for swipe
    const handleTouchStart = (e) => {
      stopAutoplay(); // Stop autoplay during interaction
      isDragging.value = true;
      startX.value = e.touches[0].clientX;
      if (sliderRef.value) {
        sliderRef.value.style.transition = 'none'; // Disable transition during drag
      }
    };

    // Handle touch move event for swipe
    const handleTouchMove = (e) => {
      if (!isDragging.value) return;
      const moveX = e.touches[0].clientX;
      const deltaX = moveX - startX.value;
      const sliderWidth = sliderRef.value.offsetWidth;
      const translatePercentage = (deltaX / sliderWidth) * 100;
      const newTranslate = -(currentIndex.value * (100 / itemsPerView.value)) + translatePercentage;

      if (sliderRef.value) {
        sliderRef.value.style.transform = `translateX(${newTranslate}%)`;
      }
    };

    // Handle touch end event for swipe
    const handleTouchEnd = (e) => {
      if (!isDragging.value) return;
      isDragging.value = false;
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX.value;

      if (deltaX > swipeThreshold) {
        handlePrev();
      } else if (deltaX < -swipeThreshold) {
        handleNext();
      } else {
        // If swipe is below threshold, reset to current position
        resetSliderPosition();
      }

      // Restart autoplay after interaction
      startAutoplay();
    };

    // Reset slider position with transition
    const resetSliderPosition = () => {
      if (sliderRef.value) {
        sliderRef.value.style.transition = `transform ${transitionDuration}ms ease-in-out`;
        sliderRef.value.style.transform = `translateX(-${(currentIndex.value * 100) / itemsPerView.value}%)`;
      }
    };

    // Watch for changes in currentIndex to apply transition
    watch(currentIndex, () => {
      if (sliderRef.value) {
        sliderRef.value.style.transition = `transform ${transitionDuration}ms ease-in-out`;
        sliderRef.value.style.transform = `translateX(-${(currentIndex.value * 100) / itemsPerView.value}%)`;
      }
    });

    // Lifecycle hooks
    onMounted(() => {
      fetchCategories();
      updateItemsPerView();
      window.addEventListener('resize', updateItemsPerView);
      startAutoplay();
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateItemsPerView);
      stopAutoplay();
    });

    return {
      categories,
      currentIndex,
      itemsPerView,
      sliderRef,
      handlePrev,
      handleNext,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    };
  },
};
</script>

<style scoped>
/* Optional: Customize scrollbar or other styles if needed */
</style>
