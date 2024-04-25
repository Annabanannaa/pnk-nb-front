<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'

interface ContentWidgetCardsItem {
    id: number;
    title: string;
    text: string;
    link: string;
    order: number;
    icon: string;
    content: ContentWidgetBase[]
}

defineProps<{
    cardsData: {
        title: string;
        items: ContentWidgetCardsItem[];
    };
}>()

</script>

<template>
    <div class="space-y-11 md:space-y-4">
        <div v-if="cardsData.title" class="flex justify-between items-center">
            <p class="text-3.5xl md:text-2xl">
                {{ cardsData.title }}
            </p>
        </div>

        <div class="w-full flex flex-col gap-y-1 md:gap-4 flex-wrap px-[52px] lg:px-0">
            <TextCard
                v-for="item in cardsData.items"
                :key="item.id"
                :item-data="item"
                class=""
            />
        </div>
    </div>
</template>
