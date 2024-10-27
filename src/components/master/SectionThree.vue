<template>
  <div class="slider-container">
    <div class="w-[90%] mx-auto">
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
          <button class="text-md bg-transparent border border-white text-white py-2 px-6 rounded-full h-12 flex items-center justify-center hover:bg-Gold transition duration-300">
            Explore Bab Kissan's Menu
          </button>
        </div>
      </div>

      <!-- Slider Section -->
      <div class="slider-wrapper">
        <button class="slider-button prev-button" @click="prevSlide">&#10094;</button>
        <div class="slider" ref="slider">
          <div v-for="(item, index) in menuItems" :key="index" class="slider-item">
            <div class="item-content">
              <img :src="item.image" :alt="item.title" class="item-image" />
              <h3 class="font-bold text-xl text-start mx-5">{{ item.title }}</h3>
              <p class="text-md text-start  mx-5">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <button class="slider-button next-button" @click="nextSlide">&#10095;</button>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '@/assets/images/itemSectionTwo.png'
export default {
  data() {
    return {
      currentIndex: 0,
      menuItems: [
        {
          title: "Shawarma",
          image: img1,
          description: "Grilled flatbread filled with shrimp tempura, avocado topped with bite-sized tempura shrimp."
        },
        {
          title: "Kebbeh & Shawarma",
          image: img1,
          description: "Avocado wrapped red fish with salmon and truffle mayo then drizzled with unagi sauce."
        },
        {
          title: "Lorem",
          image: img1,
          description: "Ura maki style filled with wakame crab mix, cucumber, avocado, wasabi mayo topped with wasabi tobiko."
        },
        {
          title: "Lorem",
          image: img1,
          description: "Ura maki with shrimp tempura, cream cheese, cucumber, avocado, sweet and spicy wrap."
        }
      ]
    };
  },
  methods: {
    nextSlide() {
      const totalItems = this.menuItems.length;
      this.currentIndex = (this.currentIndex + 1) % totalItems;
      this.moveSlider();
    },
    prevSlide() {
      const totalItems = this.menuItems.length;
      this.currentIndex = (this.currentIndex - 1 + totalItems) % totalItems;
      this.moveSlider();
    },
    moveSlider() {
      const sliderElement = this.$refs.slider;
      const slideWidth = sliderElement.querySelector('.slider-item').clientWidth;
      sliderElement.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    }
  }
};
</script>

<style scoped>
.slider-container {
  background: url('../../assets/images/bgSectionThree.jpg') no-repeat center center;
  background-size: cover;
  padding: 2rem;
  color: white;
  text-align: center;
}
.title-section {
  margin-bottom: 2rem;
}
.highlight {
  color: #ffd700;
}
.highlight-green {
  color: #32cd32;
}
.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.slider {
  display: flex;
  transition: transform 0.5s ease;
  gap: 20px;
}
.slider-item {
  min-width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}
.item-content {
  background-color: #704f27;
  padding: 1rem;
  border-radius: 20px; /* border-radius لجميع الأجهزة */
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
}
.item-image {
  width: 90%;
  height: 300حء;
  margin: 0 auto;
  border-radius: 20px; /* إضافة border-radius للصور */
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
}
.prev-button {
  left: 1rem;
}
.next-button {
  right: 1rem;
}
@media (min-width: 768px) {
  .slider-item {
    min-width: 50%;
  }
}
@media (min-width: 1024px) {
  .slider-item {
    min-width: 30%;
  }
}
</style>
