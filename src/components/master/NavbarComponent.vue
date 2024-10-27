<template>
  <nav class="bg-green-900 text-white h-16 flex items-center justify-between px-4 md:px-16 relative">
    <!-- Mobile Menu Button -->
    <div class="md:hidden flex items-center">
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle Menu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Links Section (Desktop View Only) -->
    <div class="hidden md:flex items-center space-x-12 mr-20">
      <router-link to="/who-we-are" class="hover:text-gray-300 uppercase">Who Are We</router-link>

      <div class="relative group">
        <button class="hover:text-gray-300 flex items-center uppercase">
          Locations
          <svg class="ml-1 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>
        <!-- Dropdown Menu -->
        <div class="hidden group-hover:block absolute left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-20">
          <router-link to="/location1" class="block px-4 py-2 hover:bg-gray-100">Location 1</router-link>
          <router-link to="/location2" class="block px-4 py-2 hover:bg-gray-100">Location 2</router-link>
        </div>
      </div>

      <RouterLink to="/menu" class="hover:text-gray-300 uppercase">Menus</RouterLink>

    </div>

    <!-- Logo Section -->
    <div class="flex items-center">
      <img src="@/assets/logoNav.png" alt="Logo" class="w-10" />
    </div>

    <!-- Buttons and Contact (Desktop View Only) -->
    <div class="hidden md:flex items-center space-x-6">
      <div class="flex items-center space-x-2 md:hidden lg:block">
        <font-awesome-icon :icon="['fas', 'phone']" />
        <span>+966 503 954 909</span>
      </div>
      <button class="bg-transparent border border-white py-2 px-4 rounded-full hover:bg-white hover:text-green-900 transition duration-300">
        Reserve
      </button>
      <button class="bg-white text-green-900 py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300">
        Order Now
      </button>
      <button>En</button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed top-16 left-0 right-0 bg-green-900 text-white py-4 px-6 space-y-4 flex flex-col md:hidden z-10"
    >
      <router-link to="/who-we-are" class="hover:text-gray-300 uppercase">Who Are We</router-link>
      <div class="relative">
        <button @click="isLocationsDropdownOpen = !isLocationsDropdownOpen" class="hover:text-gray-300 flex items-center uppercase">
          Locations
          <svg class="ml-1 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>
        <!-- Mobile Dropdown Menu -->
        <div v-if="isLocationsDropdownOpen" class="mt-2 w-40 bg-white text-black rounded-md shadow-lg z-20">
          <router-link to="/location1" class="block px-4 py-2 hover:bg-gray-100">Location 1</router-link>
          <router-link to="/location2" class="block px-4 py-2 hover:bg-gray-100">Location 2</router-link>
        </div>
      </div>
      <router-link to="/menu" class="hover:text-gray-300 uppercase">Menus</router-link>
      <div class="flex items-center space-x-2">
        <font-awesome-icon :icon="['fas', 'phone']" />
        <span>+966 503 954 909</span>
      </div>
      <button class="bg-transparent border border-white py-2 px-4 rounded-full hover:bg-white hover:text-green-900 transition duration-300">
        Reserve
      </button>
      <button class="bg-white text-green-900 py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300">
        Order Now
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
const isLocationsDropdownOpen = ref(false)
</script>

<style scoped>
/* Custom styles if necessary */
</style>
