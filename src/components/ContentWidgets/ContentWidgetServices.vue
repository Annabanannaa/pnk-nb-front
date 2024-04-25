<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import Services from '~/components/Services.vue'

interface ContentWidgetServicesItem {
    id: number;
    title: string;
    icon: string;
    theme: string;
    link: string;
    content: ContentWidgetBase[]
}

interface ContentWidgetServicesData extends ContentWidgetBase {
    data: {
        showDetailButton: boolean; // Кнопка рядом с заголовком “Посмотреть все услуги”
        title: string; // Заголовок виджета
        url: string; // Ссылку-переход при нажатии на виджет
        items: ContentWidgetServicesItem[]
    }
}

defineProps<{
    block: ContentWidgetServicesData;
    withContainer?: boolean;
}>()

</script>
<template>
    <Services
        :class="{ 'container': withContainer }"
        :services-data="block.data"
    />
</template>
