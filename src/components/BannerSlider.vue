<script lang="ts" setup>
import TheButton from '~/components/Buttons/TheButton.vue'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import BannerCard from '~/components/BannerCard.vue'
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'

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
const props = defineProps<{
    bannerData: {
        title: string;
        type: string;
        items: ContentWidgetCardsItem[];
    };
}>()

const prev = ref(null)
const next = ref(null)


</script>

<template>
    <swiper

        :slides-per-view="1"
        :space-between="50"
        :navigation="{
            prevEl: prev,
            nextEl: next,
        }"
        :modules="[Navigation]"
        class="relative group"
    >
        <swiper-slide
            v-for="item in bannerData.items"
            :key="item.id"
        >
            <BannerCard
                :item-data="item"
                :count-card="bannerData.items.length"
                :is-slider="true"
            />
        </swiper-slide>

        <div class="max-w-[87rem] mx-auto relative z-10">
            <div class="absolute flex gap-3 bottom-10 left-7 md:left-6 md:bottom-6 h-12">
                <div ref="prev" class="swiper-button-prev">
                    <IconsIconArrowBottom class="rotate-90" />
                </div>
                <div ref="next" class="swiper-button-next">
                    <IconsIconArrowBottom class="rotate-[270deg]" />
                </div>
            </div>
        </div>
    </swiper>
</template>
