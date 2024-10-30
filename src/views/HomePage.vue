<!-- MainPage.vue -->
<script setup>
import FooterComponent from '@/components/master/FooterComponent.vue';
import HeroSection from '@/components/master/HeroSection.vue';
import NavbarComponent from '@/components/master/NavbarComponent.vue';
import SectionReviews from '@/components/master/SectionReviews.vue';
import SectionThree from '@/components/master/SectionThree.vue';
import SectionTwo from '@/components/master/SectionTwo.vue';
</script>

<template>
  <div class="w-full">
    <NavbarComponent />
    <HeroSection />
    <!-- إضافة معرف للقسم الثاني -->
    <SectionTwo id="section-two" />
    <SectionReviews id="section-reviews" />
    <SectionThree  id="section-three" />
    <FooterComponent />
  </div>
</template>
