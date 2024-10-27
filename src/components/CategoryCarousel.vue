<!-- src/components/CategorySlider.vue -->
<template>
  <div class="max-w-3xl mx-auto mt-16">
    <!-- سلايدر الفئات -->
    <div
      class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth backdrop-blur-md sticky top-0  z-10 custom-scrollbar"
    >
      <!-- عناصر الفئات -->
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex-none p-2 text-center cursor-pointer  transition-transform snap-start"
        @click="fetchItems(category)"
      >
        <img
          :src="category.thumbnail"
          :alt="category.name"
          class="w-16 h-16 md:w-20 md:h-20 rounded-full border-gray-300 mx-auto object-cover"
          loading="lazy"
        />
        <span class="mt-2 font-bold text-sm text-brownColor block">
          {{ category.name }}
        </span>
      </div>
    </div>

    <!-- عرض العناصر -->
    <div class="mt-4">
      <h2 class="text-xl text-brownColor font-semibold mb-6">
        {{ selectedCategoryName }}
      </h2>

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
              <p class="text-brownColor font-normal line-clamp-2">
                {{ item.description }}
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

      <!-- مؤشرات تحميل الفئات والأخطاء -->
      <div v-if="isLoadingCategories" class="flex justify-center items-center mt-4">
        <span class="text-gray-500">{{ t('loadingCategories') }}</span>
      </div>
      <div v-else-if="errorCategories" class="text-red-500 text-center mt-4">
        {{ errorCategories }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useAppStore } from '@/stores/appStore';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CategorySlider',
  setup() {
    const appStore = useAppStore();
    const { t } = useI18n({ useScope: 'global' });

    const categories = ref([]);
    const selectedCategoryItems = ref([]);
    const selectedCategoryName = ref('');
    const selectedCategoryId = ref(null);

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
      } catch (error) {
        console.error('Error fetching items:', error);
        errorItems.value = t('errorItems');
      } finally {
        isLoadingItems.value = false;
      }
    };

    onMounted(() => {
      fetchCategories();
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
      fetchItems,
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
/* إخفاء شريط التمرير الافتراضي */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* تخصيص شريط التمرير للسلايدر */
.custom-scrollbar {
  --sb-track-color: #b28f48;
  --sb-thumb-color: #073f25;
  --sb-size: 7px;
  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  scrollbar-width: thin;
}

.custom-scrollbar::-webkit-scrollbar {
  height: var(--sb-size);
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 7px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 7px;
  border: 2px solid transparent;
  background-clip: content-box;
}

@supports not selector(::-webkit-scrollbar) {
  .custom-scrollbar {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>
