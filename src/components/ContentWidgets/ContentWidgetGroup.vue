<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import ContentWidgetFactory from '~/components/ContentWidgets/ContentWidgetFactory'

type ContentWidgetTextData = ContentWidgetBase<{
    text: string;
}>

const props = defineProps<{
    block: ContentWidgetTextData;
}>()

const widgetsList = computed(() => {
    return (props.block?.children && Array.isArray(props.block.children) ? props.block.children : [])
})
</script>
<template>
    <div v-if="widgetsList.length">
        <ContentWidgetFactory
            :widgets="widgetsList"
            :class-names="{
                root: 'grid grid-cols-12 gap-y-14'
            }"
        />
    </div>
</template>
