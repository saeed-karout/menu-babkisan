<template>
  <div class="bg-[#B28F48] py-16 px-4 sm:px-8 md:px-16 lg:px-32 text-white">
      <!-- العنوان -->
      <h2 :class="[locale === 'ar' ? 'text-right' : 'text-left']" class="text-2xl sm:text-3xl font-bold mb-8 text-center md:text-left">
        {{ t('reviewsSection.title') }}
      </h2>

      <!-- ملخص تقييمات Google -->
      <div class="bg-[#ba9a5a] p-6 rounded-md mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-4">
              <img src="../../assets/images/google.png" :alt="t('reviewsSection.googleLogoAlt')" class="w-12 sm:w-16 md:w-20">
              <div class="flex flex-col">
                  <h3 class="text-lg sm:text-xl font-bold">{{ t('reviewsSection.googleReviews') }}</h3>
                  <div class="flex items-center gap-2">
                      <span class="text-xl sm:text-2xl font-bold">{{ rating }}</span>
                      <span class="text-yellow-400">★★★★★</span>
                      <span class="opacity-50">({{ formattedReviewCount }})</span>
                  </div>
              </div>
          </div>
          <a href="https://www.google.com/maps/place/YourBusiness/" target="_blank" rel="noopener noreferrer">
              <button class="bg-white text-[#a67c00] px-4 py-2 rounded-md shadow hover:bg-[#e0b756] transition duration-300">
                  {{ t('reviewsSection.reviewUsOnGoogle') }}
              </button>
          </a>
      </div>

      <!-- شريط تقييمات العملاء -->
      <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="bg-[#e0b756] p-6 rounded-md flex flex-col gap-4 min-w-[260px] snap-center shadow-md"
            :dir="locale === 'ar' ? 'rtl' : 'ltr'"
          >
              <!-- معلومات المستخدم -->
              <div class="flex items-center gap-4">
                  <div class="bg-[#004cff] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold uppercase">
                      {{ review.author_name.charAt(0) }}
                  </div>
                  <div>
                      <p class="font-bold">{{ review.author_name }}</p>
                      <p class="text-sm text-gray-200">{{ review.relative_time_description }}</p>
                  </div>
              </div>
              <!-- محتوى التقييم -->
              <div>
                  <div class="text-yellow-400">★★★★★</div>
                  <p>{{ review.text }}</p>
              </div>
              <!-- تم النشر على Google -->
              <div class="mt-auto flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                      :alt="t('reviewsSection.googleLogoAlt')" class="w-6 h-6">
                  <span class="text-sm">{{ t('reviewsSection.postedOnGoogle') }}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const reviews = ref([]);

// تقييم وعدد التقييمات (يمكنك جلبها ديناميكيًا إذا أردت)
const rating = '4.6';
const reviewCount = '5,784';

// تنسيق عدد التقييمات بناءً على اللغة
const formattedReviewCount = computed(() => {
  return new Intl.NumberFormat(locale.value).format(reviewCount);
});

async function fetchGoogleReviews() {
  try {
      // استخدم API لجلب التقييمات
      const apiKey = 'YOUR_GOOGLE_API_KEY';
      const placeId = 'YOUR_PLACE_ID';
      const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
      );
      const data = await response.json();
      if (data && data.result && data.result.reviews) {
          reviews.value = data.result.reviews;
      }
  } catch (error) {
      console.error('Error fetching reviews:', error);
  }
}

onMounted(() => {
  fetchGoogleReviews();
});
</script>

<style scoped>
/* تخصيص الأنماط حسب رغبتك */

/* تعديلات على الشريط لضمان التمرير السلس */
::-webkit-scrollbar {
  display: none;
}

.review-slide {
  scroll-snap-align: start;
}
</style>
