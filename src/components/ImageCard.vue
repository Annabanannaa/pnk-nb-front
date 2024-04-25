<script lang="ts" setup>
import TheButton from '~/components/Buttons/TheButton.vue'
defineProps<{
    itemData: {
        image: string;
        title: string;
        text: string;
        backgroundPattern: string;
        backgroundImage: string;
        url: string;
    };
}>()

</script>

<template>
    <div
        class="relative flex flex-col rounded-4.5xl md:rounded-3xl p-8 md:p-4 bg-gray-50 min-h-80 md:min-h-[19.125rem] md:h-full overflow-hidden"
    >
        <div class="flex flex-col flex-grow">
            <p class="text-4.5xl md:text-1.5xl leading-11 md:leading-8 font-medium md:mb-1 max-w-[85%] md:max-w-full">
                {{ itemData.title }}
            </p>
            <div
                v-if="itemData.text"
                class="mt-4 space-y-2 text-blue-180 text-lg lg:text-base font-medium xs:mb-24 max-w-[80%] sm:max-w-[95%] mb-4"
                v-html="itemData.text"
            />
            <TheButton
                class="relative mt-auto w-max md:hidden !text-base !leading-5"
                size="md"
                theme="white"
                :href="itemData.url"
                target="_blank"
            >
                Основной сайт
            </TheButton>
        </div>

        <img
            v-if="itemData.backgroundImage"
            class="absolute bottom-8 right-8 md:bottom-4 md:right-4 z-10 a-lg:max-h-[13.5rem] h-full mt-auto ml-auto pointer-events-none a-sm:max-h-32 max-h-24"
            :src="'/images/' + itemData.backgroundImage + '.svg'"
            alt=""
        >
        <img
            v-if="itemData.backgroundPattern"
            class="absolute bottom-0 right-0 h-full pointer-events-none lg:max-h-48 sm:max-h-44"
            :src="'/images/' + itemData.backgroundPattern + '.svg'"
        >
    </div>

    <TheButton
        v-if="itemData.url"
        class="relative a-md:hidden mt-4 w-full relative !text-base !leading-5"
        size="md"
        theme="default-bg-accent"
        target="_blank"
        :href="itemData.url"
    >
        Основной сайт
    </TheButton>
</template>
