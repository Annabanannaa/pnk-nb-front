<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import ServiceCard from '~/components/ServiceCard.vue'
import TheButton from '~/components/Buttons/TheButton.vue'

interface ContentWidgetServicesItem {
    id: number;
    title: string;
    icon: string;
    theme: string;
    link: string;
    content: ContentWidgetBase[]
}

const props = defineProps<{
    servicesData: {
        title: string;
        showDetailButton: boolean;
        items: ContentWidgetServicesItem[];
    };
}>()


const getCardClassesByIndex = (index: number) => {
    if (props.servicesData.items.length <= 4 ) {
        return 'a-lg:flex-4'
    } else if (props.servicesData.items.length <= 6 || props.servicesData.items.length === 9 || props.servicesData.items.length === 8) {
        return 'a-lg:flex-3'
    } else if (props.servicesData.items.length === 7) {
        if (index < 3) {
            return 'a-lg:flex-3'
        } else {
            return 'a-lg:flex-4'
        }
    } else if (props.servicesData.items.length === 10) {
        if (index < 3) {
            return 'a-lg:flex-3'
        } else {
            return 'a-lg:flex-4'
        }
    }
    return 'a-lg:flex-4'
}

const getCardSize = (index: number) => {
    if (props.servicesData.items.length === 4 ) {
        return 'small'
    } else if (props.servicesData.items.length === 7) {
        if (index > 3) {
            return 'small'
        }
    } else if (props.servicesData.items.length === 10) {
        if (index > 3 && index < 8 ) {
            return 'small'
        }
    }

    return ''
}
</script>

<template>
    <div class="space-y-11 md:space-y-4">
        <div class="flex md:block justify-between items-center">
            <p class="text-3.5xl md:text-2xl md:mb-4">
                {{ servicesData.title }}
            </p>
            <TheButton v-if="servicesData.showDetailButton" href="/" size="md" class="md:w-full" theme="default-bg-accent">
                Посмотреть все услуги
            </TheButton>
        </div>

        <div class="w-full flex a-xs:flex-row flex-col gap-x-6 gap-y-12 md:gap-4 flex-wrap">
            <ServiceCard
                v-for="(item, index) in servicesData.items"
                :key="item.id"
                :size="getCardSize(index)"
                :class="getCardClassesByIndex(index)"
                :item-data="item"
                class="a-md:flex-3 a-xs:flex-2"
            />
        </div>
    </div>
</template>
