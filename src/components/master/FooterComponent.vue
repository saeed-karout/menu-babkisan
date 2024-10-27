<template>
  <footer class="bg-[url('../assets/images/bg-green.png')] bg-cover text-white py-16 px-4 sm:px-8 md:px-16 ">
      <div class="flex flex-col items-center space-y-8 w-full">
          <!-- Title -->
          <h2 class="lg:text-5xl md:text-4xl py-5 font-bold text-center uppercase">
              A Taste of <br> <span class="text-Gold">Bab Kissan's</span> Cuisine
          </h2>

          <!-- Decorative Patterns -->
          <div class="flex items-center w-full justify-around space-x-4">
              <img src="../../assets/images/left.png" alt="Decorative Pattern" class="lg:w-52 md:w-32 w-20 h-auto">
              <img src="../../assets/images/babkisan.png" alt="Bab Kissan Logo" class="w-16 md:w-20 h-auto">
              <img src="../../assets/images/right.png" alt="Decorative Pattern" class="lg:w-52 md:w-32 w-20 h-auto">
          </div>

          <!-- Social Media Icons -->
          <div class="flex items-center justify-center space-x-6 text-2xl">
              <a href="#" aria-label="Facebook">
                  <font-awesome-icon :icon="['fab', 'facebook-f']" />
              </a>
              <a href="#" aria-label="TikTok">
                  <font-awesome-icon :icon="['fab', 'tiktok']" />
              </a>
              <a href="#" aria-label="Instagram">
                  <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
              <a href="#" aria-label="Snapchat">
                  <font-awesome-icon :icon="['fab', 'snapchat']" />
              </a>
          </div>

          <!-- Contact Information -->
          <div class="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 text-center text-sm border-t border-[#e7e7e7] pt-6 w-full">
              <p>&copy; 2024 BAB KISSAN. All rights reserved.</p>
              <p class="flex items-center gap-2">
                  <i class="text-Gold">
                    <font-awesome-icon :icon="['fas', 'phone']" />

                  </i>
                  +966 503 954 909
              </p>
              <p class="flex items-center gap-2">
                  <i class="text-Gold">
                      <font-awesome-icon :icon="['fab', 'whatsapp']" />

                  </i>
                  +966 555 774 920
              </p>
              <p class="flex gap-2 items-center">
                  <i class="text-Gold">
                      <font-awesome-icon :icon="['fas', 'location-dot']" />
                  </i>
                  Khalid ibn Al Walid St Gharnatah, <br> Riyadh 13241 Saudi Arabia
              </p>

              <p class="flex gap-2 items-center ">
                <span>Powered by</span>
                <img src="../../assets/images/plateau.png" alt="Powered By Logo" class="w-10 h-auto">
              </p>
          </div>


      </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>
