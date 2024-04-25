<script lang="ts" setup>
import ContentWidgetFactory from '~/components/ContentWidgets/ContentWidgetFactory'

import usePageContentBlocks from '~/composables/usePageContentBlocks'

const { widgets } = await usePageContentBlocks('/')

const responseData = ref<any>([
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'text',
        block_size: 12,
        data: {
            text: `
                    <h1>Заголовок 1 уровня</h1>
                    <p>
                        <strong>Союз по организации деятельности <a href="/">консультантов</a> по налогам и сборам «Палата налоговых
                        консультантов», именуемый в дальнейшем по тексту Союз «ПНК», - некоммерческая организация,
                        созданная как объединение юридических и физических лиц, основанное на добровольном членстве и
                        созданное для представления и защиты общих, в том числе профессиональных интересов, координации
                        деятельности ее членов для достижения общественно – полезных и профессиональных целей.</strong>
                    </p>
                    <p>
                        <a href="/ui/">
                            Союз по организации деятельности консультантов по налогам и сборам «Палата налоговых
                            консультантов», именуемый в дальнейшем по тексту Союз «ПНК», - некоммерческая организация,
                            созданная как объединение юридических и физических лиц, основанное на добровольном членстве
                            и созданное для представления и защиты общих, в том числе профессиональных интересов,
                            координации деятельности ее членов для достижения общественно – полезных и
                            профессиональных целей.
                        </a>
                    </p>
                    <p>
                        Союз по организации деятельности консультантов по налогам и сборам «Палата налоговых консультантов»,
                        именуемый в дальнейшем по тексту Союз «ПНК», - некоммерческая организация, созданная как
                        объединение юридических и физических лиц, основанное на добровольном членстве и созданное для
                        представления и защиты общих, в том числе профессиональных интересов, координации деятельности
                        ее членов для достижения общественно – полезных и профессиональных целей.
                    </p>
                    <p>
                        Союз по организации деятельности консультантов по налогам и сборам «Палата налоговых консультантов»,
                        именуемый в дальнейшем по тексту Союз «ПНК», - некоммерческая организация, созданная как
                        объединение юридических и физических лиц, основанное на добровольном членстве и созданное для
                        представления и защиты общих, в том числе профессиональных интересов, координации деятельности
                        ее членов для достижения общественно – полезных и профессиональных целей.
                    </p>
                    <h2>Заголовок 2 уровня</h2>
                    <p>
                        Союз по организации деятельности консультантов по налогам и сборам «Палата налоговых консультантов»,
                        именуемый в дальнейшем по тексту Союз «ПНК», - некоммерческая организация, созданная как
                        объединение юридических и физических лиц, основанное на добровольном членстве и созданное для
                        представления и защиты общих, в том числе профессиональных интересов, координации деятельности ее
                        членов для достижения общественно – полезных и профессиональных целей.
                    </p>
                    <h3>Заголовок 3 уровня</h3>
                    <p>
                        Союз по организации деятельности консультантов по налогам и сборам «Палата налоговых консультантов»,
                        именуемый в дальнейшем по тексту Союз «ПНК», - некоммерческая организация, созданная как
                        объединение юридических и физических лиц, основанное на добровольном членстве и созданное
                        для представления и защиты общих, в том числе профессиональных интересов, координации
                        деятельности ее членов для достижения общественно – полезных и профессиональных целей.
                    </p>
                    <h4>Заголовок 4 уровня</h4>
                    <ol>
                        <li>
                            Регистрация налогоплательщиков: офисы налогового бюро занимаются регистрацией новых
                            налогоплательщиков, включая индивидуальных предпринимателей, юридические лица и
                            физических лиц, обязанных уплачивать налоги.
                             <ol>
                                <li>ol </li>
                                <li>ol</li>
                                <li>ol</li>
                            </ol>
                        </li>
                        <li>
                            Сбор и анализ налоговых деклараций: офисы принимают и проводят проверку налоговых
                            деклараций, представляемых налогоплательщиками. Они обрабатывают информацию, используют
                            автоматизированные системы для анализа деклараций и проверки
                            достоверности предоставленных данных.
                        </li>
                        <li>
                            Определение налоговых обязательств: на основе анализа деклараций и других документов,
                            офисы налогового бюро определяют налоговые обязательства налогоплательщика. Они могут
                            высылать уведомления о налоговых платежах и устанавливать сроки оплаты.
                        </li>
                    </ol>
                    <h4>Заголовок 4 уровня</h4>
                    <ul>
                        <li>
                            Регистрация налогоплательщиков: офисы налогового бюро занимаются регистрацией новых
                            налогоплательщиков, включая индивидуальных предпринимателей, юридические лица и физических
                            лиц, обязанных уплачивать налоги.
                            <ul>
                                <li>ul</li>
                                <li>ul</li>
                                <li>ul</li>
                            </ul>
                        </li>
                        <li>
                            Сбор и анализ налоговых деклараций: офисы принимают и проводят проверку налоговых деклараций,
                            представляемых налогоплательщиками. Они обрабатывают информацию, используют автоматизированные
                            системы для анализа деклараций и проверки достоверности предоставленных данных.
                        </li>
                        <li>
                            Определение налоговых обязательств: на основе анализа деклараций и других документов,
                            офисы налогового бюро определяют налоговые обязательства налогоплательщика. Они могут
                            высылать уведомления о налоговых платежах и устанавливать сроки оплаты.
                        </li>
                    </ul>
                `
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'quote',
        block_size: 12,
        data: {
            title: 'Цитата',
            text: '<p>Квалификационный аттестат «Консультант по налогам и сборам», сопряженный с включением в Единый реестр аттестованных налоговых консультантов, членов Союза «ПНК», является маркером для крупнейших работодателей России.</p> <p>Принимаем заявки на организацию и проведение корпоративных мероприятий</p>'
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'brand',
        block_size: 12,
        data: {
            image: '/images/pnk.svg',
            title: 'Союзу "Палата Налоговых Консультантов" 22 года',
            text: 'Налоговое бюро является структурным подразделением Союза "ПНК"',
            url: '#'
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'group',
        block_size: 12,
        blocks: [
            {
                id: Math.ceil(Math.random() * 1000),
                block_type: 'text',
                block_size: 4,
                data: {
                    text: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam facilis non repellendus soluta voluptas?</p>'
                }

            },
            {
                id: Math.ceil(Math.random() * 1000),
                block_type: 'text',
                block_size: 4,
                data: {
                    text: '<p>Accusamus ad adipisci atque ea, inventore perspiciatis rem rerum sunt. Assumenda consequuntur sapiente tempore vero vitae!</p>'
                }

            },
            {
                id: Math.ceil(Math.random() * 1000),
                block_type: 'text',
                block_size: 4,
                data: {
                    text: '<p>Accusamus ad adipisci atque ea, inventore perspiciatis rem rerum sunt. Assumenda consequuntur sapiente tempore vero vitae!</p>'
                }

            }
        ]
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
        block_type: 'textCards',
        block_size: 12,
        data: {
            title: 'Карточки с текстом',
            items: [
                {
                    id: Math.ceil(Math.random() * 1000),
                    title: 'Специализированные офисы Налогового бюро', // Заголовок карточки
                    text: '<p>Оказывают широкий спектр услуг: Банкротство, налоговую экспертизу, международное налогообложение и бухгалтерское сопровождение.</p>',
                    icon: 'tax', // лучше сделать выбор из справочника
                    link: '#',
                    order: 2 // порядок сортировки
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    title: 'Региональные офисы Налогового бюро', // Заголовок карточки
                    text: '<p>Оказывают услугу с учетом льгот, ставок и цен региона</p>',
                    icon: 'tax2', // лучше сделать выбор из справочника
                    link: '#',
                    order: 1 // порядок сортировки
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    title: 'Карточка 3', // Заголовок карточки
                    text: '<p>Accusamus ad adipisci atque ea, inventore perspiciatis rem rerum sunt. Assumenda consequuntur sapiente tempore vero vitae!</p>',
                    icon: 'tax', // лучше сделать выбор из справочника
                    link: '#',
                    order: 3 // порядок сортировки
                }
            ]
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'banner',
        block_size: 12,
        data: {
            title: 'Баннер grid',
            type: 'grid', // 'grid' | 'slider'
            items: [
                {
                    id: Math.ceil(Math.random() * 1000),
                    backgroundTheme: 'light', // 'light' | 'dark'
                    backgroundPattern: 'ellipse', // Выбор через справочника
                    backgroundImage: 'file', // Выбор через справочника
                    url: 'https://creonit.ru/', // необязательно
                    title: 'Упрощенное восстановление квалификационных аттестатов «Консультант по налогам и сборам»', // Заголовок карточки
                    text: 'Юбилейная акция, до 31.12.2023', // Необязательно
                    order: 1 // порядок сортировки
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    backgroundTheme: 'dark', // 'light' | 'dark'
                    backgroundPattern: 'gears', // Выбор через справочника
                    backgroundImage: 'calendar', // Выбор через справочника
                    url: 'https://creonit.ru/', // необязательно
                    title: '15 ноября — Общее собрание членов союза «ПНК»‎ и предновогодний корпоратив', // Заголовок карточки
                    text: 'Встречаемся в конгресс — отеле «Альфа—Измайлово»', // Необязательно
                    order: 2 // порядок сортировки
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    backgroundTheme: 'light', // 'light' | 'dark'
                    backgroundPattern: 'star', // Выбор через справочника
                    backgroundImage: 'book', // Выбор через справочника
                    url: 'https://creonit.ru/', // необязательно
                    title: 'Заголовок слайда3', // Заголовок карточки
                    text: 'Встречаемся в конгресс — отеле «Альфа—Измайлово»', // Необязательно
                    order: 3 // порядок сортировки
                }
            ]
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'banner',
        block_size: 12,
        data: {
            title: 'Баннер slider',
            type: 'slider', // 'grid' | 'slider'
            items: [
                {
                    id: Math.ceil(Math.random() * 1000),
                    backgroundTheme: 'light', // 'light' | 'dark'
                    backgroundPattern: 'ellipse', // Выбор через справочника
                    backgroundImage: 'file', // Выбор через справочника
                    url: 'https://creonit.ru/', // необязательно
                    title: 'Упрощенное восстановление квалификационных аттестатов «Консультант по налогам и сборам»', // Заголовок карточки
                    text: 'Юбилейная акция, до 31.12.2023', // Необязательно
                    order: 1 // порядок сортировки
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    backgroundTheme: 'dark', // 'light' | 'dark'
                    backgroundPattern: 'gears', // Выбор через справочника
                    backgroundImage: 'calendar', // Выбор через справочника
                    url: 'https://creonit.ru/', // необязательно
                    title: 'Заголовок слайда6', // Заголовок карточки
                    text: 'Accusamus ad adipisci atque ea, inventore perspiciatis rem rerum sunt. Assumenda consequuntur sapiente tempore vero vitae!', // Необязательно
                    order: 2 // порядок сортировки
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    backgroundTheme: 'light', // 'light' | 'dark'
                    backgroundPattern: 'star', // Выбор через справочника
                    backgroundImage: 'book', // Выбор через справочника
                    url: 'https://creonit.ru/', // необязательно
                    title: 'Заголовок слайда21', // Заголовок карточки
                    text: 'Встречаемся в конгресс — отеле «Альфа—Измайлово»', // Необязательно
                    order: 3 // порядок сортировки
                }
            ]
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'imageCard',
        block_size: 12,
        data: {
            title: 'Мероприятия Союза «ПНК»',
            backgroundPattern: 'gear', // Выбор из справочника
            backgroundImage: 'calendar2', // Выбор из справочника
            url: 'https://creonit.ru/', // Выбор из справочника
            text: '<p>По актуальным вопросам налогового законодательства</p> <p>Принимаем заявки на организацию и проведение корпоративных мероприятий</p>'
        }
    },
    {
        id: Math.ceil(Math.random() * 1000),
        block_type: 'accordion',
        block_size: 12,
        data: {
            items: [
                {
                    id: Math.ceil(Math.random() * 1000),
                    title: 'Заголовок аккордеона', // Заголовок аккордеона
                    /** Любые вджеты */
                    content: [
                        {
                            id: Math.ceil(Math.random() * 1000),
                            block_type: 'text', /** Тип виджета */
                            block_size: 12, /** Размер ширины виджета - от 1 до 12 */
                            data: {
                                text: '<p>Контент аккордиона как текстовый виджет</p>' /** [HTML] Текст */
                            }
                        }
                    ]
                },
                {
                    id: Math.ceil(Math.random() * 1000),
                    title: 'Второй элемент', // Заголовок аккордеона
                    /** Любые вджеты */
                    content: [
                        {
                            id: Math.ceil(Math.random() * 1000),
                            block_type: 'text', /** Тип виджета */
                            block_size: 12, /** Размер ширины виджета - от 1 до 12 */
                            data: {
                                text: '<p>Контент второго элемента аккордиона как текстовый виджет</p>' /** [HTML] Текст */
                            }
                        }
                    ]
                }
            ]
        }
    },
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
    }
])

</script>
<template>
    <div class="my-15 space-y-15 md:space-y-6">
        <div class="">
            <h1 class="text-4.5xl font-semibold leading-13 md:text-4xl mb-2 md:mb-3 text-center text-black">
                Test
            </h1>
        </div>
        <div class="space-y-4">
            <ContentWidgetFactory
                :widgets="responseData"
            />
        </div>
    </div>
</template>
