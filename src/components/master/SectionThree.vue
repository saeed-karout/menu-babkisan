<template>
  <div class="slider-container lg:p-20 md:p-12 sm:p-5 p-5">
    <div class="container mx-auto px-4">
      <!-- قسم العنوان -->
      <div class="mb-8 text-center md:text-left">
        <p class="text-xs sm:text-sm tracking-widest uppercase">
          Indulge in our signature dishes - the finest Middle Eastern cuisine
        </p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-thin mb-4">
          A Taste of <span class="text-Gold">Bab Kissan's</span> Culinary
          <br class="hidden md:block" />
          Artistry: Best <span class="text-Gold">Middle Eastern</span>
          <span class="text-green-600"> Food in Riyadh</span>
        </h2>
        <div
          class="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-8"
        >
          <p class="max-w-3xl text-sm md:text-base leading-relaxed">
            Experience the vibrant flavors of Bab Kissan, where each dish is a
            celebration of taste and artistry. If you're seeking an exceptional
            dining experience in Jeddah, our menu features everything from
            succulent grilled meats to flavorful mezze, inviting you to explore
            the rich traditions of Middle Eastern cuisine. Your table at Bab
            Kissan awaits!
          </p>
          <button
            class="text-md bg-transparent border border-white text-white py-2 px-6 rounded-full h-12 flex items-center justify-center hover:bg-Gold transition duration-300"
          >
            Explore Bab Kissan's Menu
          </button>
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

<script>
import img1 from '@/assets/images/itemSectionTwo.png';

export default {
  data() {
    return {
      menuItems: [
        {
          title: 'Shawarma',
          image: img1,
          description:
            'Grilled flatbread filled with shrimp tempura, avocado topped with bite-sized tempura shrimp.',
        },
        {
          title: 'Kebbeh & Shawarma',
          image: img1,
          description:
            'Avocado wrapped red fish with salmon and truffle mayo then drizzled with unagi sauce.',
        },
        {
          title: 'Ura Maki',
          image: img1,
          description:
            'Ura maki style filled with wakame crab mix, cucumber, avocado, wasabi mayo topped with wasabi tobiko.',
        },
        {
          title: 'Spicy Ura Maki',
          image: img1,
          description:
            'Ura maki with shrimp tempura, cream cheese, cucumber, avocado, sweet and spicy wrap.',
        },
      ],
    };
  },
  methods: {
    scrollSlider(direction) {
      const slider = this.$refs.slider;
      const scrollAmount = slider.clientWidth * 0.9; // تعديل حسب الحاجة

      slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    },
  },
};
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
