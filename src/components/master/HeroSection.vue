<template>
  <div class="w-full h-[90vh] flex justify-center items-center">

    <div class="bg-[url('../assets/images/heroSection.jpg')] h-full w-full bg-cover bg-center flex justify-center items-center">
      <div class="flex flex-col justify-center items-center text-white space-y-4 px-4 sm:px-8 text-center max-w-screen-lg">

        <!-- Logo Section -->
        <div>
          <img src="../../assets/images/babkisan.png" class="w-28 sm:w-36 mb-6 sm:mb-8 h-auto" alt="Bab Kisan Logo">
        </div>

        <!-- Title Section -->
        <div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-light">Welcome to BAB KISAN</h2>
          <p class="text-sm sm:text-md lg:text-lg">Savor the Flavors of the Middle East</p>
          <p class="text-sm sm:text-md lg:text-lg mt-4 max-w-full lg:max-w-[50vw] mx-auto">
            Experience a culinary journey like no other with our authentic dishes, crafted from the finest ingredients and infused with rich spices. Join us for a taste of tradition, where every meal tells a story.
          </p>
          <p class="text-md lg:text-lg mt-2">Reserve Your Table Today!</p>
        </div>

        <!-- Button Section -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-6">
          <button
            class="bg-green-900 border border-white py-2 px-6 rounded-full hover:bg-white hover:text-green-900 transition duration-300 text-white uppercase font-light">
            Reserve a Table
          </button>
          <button
            class="bg-transparent text-white border border-white py-2 px-6 rounded-full hover:bg-gray-200 hover:text-green-900 transition duration-300 uppercase font-light">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
