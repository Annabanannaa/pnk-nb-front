<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import Banner from '~/components/Banner.vue'

interface ContentWidgetBannerItem {
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

interface ContentWidgetBannerData extends ContentWidgetBase {
    data: {
        title: string; // Заголовок виджета
        type: string;
        items: ContentWidgetBannerItem[]
    }
}

const props = defineProps<{
    block: ContentWidgetBannerData;
}>()

</script>
<template>
    <Banner :banner-data="props.block.data" />
</template>
