<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import TextCards from '~/components/TextCards.vue'

interface ContentWidgetCardsItem {
    id: number;
    title: string;
    text: string;
    link: string;
    order: number;
    icon: string;
    content: ContentWidgetBase[]
}

interface ContentWidgetCardsData extends ContentWidgetBase {
    data: {
        title: string; // Заголовок виджета
        items: ContentWidgetCardsItem[]
    }
}

const props = defineProps<{
    block: ContentWidgetCardsData;
    withContainer?: boolean;
}>()

</script>
<template>
    <TextCards
        :class="{ 'container': withContainer }"
        :cards-data="props.block.data"
    />
</template>
