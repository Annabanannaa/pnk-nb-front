<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import ServiceCardWithActions from '~/components/ServiceCardWithActions.vue'
import SearchInput from '~/components/SearchInput.vue'
import OrderForm from '~/components/OrderForm.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

const pageTitle = ref('Creonit Nuxt3 Skeleton')

useSeoMeta({
    title: pageTitle,
    description: 'Болванка Nuxt3'
})

const content = ref<ContentWidgetBase[]>([
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'brand',
        block_size: 12,
        data: {
            image: '/images/pnk.svg',
            title: 'Союзу "Палата Налоговых Консультантов" 22 года',
            text: 'Налоговое бюро является структурным подразделением Союза "ПНК"',
            url: '#'
        },
        blocks: []
    }
])

const services = [
    {
        id: Math.ceil(Math.random() * 1000),
        name: 'Консультирование по налоговому и валютному законодательству РФ',
        tags: ['#Инвестиционные налоговые вычеты', '#3-НДФЛ'],
        link: 'https://creonit.ru/'
    },
    {
        id: Math.ceil(Math.random() * 1000),
        name: 'Выбор системы налогообложения',
        tags: ['#Инвестиционные налоговые вычеты', '#3-НДФЛ', '#Декларация по прибыли КИК' ],
        link: 'https://creonit.ru/'
    },
    {
        id: Math.ceil(Math.random() * 1000),
        name: 'Сопровождение мероприятий налогового контроля. Представительство в налоговых органах',
        tags: ['#Инвестиционные налоговые вычеты', '#3-НДФЛ', '#3-НДФЛ', '#Декларация по прибыли КИК', '#Декларация по прибыли КИК', '#Декларирование доходов по операциям с криптовалютами', '#Декларирование доходов по операциям с криптовалютами', '#Декларирование доходов по операциям с криптовалютами'],
        link: 'https://creonit.ru/'
    },
    {
        id: Math.ceil(Math.random() * 1000),
        name: 'Выбор системы налогообложения',
        tags: ['#Инвестиционные налоговые вычеты', '#3-НДФЛ'],
        link: 'https://creonit.ru/'
    }
]

const { data: pageData, error } = await useApiFetch<any>('/api/services/')

const searchString = ref<string>('')

const breadcrumbs = [
    {
        title: 'Главная',
        link: '/'
    },
    {
        title: 'Все услуги',
        link: '/services/'
    }
]

</script>

<template>
    <div class="space-y-8 md:space-y-6 mt-4 mb-8">
        <Breadcrumbs :items="breadcrumbs" />

        <div class="container space-y-15 md:space-y-6">
            <div class="flex flex-col">
                <h1 class="text-4.5xl !mt-0 md:text-2xl font-semibold leading-13 md:text-4xl mb-2 md:mb-3 text-black mb-6">
                    Все услуги
                </h1>
                <SearchInput
                    v-model:value="searchString"
                    title="Выберите услугу"
                />
            </div>

            <div role="tablist" class="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-4">
                <ServiceCardWithActions
                    v-for="service in pageData"
                    :key="service.id"
                    :item-data="service"
                />
            </div>

            <div>
                <OrderForm page="service" />
            </div>
        </div>
    </div>
</template>
