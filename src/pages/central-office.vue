<script  lang="ts" setup>
import ContentWidgetFactory from '~/components/ContentWidgets/ContentWidgetFactory'
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import ManagerCard from '~/components/ManagerCard.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

const contentWidget = ref<ContentWidgetBase[]>([
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'officeContacts',
        block_size: 12,
        data: {
            address: '105064, город Москва, метро Курская, улица Земляной Вал, дом 4, строение 1',
            addressMapLink: 'https://ya.ru/maps',
            phones: [
                '+7 495 380‑41‑61',
                '+7 903 618-19-10'
            ],
            emails: [
                'nalog-buro@palata-nk.ru'
            ],
            workingHours: 'пн-пт 9:30-18:30'
        }
    },
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
            <h2>О центральном офисе</h2>
            <ol>
                <li>Регистрация налогоплательщиков: офисы налогового бюро занимаются регистрацией новых налогоплательщиков, включая индивидуальных предпринимателей, юридические лица и физических лиц, обязанных уплачивать налоги.</li>
                <li>Сбор и анализ налоговых деклараций: офисы принимают и проводят проверку налоговых деклараций, представляемых налогоплательщиками. Они обрабатывают информацию, используют автоматизированные системы для анализа деклараций и проверки достоверности предоставленных данных.</li>
                <li>Определение налоговых обязательств: на основе анализа деклараций и других документов, офисы налогового бюро определяют налоговые обязательства налогоплательщика. Они могут высылать уведомления о налоговых платежах и устанавливать сроки оплаты.</li>
            </ol>

        `
    }
])

const infoPage = {
    title: 'Центральный офис Налогового Бюро',
    description: 'Союз по организации деятельности консультантов по налогам и сборам «Палата налоговых консультантов» — единственное профессиональное сообщество, объединяющее налоговых консультантов на всей территории РФ и представляющее интересы профессионалов в сфере налогового консультирования на международной арене: член CFE с 2008 г. ; партнерские отношения с АОТСА (объединение налоговых консультантов Азиатско-Тихоокеанского региона) установлены в 2011 г.; в постоянных профессиональных отношениях с Киргизией, Казахстаном и Белоруссией. ',
    manager: [
        {
            id: 1,
            name: 'Картошкин Александр Евгениевич',
            position: 'Руководитель Управляющего совета',
            description: 'Член Правления Союза «ПНК», обеспечивает консультационную и организационно-методическую работу офисов Налогового бюро Союза «ПНК»',
            img: '/images/office/manager1.png'
        },
        {
            id: 2,
            name: 'Загорулько Ирина Петровна',
            position: 'Руководитель Налогового бюро',
            description: 'Член Научно-экспертного совета Союза «ПНК». Обеспечивает работу с налогоплательщиками и с аттестованными налоговыми консультантами, а также организационно-методологическое сопровождение работы офисов Налогового бюро',
            img: '/images/office/manager2.png'
        }
    ]
}

const breadcrumbs = [
    {
        title: 'Главная',
        link: '/'
    },
    {
        title: 'Центральный офис',
        link: '/central-office/'
    }
]


</script>
<template>
    <div class="mb-15 md:mb-6">
        <Breadcrumbs :items="breadcrumbs" />

        <div class="container">
            <h1 class="title-h1">
                {{ infoPage.title }}
            </h1>
            <p v-if="infoPage.description" class="mt-4.5 text-gray-800">
                {{ infoPage.description }}
            </p>

            <div class="grid grid-cols-2 md:grid-cols-1 gap-6 mt-15 mb-6 md:mt-6">
                <ManagerCard
                    v-for="item in infoPage.manager"
                    :key="item.id"
                    :item-data="item"
                    :is-small="true"
                />
            </div>
        </div>

        <ContentWidgetFactory
            class="md:mb-4 space-y-15 md:space-y-6"
            :widgets="contentWidget"
        />
    </div>
</template>
