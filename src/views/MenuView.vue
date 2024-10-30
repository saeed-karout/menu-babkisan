<template>
  <div class="relative min-h-screen">
    <!-- طبقة الخلفية الثابتة -->
    <div
      class="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
      :style="{ backgroundImage: `url(${img})` }"
    ></div>
    <!-- محتوى الصفحة القابل للتمرير -->
    <div class="max-w-[600px] mx-auto p-2">
      <ProfileComponent />
      <CategoryCarousel />
      <FooterMenu />
    </div>
  </div>
</template>

<script setup>
import CategoryCarousel from '@/components/CategoryCarousel.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import FooterMenu from '@/components/FooterMenu.vue';
import img from '../assets/images/bg.jpg';
</script>

<style scoped>
/* تأكد من أن المكونات الداخلية لا تغطي الخلفية */
</style>
