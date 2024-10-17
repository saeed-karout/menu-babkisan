<template>
  <div class="w-full h-[430px] mx-auto rounded-lg">
    <!-- Cover Image and Edit Button -->
    <div class="relative">
      <img :src="imgBg" alt="Restaurant Cover" class="w-full h-[36vh] object-cover rounded-t-lg" />
      <div class="absolute top-16 right-8">
        <button
          class="bg-white p-2 w-12 h-12 rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Edit Profile"
        >
          <font-awesome-icon icon="user" />
        </button>
      </div>
    </div>

    <!-- Profile Image, Name, and Social Icons -->
    <div class="text-center mt-4 relative -top-14">
      <img :src="imgProfile" alt="Albab Alsharqy Logo" class="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md" />
      <h1 class="text-2xl font-bold mt-2">Bab Kisan</h1>
      <div class="flex justify-center space-x-4 mt-4 text-xl">
        <a
          v-for="(icon, index) in socialIcons"
          :key="index"
          href="#"
          class="text-brownColor hover:text-gray-700 transition"
          :aria-label="icon[1]"
        >
          <font-awesome-icon :icon="icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import imgBg from '@/assets/images/bg-profile.jpeg';
import imgProfile from '@/assets/images/img-profile.jpeg';

export default defineComponent({
  name: 'ProfileCard',
  data() {
    return {
      socialIcons: [
        ['fab', 'whatsapp'],
        ['fab', 'instagram'],
        ['fab', 'facebook'],
        ['fab', 'tiktok'],
        ['fab', 'snapchat'],
      ],
      imgBg,
      imgProfile,
    };
  },
});
</script>

<style scoped>



</style>
