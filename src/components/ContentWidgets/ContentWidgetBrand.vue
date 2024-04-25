<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import BrandCard from '~/components/BrandCard.vue'

interface ContentWidgetCompanyData extends ContentWidgetBase {
    data: {
        image: string; // Изображение
        title: string; // Заголовок виджета (текст внутри самого виджета, расположен по центру);
        text: string; // Текст виджета (над заголовком внутри самого виджета);
        url: string; // Ссылку-переход при нажатии на виджет.
    }
}

const props = defineProps<{
    block: ContentWidgetCompanyData;
    withContainer?: boolean;
}>()

</script>
<template>
    <div :class="{ 'container': withContainer }">
        <BrandCard :brand-data="props.block.data" />
    </div>
</template>
