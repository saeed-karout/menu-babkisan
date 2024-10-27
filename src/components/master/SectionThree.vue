<template>
  <div class="bg-[url('../assets/images/bgSectionThree.jpg')] h-full w-full bg-cover bg-center flex justify-center items-center">
    <div class="text-white py-16 px-4 sm:px-8 md:px-16 lg:px-32 w-full ">
      <!-- Title Section -->
      <div class="mb-8 text-center md:text-left">
        <p class="text-xs sm:text-sm tracking-widest uppercase">Indulge in our signature dishes - the finest Middle Eastern cuisine</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-thin mb-4">
          A Taste of <span class="text-Gold">Bab Kissan's</span> Culinary <br class="hidden md:block"> Artistry: Best <span class="text-Gold"> Middle Eastern <br class="hidden md:block"> Food in</span> <span class="text-green-600">Riyadh</span>
        </h2>
        <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-8">
          <p class="max-w-3xl text-sm md:text-base leading-relaxed">
            Experience the vibrant flavors of Bab Kissan, where each dish is a celebration of taste and artistry. If you're seeking an exceptional dining experience in Jeddah, our menu features everything from succulent grilled meats to flavorful mezze, inviting you to explore the rich traditions of Middle Eastern cuisine. Your table at Bab Kissan awaits!
          </p>
          <button class="text-md bg-transparent border border-white text-white py-2 px-6 rounded-full h-12 flex items-center justify-center
           hover:bg-Gold transition duration-300">
            Explore Bab Kissan's Menu
          </button>
        </div>
      </div>

      <!-- Slider Section -->
      <swiper
        :slides-per-view="1"
        :space-between="10"
        breakpoints="{
          640: { slidesPerView: 1.5, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 40 }
        }"
        class="my-8"
      >
        <swiper-slide v-for="(item, index) in menuItems" :key="index">
          <div class="bg-[#704f27] p-4 rounded-lg flex flex-col gap-4 shadow-lg">
            <img :src="item.image" :alt="item.title" class="rounded-lg w-full object-cover h-48 sm:h-64 lg:h-72" />
            <h3 class="text-lg sm:text-xl font-bold">{{ item.title }}</h3>
            <p class="text-sm sm:text-base">{{ item.description }}</p>
          </div>
        </swiper-slide>

        <div class="swiper-button-next text-[#f5d000]"></div>
        <div class="swiper-button-prev text-[#f5d000]"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      menuItems: [
        {
          title: "Shawarma",
          image: "/src/assets/images/itemSectionTwo.png",
          description: "Grilled flatbread filled with shrimp tempura, avocado topped with bite-sized tempura shrimp.",
        },
        {
          title: "Kebbeh & Shawarma",
          image: "path/to/image2.jpg",
          description: "Avocado wrapped red fish with salmon and truffle mayo then drizzled with unagi sauce.",
        },
        {
          title: "Lorem",
          image: "path/to/image3.jpg",
          description: "Ura maki style filled with wakame crab mix, cucumber, avocado, wasabi mayo topped with wasabi tobiko.",
        },
        {
          title: "Lorem",
          image: "path/to/image4.jpg",
          description: "Ura maki with shrimp tempura, cream cheese, cucumber, avocado, sweet and spicy wrap.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  width: 44px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  background: transparent;
  color: #f5d000;
}
</style>
