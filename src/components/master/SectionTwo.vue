<template>
  <div class="bg-[url('../assets/images/bg-green.png')] text-white py-16 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col lg:flex-row items-center lg:items-start gap-10">
    <!-- Text Section -->
    <div class="flex-1 space-y-6 text-center lg:text-left">
      <p class="text-xs sm:text-sm tracking-widest uppercase">
        {{ t('sectionTwo.subtitle') }}
      </p>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extralight uppercase text-white">
        <span class="text-Gold">{{ t('sectionTwo.heading.part1') }}</span> <span class="text-white">{{ t('sectionTwo.heading.part2') }},</span><br class="hidden sm:block">
        {{ t('sectionTwo.heading.part3') }} <span class="text-Gold">{{ t('sectionTwo.heading.part4') }}</span>
      </h2>
      <p class="text-sm sm:text-base leading-relaxed">
        {{ t('sectionTwo.paragraph1') }}
      </p>
      <p class="text-sm sm:text-base leading-relaxed">
        {{ t('sectionTwo.paragraph2') }}
      </p>
      <p class="text-sm sm:text-base leading-relaxed">
        {{ t('sectionTwo.paragraph3') }}
      </p>
      <button class="mt-4 flex items-center justify-center lg:justify-start text-sm border-b border-white hover:border-[#fbbd0e] transition duration-300 uppercase">
        {{ t('sectionTwo.buttonText') }}
        <span class="ml-2">></span>
      </button>
    </div>

    <!-- Image Section -->
    <div class="flex-1 w-full lg:w-auto lg:max-w-md mt-8 lg:mt-0">
      <img
        src="../../assets/images/itemSectionTwo.png"
        alt="Middle Eastern Dish"
        class="rounded-md shadow-lg w-full lg:w-auto"
      />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
