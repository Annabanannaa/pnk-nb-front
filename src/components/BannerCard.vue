<script lang="ts" setup>

const props = defineProps<{
    itemData: {
        id: number;
        title: string;
        text: string;
        order: string;
        url: string;
        backgroundImage: string;
        backgroundTheme: string;
        backgroundPattern: string;
    },
    countCard: number;
    isSlider?: boolean;
}>()

const isThemeLight = ref(true)

const getBackgroundTheme = (theme: string) => {
    if (theme === 'light') {
        return 'bg-blue-50'
    } else {
        isThemeLight.value = false
        return 'bg-blue-200 text-white'
    }
}


const customClass = computed(() => {
    if (props.countCard === 2 && !props.isSlider) {
        return {
            'title': '',
            'img': 'max-h-[10.25rem]',
            'imgPattern': 'max-h-56',
            'wrap': 'py-10 px-7 h-[28.5rem]'
        }
    } if (props.countCard === 3 && !props.isSlider) {
        return {
            'title': '',
            'img': 'max-h-36',
            'imgPattern': '',
            'wrap': 'p-7 h-[28.5rem]'
        }
    } else {
        return {
            'title': 'text-4xl',
            'img': 'max-h-56 bottom-[14px]',
            'imgPattern': 'h-full md:h-auto -right-6 max-h-[20.5rem] xs:max-w-[220px] xs:-right-5',
            'wrap': 'pr-15 pl-7 py-10 h-[26.625rem]'
        }
    }
})

</script>

<template>
    <div
        :style="`order: ${itemData.order}`"
        :class="`${getBackgroundTheme(itemData.backgroundTheme)} ${customClass.wrap}`"
        class="relative group block md:p-6 md:h-full md:min-h-[26.625rem] overflow-hidden"
    >
        <div v-if="isThemeLight" class="absolute inset-0 bg-gradient-light-blue transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none group-focus:opacity-100 group-focus-visible:opacity-100" />
        <div v-else class="absolute inset-0 bg-gradient-dark-blue transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none group-focus:opacity-100 group-focus-visible:opacity-100" />

        <NuxtLink :to="itemData.url" class="absolute inset-0 z-10" />

        <div class="relative max-w-[81.25rem] w-full mx-auto flex flex-col gap-4">
            <p
                v-if="itemData.title"
                :class="customClass.title"
                class="text-1.5xl font-medium md:text-1.5xl max-w-4xl leading-11 md:leading-8"
            >
                {{ itemData.title }}
            </p>
            <p
                v-if="itemData.text"
                :class="isThemeLight ? 'text-blue-180 group-hover:text-blue-500' : 'opacity-65'"
                class="line-clamp-3 max-w-4xl font-medium"
            >
                {{ itemData.text }}
            </p>
        </div>

        <img
            v-if="itemData.backgroundImage"
            :class="customClass.img"
            class="absolute bottom-[11px] md:bottom-5 right-7 z-10 mt-auto ml-auto pointer-events-none sm:max-h-[131px] xs:max-w-[121px]"
            :src="'/images/' + itemData.backgroundImage + '.svg'"
            alt=""
        >
        <img
            v-if="itemData.backgroundPattern"
            :class="customClass.imgPattern"
            class="absolute bottom-0 -right-4 md:right-0 pointer-events-none"
            :src="'/images/' + itemData.backgroundPattern + '.svg'"
        >
    </div>
</template>
