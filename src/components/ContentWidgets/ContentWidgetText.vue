<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import Typograph from '~/components/Typograph.vue'

type ContentWidgetTextData = ContentWidgetBase<{
    text: string;
}>

const props = defineProps<{
    block: ContentWidgetTextData;
    withContainer?: boolean;
}>()
const text = computed(() => props.block.text || '')
</script>
<template>
    <Typograph
        v-if="text"
        :html="text"
        :class="{ 'container': withContainer }"
    />
</template>
