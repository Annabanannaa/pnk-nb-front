<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'

import BannerCard from '~/components/BannerCard.vue'
import BannerSlider from '~/components/BannerSlider.vue'

interface ContentWidgetCardsItem {
    id: number;
    title: string;
    text: string;
    order: string;
    url: string;
    backgroundTheme: string;
    backgroundImage: string;
    backgroundPattern: string;
    content: ContentWidgetBase[]
}

defineProps<{
    bannerData: {
        title: string;
        type: string;
        items: ContentWidgetCardsItem[];
    };
}>()

const { isMobileOrTablet } = useDevice()
const isMobileOrTabletScreen = ref(false)

const onResize = () => {
    isMobileOrTabletScreen.value = window.innerWidth < 1001
}

onMounted(() => {
    window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})

</script>

<template>
    <div class="space-y-11">
        <div v-if="bannerData.title" class="container flex justify-between items-center">
            <p class="text-3.5xl">
                {{ bannerData.title }}
            </p>
        </div>

        <div
            v-if="bannerData.type === 'grid' && (!isMobileOrTablet || !isMobileOrTabletScreen)"
            class="w-full max-w-[1660px] mx-auto grid grid-cols-auto-fit md:grid-cols-1 gap-y-1 md:gap-4"
        >
            <BannerCard
                v-for="item in bannerData.items"
                :key="item.id"
                :item-data="item"
                :count-card="bannerData.items.length"
            />
        </div>

        <BannerSlider v-else class="relative group" :banner-data="bannerData" />
    </div>
</template>
