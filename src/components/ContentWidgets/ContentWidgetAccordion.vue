<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import ContentWidgetFactory from '~/components/ContentWidgets/ContentWidgetFactory'
import DisclosureItem from '~/components/Disclosure/DisclosureItem.vue'

interface ContentWidgetAccordionItem {
    id: number;
    title: string;
    content: ContentWidgetBase[]
}

type ContentWidgetAccordion = ContentWidgetBase<{
    items: ContentWidgetAccordionItem[];
}>

const props = defineProps<{
    block: ContentWidgetAccordion;
    withContainer?: boolean;
}>()

const items = computed(() => {
    return (props.block?.items && Array.isArray(props.block.items) ? props.block.items : []).filter((item) => item.content?.length).filter(item => item.content?.length)
})

const openedItems = ref<number | null>(null)
</script>
<template>
    <div
        :class="{
            'container': withContainer,
            'flex flex-col gap-6 sm:gap-4': true,
        }"
    >
        <DisclosureItem
            v-for="item in items"
            :key="item.id"
            v-model:value="openedItems"
            :current-value="item.id"
            theme="rounded"
        >
            <template #title>
                {{ item.title }}
            </template>

            <ContentWidgetFactory
                v-if="item.content"
                :widgets="item.content"
                :with-container="false"
                :class-names="{
                    root: 'grid grid-cols-12 gap-y-14'
                }"
            />
        </DisclosureItem>
    </div>
</template>
