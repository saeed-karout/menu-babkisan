<template>
    <div class="h-32 flex justify-between mx-5 bg-transparent items-center" dir="ltr">





        <div class="">


              <a href="https://plateau.media/" dir="ltr" target="_blank" class="flex items-center gap-2">
                    <span>powered By</span>
                    <span class="gradient-text text-xs">PLateau</span>
                    <img src="../assets/images/plateau.png" class="w-10 h-auto">
                </a>

        </div>

        <div class="">
            <p class="flex items-center gap-2">
                <i class="text-green-900">
                    <font-awesome-icon :icon="['fas', 'phone']" />

                </i>
                +966 503 954 909
            </p>
            <p class="flex items-center gap-2">
                <i class="text-green-900">
                    <font-awesome-icon :icon="['fab', 'whatsapp']" />

                </i>
                +966 555 774 920
            </p>
        </div>

    </div>
</template>

<script setup>

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
