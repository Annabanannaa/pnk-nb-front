<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import ImageCard from '~/components/ImageCard.vue'

interface ContentWidgetCardData extends ContentWidgetBase {
    data: {
        image: string; // Изображение
        title: string; // Заголовок виджета (текст внутри самого виджета, расположен по центру);
        text: string; // Текст виджета (над заголовком внутри самого виджета);
        backgroundPattern: string;
        backgroundImage: string;
        url: string; // Ссылку-переход при нажатии на виджет.
    }
}

defineProps<{
    block: ContentWidgetCardData;
    withContainer?: boolean;
}>()

</script>
<template>
    <div :class="{ 'container': withContainer }">
        <ImageCard :item-data="block.data" />
    </div>
</template>
