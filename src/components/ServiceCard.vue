<script lang="ts" setup>
import TheButton from '~/components/Buttons/TheButton.vue'
const props = defineProps<{
    itemData: {
        id: number;
        title: string;
        theme: string;
        link: string;
        icon: string;
    };

    size: string;
}>()

type ImagesThemeItem = {
    imgOne: string;
    classOne: string;
    imgTwo: string;
    classTwo: string;
}

const imagesByTheme: Record<string, ImagesThemeItem> = {
    gears: {
        'imgOne': 'gears.svg',
        'classOne': props.size === 'small' ? '-right-3 -top-3' : '',
        'imgTwo': 'gears2.svg',
        'classTwo': ''
    },
    circles: {
        'imgOne': 'circles.svg',
        'classOne': '',
        'imgTwo': 'circles_2.svg',
        'classTwo': ''
    },
    waves: {
        'imgOne': 'waves.svg',
        'classOne': '',
        'imgTwo': 'waves_2.svg',
        'classTwo': ''
    },
    waves2: {
        'imgOne': 'waves2.svg',
        'classOne': '',
        'imgTwo': 'waves2_2.svg',
        'classTwo': ''
    },
    circles2: {
        'imgOne': 'circles2.svg',
        'classOne': '',
        'imgTwo': 'circles2_2.svg',
        'classTwo': ''
    },
    lines: {
        'imgOne': 'lines.svg',
        'classOne': props.size === 'small' ? '-right-3 -top-2' : '',
        'imgTwo': 'lines_2.svg',
        'classTwo': ''
    },
    waves3: {
        'imgOne': 'waves3.svg',
        'classOne': '',
        'imgTwo': 'waves3_2.svg',
        'classTwo': ''
    },
    'dotted-line': {
        'imgOne': 'dotted-line.svg',
        'classOne': '',
        'imgTwo': 'dotted-line_2.svg',
        'classTwo': ''
    },
    lines2: {
        'imgOne': 'lines2.svg',
        'classOne': '',
        'imgTwo': 'lines2_2.svg',
        'classTwo': ''
    },
    lines3: {
        'imgOne': 'lines3.svg',
        'classOne': 'right-4',
        'imgTwo': 'lines3_2.svg',
        'classTwo': 'left-4'
    }
}
const hoverTemplate = computed(() => {
    return imagesByTheme[props.itemData.theme || 'waves']
})
</script>

<template>
    <div
        class="relative group flex flex-col p-7 md:px-4 md:py-6 rounded-4.5xl bg-white shadow-card min-h-[264px] md:min-h-[182px] transition-all overflow-hidden border-b-[6px] lg:border-0 border-white hover:border-blue-600"
    >
        <NuxtLink :to="itemData.link" class="absolute a-md:hidden inset-0 z-10" />

        <div class="absolute inset-0 lg:hidden transition-opacity opacity-0 group-hover:opacity-100 bg-blue-520" />
        <img
            :class="hoverTemplate.classOne"
            class="absolute top-0 right-0 lg:hidden pointer-events-none opacity-0 transition-opacity group-hover:opacity-100 "
            :src="`/images/service/${ hoverTemplate.imgOne }`"
            :alt="hoverTemplate.imgOne"
        >
        <img
            :class="hoverTemplate.classTwo"
            class="absolute bottom-0 left-0 lg:hidden pointer-events-none opacity-0 transition-opacity group-hover:opacity-100 "
            :src="`/images/service/${ hoverTemplate.imgTwo }`"
            :alt="hoverTemplate.imgTwo"
        >
        <div class="relative z-10">
            <TheButton
                class="!absolute lg:hidden right-full h-18 w-max !px-7 md:hidden text-lg transition-opacity transition-transform transition-[right] duration-500 group-hover:right-1/2 group-hover:translate-x-1/2"
                theme="rounded-white"
            >
                <NuxtLink :to="itemData.link" class="absolute inset-0 z-10" />

                Заказать услугу
            </TheButton>
            <div class="relative left-0 flex items-center justify-center p-2 w-18 min-w-18 md:w-11 h-18 min-h-18 md:h-11 md:min-h-11 md:min-w-11 mx-auto mb-8 md:mb-3 rounded-full shadow-card bg-white transition-opacity transition-transform transition-[left] duration-500 group-hover:left-full lg:group-hover:left-0">
                <img class="mx-auto my-auto" :src="itemData.icon">
            </div>
        </div>


        <div class="relative h-full flex items-center justify-center flex-auto">
            <p class="text-lg text-blue-600 text-center my-auto group-hover:text-white lg:group-hover:text-blue-600 font-medium">
                {{ itemData.title }}
            </p>
        </div>
    </div>
</template>
