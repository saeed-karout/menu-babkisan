<script setup>
import CategoryCarousel from '@/components/CategoryCarousel.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import FooterMenu from '@/components/FooterMenu.vue';
import img from '../assets/images/bg.jpg';
</script>

<template>
  <div
    class="max-w-[600px] img mx-auto"
    :style="{ backgroundImage: `url(${img})` }"
  >
    <ProfileComponent />
    <CategoryCarousel />
    <FooterMenu />
  </div>
</template>

<style scoped>
.img {
  background-size: cover;
  background-position: center; /* إضافة لتحسين وضعية الصورة */
  width: 100%;
  height: 100vh;
}
</style>
