<script lang="ts" setup>
defineProps<{
    brandData: {
        image: string;
        title: string;
        text: string;
        url: string;
    };
}>()

</script>

<template>
    <div
        role="tabpanel"
        tabindex="0"
        class="relative group rounded-4.5xl md:rounded-3xl px-[30px] md:px-4 py-4 bg-gradient-brand flex justify-between md:text-center overflow-hidden"
    >
        <NuxtLink :to="brandData.url" class="absolute inset-0 z-10" />

        <div class="absolute inset-0 bg-blue-500 transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none group-focus:opacity-100 group-focus-visible:opacity-100" />
        <div class="relative">
            <p class="text-lg md:text-xs text-blue-600 font-medium md:mb-1 group-hover:text-white group-focus-visible:text-white">
                {{ brandData.title }}
            </p>
            <p class="text-lg md:text-xs text-blue-600 font-medium group-hover:text-white group-focus-visible:text-white">
                {{ brandData.text }}
            </p>
        </div>
        <div class="relative flex md:hidden items-center">
            <img class="max-h-[169px]" :src="brandData.image" alt="">
            <p class="ml-2 font-roboto text-blue-600 font-medium text-xs max-w-[100px] group-hover:text-white group-focus-visible:text-white">
                Палата налоговых консультантов
            </p>
        </div>
    </div>
</template>
