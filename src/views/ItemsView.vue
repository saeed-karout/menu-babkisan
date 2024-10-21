<template>
  <div
    :class="[
      'h-screen mx-auto',
      isLoading ? 'overflow-hidden' : 'overflow-auto'
    ]"
  >
    <!-- عرض رسالة الخطأ إذا كانت موجودة -->
    <div v-if="error" class="text-red-500 text-center p-4">
      {{ error }}
    </div>

    <!-- عرض بيانات العنصر إذا تم جلبها بنجاح -->
    <div v-else-if="item">
      <div class="relative mb-4">

        <!-- صورة العنصر -->
        <img
          :src="item.image"
          :alt="item.name"
          class="w-full min-h-auto border-img object-cover"
          loading="lazy"
          @error="onImageError"
        />

        <!-- زر العودة -->
        <button
          @click="goBack"
          class="absolute top-4 left-4 w-16 h-12 bg-bg text-black rounded-full shadow-md"
          aria-label="العودة"
        >
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </button>

        <!-- زر المشاركة -->
        <button
          @click="shareLink"
          class="absolute top-4 right-4 w-16 h-12 bg-bg text-black rounded-full shadow-md"
          aria-label="مشاركة"
        >
          <font-awesome-icon :icon="['far', 'share-from-square']" />
        </button>

      </div>

      <!-- تفاصيل العنصر -->
      <div class="text-start pl-5">
        <h2 class="text-2xl font-semibold mb-2">{{ item.name }}</h2>
        <span class="inline-block bg-gray-400 text-white rounded-full px-3 py-1 text-sm font-medium mb-2">
          {{ item.calories }} kcal
        </span>
        <p class="text-gray-600 text-base mb-6">
          {{ item.description }}
        </p>
        <div class="text-start">
          <button class="bg-brownColor text-white px-2 py-1 rounded-md text-md font-semibold">
            SAR {{ item.price }}
          </button>
        </div>
      </div>
    </div>

    <!-- عرض مكون التحميل إذا كانت البيانات لا تزال تُحمّل -->
    <div v-else class="flex items-center justify-center h-full">
      <LoadingComponents />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import LoadingComponents from '@/components/LoadingComponents.vue';
import { useAppStore } from '@/stores/appStore'; // استخدام Pinia لتخزين اللغة

export default {
  name: 'FoodItemCard',
  components: { LoadingComponents },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const slug = route.params.slug;
    const item = ref(null);
    const error = ref('');
    const appStore = useAppStore(); // استخدام اللغة المختارة من Pinia

    // دالة لجلب بيانات العنصر بناءً على الـ slug
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://www.api.babkisanresturant.com/api/categories/items/${slug}`, {
          headers: {
            'Accept-Language': appStore.language, // استخدام اللغة من Pinia
          },
        });
        if (response.status === 200) {
          item.value = response.data.data;
        } else {
          error.value = 'لم يتم العثور على العنصر المطلوب.';
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        error.value = 'حدث خطأ أثناء جلب بيانات العنصر.';
      }
    };

    // دالة للعودة إلى الصفحة السابقة
    const goBack = () => {
      router.go(-1); // للعودة إلى الصفحة السابقة
    };

    // دالة للمشاركة
    const shareLink = async () => {
      if (!item.value) {
        alert('العنصر غير متاح للمشاركة.');
        return;
      }

      const shareData = {
        title: item.value.name || 'مشاركة عنصر',
        text: item.value.description
          ? item.value.description.substring(0, 100) + (item.value.description.length > 100 ? '...' : '')
          : 'تفاصيل العنصر',
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          console.log('تمت المشاركة بنجاح');
        } catch (err) {
          console.error('فشل في المشاركة:', err);
        }
      } else if (navigator.clipboard) {
        // الفallback: نسخ الرابط إلى الحافظة
        try {
          await navigator.clipboard.writeText(shareData.url);
          alert('تم نسخ الرابط إلى الحافظة');
        } catch (err) {
          console.error('فشل في نسخ الرابط:', err);
          alert('فشل في نسخ الرابط. يرجى نسخه يدويًا.');
        }
      } else {
        // إذا لم يكن هناك دعم للمشاركة أو النسخ
        prompt('يرجى نسخ الرابط التالي:', shareData.url);
      }
    };

    // خاصية محوسبة لتحديد حالة التحميل
    const isLoading = computed(() => !item.value && !error.value);

    // دالة لفشل تحميل الصورة
    const onImageError = (event) => {
      event.target.src = '/path/to/default-image.jpg'; // وضع مسار صورة افتراضية هنا
    };

    // جلب بيانات العنصر عند تحميل المكون
    onMounted(() => {
      fetchItem();
    });

    return {
      item,
      error,
      goBack,
      shareLink,
      isLoading, // إعادة خاصية isLoading للاستخدام في القالب
      onImageError, // إضافة دالة فشل الصورة
    };
  },
};
</script>

<style scoped>
.border-img {
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}

.text-brownColor {
  color: #8B5E34;
}

.bg-textBrown {
  background-color: #8B5E34;
}

.bg-bg {
  background-color: #FAF5E4;
}

/* تحسينات إضافية */
button {
  cursor: pointer;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #8b5e34;
}
</style>
