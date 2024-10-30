<template>
    <footer class="bg-[url('../assets/images/bg-green.png')] bg-cover text-white py-16 px-4 sm:px-8 md:px-16 ">
        <div class="flex flex-col items-center space-y-8 w-full">
            <!-- Title -->
            <h2 class="lg:text-5xl md:text-4xl py-5 font-bold text-center uppercase">
                {{ t('footer.title.part1') }} <br> <span class="text-Gold">{{ t('footer.title.part2') }}</span>
                {{ t('footer.title.part3') }}
            </h2>

            <!-- Decorative Patterns -->
            <div class="flex items-center w-full justify-around space-x-4">
                <img src="../../assets/images/left.png" :alt="t('footer.decorativePattern')"
                    class="lg:w-52 md:w-32 w-20 h-auto">
                <img src="../../assets/images/babkisan.png" :alt="t('footer.logoAlt')" class="w-16 md:w-20 h-auto">
                <img src="../../assets/images/right.png" :alt="t('footer.decorativePattern')"
                    class="lg:w-52 md:w-32 w-20 h-auto">
            </div>

            <!-- Social Media Icons -->
            <div class="flex items-center justify-center space-x-6 text-2xl">
                <a href="#" :aria-label="t('footer.social.facebook')">
                    <font-awesome-icon :icon="['fab', 'facebook-f']" />
                </a>
                <a href="#" :aria-label="t('footer.social.tiktok')">
                    <font-awesome-icon :icon="['fab', 'tiktok']" />
                </a>
                <a href="#" :aria-label="t('footer.social.instagram')">
                    <font-awesome-icon :icon="['fab', 'instagram']" />
                </a>
                <a href="#" :aria-label="t('footer.social.snapchat')">
                    <font-awesome-icon :icon="['fab', 'snapchat']" />
                </a>
            </div>

            <!-- Contact Information -->
            <div
                class="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 text-center text-sm border-t border-[#e7e7e7] pt-6 w-full">
                <p>{{ t('footer.copyright') }}</p>
                <p class="flex items-center gap-2">
                    <i class="text-Gold">
                        <font-awesome-icon :icon="['fas', 'phone']" />
                    </i>
                    {{ t('footer.phone') }}
                </p>
                <p class="flex items-center gap-2">
                    <i class="text-Gold">
                        <font-awesome-icon :icon="['fab', 'whatsapp']" />
                    </i>
                    {{ t('footer.whatsapp') }}
                </p>
                <p class="flex gap-2 items-center">
                    <i class="text-Gold">
                        <font-awesome-icon :icon="['fas', 'location-dot']" />
                    </i>
                    {{ t('footer.address') }}
                </p>

                <a href="https://plateau.media/" target="_blank" class="flex items-center gap-2">
                    <span>powered By</span>
                    <span class="gradient-text text-xs">PLateau</span>
                    <img src="../../assets/images/plateau.png" :alt="t('footer.poweredByLogoAlt')" class="w-10 h-auto">
                </a>

            </div>


        </div>
    </footer>
</template>

<script setup>
    import {
        useI18n
    } from 'vue-i18n';

    const {
        t
    } = useI18n();
</script>



<style scoped>
    .gradient-text {
        background: linear-gradient(90deg, #eb2952, #141823);
        /* Gradient colors */
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        /* Make text transparent to show gradient */
    }
</style>
