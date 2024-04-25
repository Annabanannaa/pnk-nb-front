<script  lang="ts" setup>
import type { OfficePage } from '~/schemas/Offices'
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import type { BreadcrumbsItem } from '~/schemas/Breadcrumbs'

import OfficeHeader from '~/components/OfficeHeader.vue'
import ManagerCard from '~/components/ManagerCard.vue'
import ContentWidgetFactory from '~/components/ContentWidgets/ContentWidgetFactory'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

definePageMeta({ layout: 'office' })

const contentWidget = ref<ContentWidgetBase[]>([
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'services',
        block_size: 12,
        data: {
            title: 'Наши услуги',
            showDetailButton: true,
            url: '/',
            items: [
                {
                    id: Math.ceil(Math.random() * 1000),
                    theme: 'gears',
                    icon: '/images/pnk.svg',
                    link: 'https://creonit.ru/',
                    title: 'Консультирование по налогообложению и валютному законодательству'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    theme: 'circles',
                    icon: '/images/03.svg',
                    link: 'https://creonit.ru/',
                    title: 'Выбор системы налогообложения'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    icon: '/images/03.svg',
                    theme: 'waves',
                    link: 'https://creonit.ru/',
                    title: 'Услуга 3'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    icon: '/images/03.svg',
                    theme: 'waves2',
                    link: 'https://creonit.ru/',
                    title: 'Услуга 4'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    icon: '/images/03.svg',
                    theme: 'circles2',
                    link: 'https://creonit.ru/',
                    title: 'Услуга 5'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    theme: 'lines',
                    icon: '/images/03.svg',
                    title: 'Услуга 6'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    icon: '',
                    link: '',
                    theme: 'waves3',
                    title: 'Услуга 7'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    icon: '',
                    theme: 'dotted-line',
                    link: 'https://creonit.ru/',
                    title: 'Услуга 8'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    icon: '',
                    theme: 'lines2',
                    link: 'https://creonit.ru/',
                    title: 'Услуга 9'
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    icon: '',
                    theme: 'lines3',
                    link: 'https://creonit.ru/',
                    title: 'Услуга 10'
                }
            ]
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'text',
        block_size: 12,
        text: `
            <h2>Блок для текстового контента</h2>
            <ol>
                <li>Регистрация налогоплательщиков: офисы налогового бюро занимаются регистрацией новых налогоплательщиков, включая индивидуальных предпринимателей, юридические лица и физических лиц, обязанных уплачивать налоги.</li>
                <li>Сбор и анализ налоговых деклараций: офисы принимают и проводят проверку налоговых деклараций, представляемых налогоплательщиками. Они обрабатывают информацию, используют автоматизированные системы для анализа деклараций и проверки достоверности предоставленных данных.</li>
                <li>Определение налоговых обязательств: на основе анализа деклараций и других документов, офисы налогового бюро определяют налоговые обязательства налогоплательщика. Они могут высылать уведомления о налоговых платежах и устанавливать сроки оплаты.</li>
            </ol>

        `
    }
])

const route = useRoute()

const { data: pageData, error } = await useApiFetch<OfficePage>(`/api/offices/${route.params.officeId[0]}`)

const type = computed<string>(() => pageData.value?.type || '')

const infoManager = {
    id: 1,
    name: 'Загорулько Ирина Петровна',
    position: 'Руководитель Управляющего совета',
    description: 'Член Научно-экспертного совета Союза «ПНК». Обеспечивает работу с налогоплательщиками и с аттестованными налоговыми консультантами, а также организационно-методологическое сопровождение работы офисов Налогового бюро',
    img: '/images/office/manager.png'
}

const breadcrumbsBase = ref<BreadcrumbsItem[]>([
    {
        title: 'Главная',
        link: '/'
    },
    {
        title: 'Реестр офисов',
        link: '/office/'
    }
])


const breadcrumbs = computed<BreadcrumbsItem[]>(() => {
    const result = [
        ...breadcrumbsBase.value
    ]

    if (type.value === 'regional' || type.value === 'main') {
        result.push(
            {
                title: 'Региональные офисы',
                link: '/office/regional/'
            }
        )

        if (pageData.value?.city) {
            result.push(
                {
                    title: pageData.value?.city?.name,
                    link: ''
                }
            )
        }
    }
    if (type.value === 'specialized') {
        result.push(
            {
                title: 'Специализированные офисы',
                link: '/office/specialized/'
            }
        )
    }
    if (type.value === 'industry') {
        result.push(
            {
                title: 'Отраслевые офисы',
                link: '/office/industry/'
            }
        )
    }

    return result
})


</script>

<template>
    <div>
        <OfficeHeader :type="type" :city="pageData?.city?.name" :logo="pageData?.logotype" />
        <Breadcrumbs :items="breadcrumbs" />

        <div class="space-y-15 sm:space-y-4 mb-15 sm:mb-4">
            <div class="container mt-8 md:mt-4">
                <ManagerCard :item-data="infoManager" />
                <p class="mt-6 text-xs text-gray-500">
                    Офис функционирует на базе ООО "Налоговая стратегия” в соответствии с лицензионным договором № РД0403075 от 02.12.2026
                </p>
            </div>

            <ContentWidgetFactory
                :widgets="contentWidget"
            />
        </div>
    </div>
</template>
