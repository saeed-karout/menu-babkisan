<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="relative mx-auto  flex flex-col justify-center bg-center bg-cover"
       >
    <!-- Background overlay with color and opacity -->
    <div class="absolute inset-0 bg-white bg-opacity-10 z-10"></div>

    <!-- Main content -->
    <div class="relative z-20">
      <RouterView />
    </div>
  </div>
</template>
