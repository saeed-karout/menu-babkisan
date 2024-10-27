<!-- src/components/ProfileCard.vue -->
<template>
    <div class="w-full h-[395px] mx-auto rounded-lg">
        <!-- صورة الغلاف -->
        <div class="relative">
            <img :src="imgBg" alt="Restaurant Cover" class="w-full h-[36vh] object-cover rounded-t-lg" />
        </div>

        <!-- زر تغيير اللغة -->
        <div class="text-right relative p-4">

        </div>

        <!-- صورة الملف الشخصي والاسم وروابط التواصل الاجتماعي -->
        <div class="text-center mt-4 relative -top-[100px]">
            <img :src="imgProfile" alt="Albab Alsharqy Logo"
                class="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-md" />
            <h1 class="text-2xl font-bold">{{ t('brand') }}</h1>
            <div class="flex justify-center items-center text-center space-x-4 text-xl">
                <a v-for="(social, index) in socialLinks" :key="index" :href="social.url" target="_blank"
                    rel="noopener noreferrer" class="text-brownColor hover:text-gray-700 transition"
                    :aria-label="social.name">
                    <font-awesome-icon :icon="[social.platform, social.icon]" />
                </a>

                <button @click="toggleLanguage"
                    class=" items-center text-center  text-lg "
                    aria-label="Toggle Language">
                    <div class="flex gap-1 text-brownColor">
                        <p>

                            <font-awesome-icon :icon="['fas', 'globe']" />
                        </p>

                        <p>
                            {{ currentLanguage === 'en' ? 'ع' : 'En' }}
                        </p>
                    </div>
                </button>


            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, computed } from 'vue';
    import { useAppStore } from '@/stores/appStore';
    import imgBg from '@/assets/images/bg-profile.jpg';
    import imgProfile from '@/assets/images/img-profile.jpg';
    import {  useI18n  } from 'vue-i18n';

    export default defineComponent({
        name: 'ProfileCard',
        setup() {
            const appStore = useAppStore();
            const { t } = useI18n({ useScope: 'global' });

            const currentLanguage = computed(() => appStore.language);

            const toggleLanguage = () => {
                const newLanguage = currentLanguage.value === 'en' ? 'ar' : 'en';
                console.log(`Changing language to: ${newLanguage}`); // Debugging
                appStore.setLanguage(newLanguage);

            };

            const socialLinks = [{
                    platform: 'fab',
                    icon: 'whatsapp',
                    name: 'WhatsApp',
                    url: 'https://wa.me/+966503954909'
                },
                {
                    platform: 'fab',
                    icon: 'instagram',
                    name: 'Instagram',
                    url: 'https://www.instagram.com/bab_kisan_resturant',
                },
                {
                    platform: 'fab',
                    icon: 'facebook',
                    name: 'Facebook',
                    url: 'https://www.facebook.com/profile.php?id=61566950593213&mibextid=ZbWKwL',
                },
                {
                    platform: 'fab',
                    icon: 'tiktok',
                    name: 'TikTok',
                    url: 'https://www.tiktok.com/@bab.kisam?_t=8qhIR2eqDUf&_r=1',
                },
                {
                    platform: 'fab',
                    icon: 'snapchat',
                    name: 'Snapchat',
                    url: 'https://snapchat.com/t/4U95CAW3'
                },
            ];

            return {
                currentLanguage,
                toggleLanguage,
                socialLinks,
                imgBg,
                imgProfile,
                t,
            };
        },
    });
</script>

<style scoped>
    /* تحسينات إضافية */

</style>
