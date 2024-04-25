<script lang="ts" setup>
import FooterMenuBlock from '~/components/FooterMenuBlock.vue'
import { fetchMenuByCode, normalizeMenuResponse } from '~/helpers/menu'

const fetchFooter = async () => {
    const services = fetchMenuByCode('footer-menu-services')
    const about = fetchMenuByCode('footer-menu-about')
    const offices = fetchMenuByCode('footer-menu-offices')
    const resources = fetchMenuByCode('footer-menu-resources')
    const bottomMenu = fetchMenuByCode('footer-menu-bottom')

    await Promise.all([
        services,
        about,
        offices,
        resources,
        bottomMenu
    ])

    return {
        services: normalizeMenuResponse(services),
        about: normalizeMenuResponse(about),
        offices: normalizeMenuResponse(offices),
        resources: normalizeMenuResponse(resources),
        bottomMenu: normalizeMenuResponse(bottomMenu)
    }
}

const {
    services,
    about,
    offices,
    resources,
    bottomMenu
} = await fetchFooter()


const contacts = {
    id: Math.ceil(Math.random() * 1000),
    type: 'officeContacts',
    size: 12,
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
        workingHours: 'По будням 09:30 – 18:30, время МСК'
    }
}
const socials = [
    {
        type: 'vk',
        link: '#'
    },
    {
        type: 'telegram',
        link: '#'
    },
    {
        type: 'youtube',
        link: '#'
    }
]
</script>
<template>
    <div class="border-t border-gray-100">
        <div class="container mt-9">
            <div class="flex sm:flex-col gap-14 lg:gap-6">
                <TheLogo class="fill-current w-[10.3125rem] h-[2.6875rem]" />
                <div class="w-full border-b border-gray-100 xs:border-b-0">
                    <div class="grid grid-cols-footer-row md:grid-cols-2 xs:grid-cols-1 md:gap-6 w-full pb-6 border-b border-gray-100">
                        <div class="space-y-3">
                            <p class="font-semibold text-sm">
                                Адрес
                            </p>
                            <p class="max-w-[19.125rem] text-sm">
                                {{ contacts.data.address }}
                            </p>
                            <p class="max-w-[19.125rem] text-sm">
                                {{ contacts.data.workingHours }}
                            </p>
                        </div>
                        <div class="space-y-3">
                            <p class="font-semibold text-sm">
                                Телефон
                            </p>
                            <a class="block text-sm" :href="'tel:' + contacts.data.phones[0]">
                                {{ contacts.data.phones[0] }}
                            </a>
                        </div>
                        <div class="space-y-3">
                            <p class="font-semibold text-sm">
                                E-mail
                            </p>
                            <a class="block text-sm" :href="'mailto:' + contacts.data.emails[0]">
                                {{ contacts.data.emails[0] }}
                            </a>
                        </div>
                    </div>

                    <div class="grid grid-cols-footer-row md:grid-cols-2 xs:grid-cols-1 md:gap-6 w-full py-9 md:py-6 xs:!py-0 xs:gap-0">
                        <FooterMenuBlock
                            v-if="services.length"
                            :items="services"
                            link-classes="max-w-[21.5625rem]"
                            title="Услуги"
                        />
                        <div class="space-y-3">
                            <FooterMenuBlock
                                v-if="about.length"
                                :is-desktop="true"
                                :items="about"
                                title="О налоговом бюро"
                            />
                            <FooterMenuBlock
                                v-if="offices.length"
                                :is-desktop="true"
                                :items="offices"
                                title="Офисы"
                            />
                        </div>

                        <FooterMenuBlock
                            v-if="resources.length"
                            :items="resources"
                            title="Ресурсы Союза «ПНК»"
                        />
                    </div>
                </div>
            </div>
            <p class="mt-9 md:mt-6 text-sm text-gray-500">
                Сайт использует файлы «cookie», с целью персонализации сервисов и повышения удобства пользования
                веб-сайтом. «Cookie» представляют собой небольшие файлы, содержащие информацию о предыдущих
                посещениях веб-сайта. Если вы не хотите использовать файлы «cookie», измените настройки браузера.
            </p>
            <div class="flex md:flex-col justify-between gap-2 md:gap-4 mb-6 md:mt-4 mt-10 md:mt-6">
                <div class="md:space-y-4">
                    <div class="flex lg:grid lg:grid-cols-2 md:!grid-cols-1 items-center gap-4">
                        <a
                            v-for="item in bottomMenu"
                            :key="item.id"
                            class="btn block text-sm text-gray-500 hover:text-blue font-medium"
                            :href="item.url"
                            target="_blank"
                        >
                            {{ item.name }}
                        </a>
                    </div>

                    <p class="text-gray-300 text-xs mt-2 md:mt-0">
                        © 2002-2023 Палата налоговых консультантов. Все права защищены. При воспроизведении материалов
                        на других сайтах обязательна гиперссылка на <a class="btn hover:text-blue" href="https://https://palata-nk.ru/" target="_blank">palata-nk.ru</a>
                    </p>
                </div>

                <div class="flex gap-4">
                    <a
                        v-for="item in socials"
                        :key="item.type"
                        :href="item.link"
                        target="_blank"
                        class="text-gray-500 hover:text-blue"
                    >
                        <IconsIconVk v-if="item.type === 'vk'" class="text-gray-500 fill-current w-6 h-6" />
                        <IconsIconTelegram v-if="item.type === 'telegram'" class="text-gray-500 fill-current w-6 h-6" />
                        <IconsIconYoutube v-if="item.type === 'youtube'" class="text-gray-500 fill-current w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
