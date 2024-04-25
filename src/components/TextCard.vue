<script lang="ts" setup>
defineProps<{
    itemData: {
        id: number;
        title: string;
        text: string;
        link: string;
        order: number;
        icon: string;
    };
}>()

</script>

<template>
    <div
        :style="`order: ${itemData.order}`"
        class="relative z-10 hover:z-20 group flex items-center justify-between py-11 md:py-6 px-9 md:px-4 bg-gradient-brand transition-all hover:bg-animation-text-card-blue hover:shadow-card-text lg:hover:bg-gradient-brand hover:scale-[1.085] lg:hover:scale-100 w-full rounded-4.5xl md:rounded-3xl overflow-hidden"
    >
        <div class="max-w-[715px]">
            <p class="text-lg font-medium mb-4 sm:mb-0 text-blue-600 group-hover:text-white lg:group-hover:text-blue-600 group-hover:text-2xl sm:leading-6.5">
                {{ itemData.title }}
            </p>
            <img class="absolute bottom-0 right-[18rem] max-h-[90%] translate-x-1/2 transition-all translate-y-8 group-hover:translate-y-0 duration-300 opacity-0 group-hover:opacity-100 pointer-events-none lg:hidden" :src="'/images/' + itemData.icon + '.png'" alt="">
            <div class="text-sm font-medium max-w-[715px] text-blue-600 group-hover:text-white lg:group-hover:text-blue-600 sm:hidden group-hover:text-base" v-html="itemData.text" />
        </div>
        <div :to="itemData.link" class="w-[54px] h-[54px] md:min-w-10 md:w-10 md:h-10 flex items-center justify-center bg-blue-300 rounded-2xl md:rounded-xl text-white">
            <IconsIconArrowBottom class="w-7 md:w-5 h-7 md:h-5 rotate-[270deg]" />
        </div>
        <NuxtLink :to="itemData.link" class="absolute inset-0 z-10" />
    </div>
</template>
