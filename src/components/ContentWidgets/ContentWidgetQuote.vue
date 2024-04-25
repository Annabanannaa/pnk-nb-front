<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import Quote from '~/components/Quote.vue'

interface ContentWidgetQuoteData extends ContentWidgetBase {
    data: {
        title: string; // Заголовок виджета (текст внутри самого виджета, расположен по центру);
        text: string; // Текст виджета (над заголовком внутри самого виджета);
    }
}

const props = defineProps<{
    block: ContentWidgetQuoteData;
    withContainer?: boolean;
}>()

</script>
<template>
    <div :class="{ 'container': withContainer }">
        <Quote :quote-data="props.block.data" />
    </div>
</template>
