<script lang="ts" setup>
import PopoverBase from '~/components/Popover/PopoverBase.vue'
import TheButton from '~/components/Buttons/TheButton.vue'
import { fetchMenuByCode, normalizeMenuResponse } from '~/helpers/menu'

interface TopMenuItem {
    id: number;
    name: string;
    url: string;
    type: string;
    active?: boolean;
}

const fetchMenu = async () => {
    const topMenu = fetchMenuByCode('top-header-menu')
    const mainMenu = fetchMenuByCode('main-header-menu')

    await Promise.all([
        topMenu,
        mainMenu
    ])

    return {
        topMenu: normalizeMenuResponse(topMenu),
        mainMenu: normalizeMenuResponse(mainMenu)
    }
}

const {
    topMenu,
    mainMenu
} = await fetchMenu()

const topMenuNormalized = computed<TopMenuItem[]>(() => {
    const currentResource: TopMenuItem = {
        id: 1,
        name: 'Налоговое бюро',
        url: '',
        type: 'link',
        active: true
    }

    const menu: TopMenuItem[] = [...topMenu]

    if (topMenu.length > 2) {
        menu.splice(2, 0, currentResource)
    } else {
        menu.push(currentResource)
    }

    return menu
})

const popoverMenuDelay = {
    show: 0,
    hide: 0
}

const phoneContacts = [
    {
        id: Math.ceil(Math.random() * 1000),
        title: '+7 495 380‑41‑61',
        link: '84953804161'
    },
    {
        id: Math.ceil(Math.random() * 1000),
        title: '+7 495 380‑41‑61',
        link: '84953804161'
    },
    {
        id: Math.ceil(Math.random() * 1000),
        title: '+7 495 380‑41‑61',
        link: '84953804161'
    }
]
const mailContacts = ['nalog-buro@palata-nk.ru', 'nalog-buro@palata-nk.ru']

</script>

<template>
    <div class="border-b border-gray-100 md:border-0">
        <div class="container">
            <div class="flex justify-between my-2 lg:hidden">
                <div class="flex items-center gap-4">
                    <template
                        v-for="(item) in topMenuNormalized"
                        :key="item.id"
                    >
                        <BaseLink
                            class="btn text-sm font-medium py-[3px] hover:text-blue"
                            :class="item.active ? 'text-blue-500 rounded-4xl px-4.5 bg-gray-200' : 'text-gray-500'"
                            :to="item.url"
                        >
                            {{ item.name }}
                        </BaseLink>
                    </template>
                </div>
                <div class="flex items-center gap-6">
                    <TheButton size="sm" theme="default-bg-accent">
                        Ресурсы Союза «ПНК»
                    </TheButton>

                    <div class="text-right">
                        <PopoverBase
                            class="block text-xs font-medium text-gray-500 hover:text-black"
                            mode="menu"
                            :triggers="['hover', 'click']"
                            :delay="popoverMenuDelay"
                        >
                            <template #action="{ shown }">
                                <button class="flex gap-1.5 items-center ml-auto">
                                    {{ phoneContacts[1].title }}
                                    <IconsIconArrowBottom
                                        :class="{
                                            'fill-current w-3 h-5': true,
                                            'rotate-180': shown
                                        }"
                                    />
                                </button>
                            </template>
                            <template #content>
                                <div
                                    class="flex flex-col max-w-[281px] gap-3 p-6"
                                >
                                    <template v-for="item in phoneContacts" :key="item.id">
                                        <a class="block text-sm text-gray-500 hover:text-black font-medium" :href="'tel:' + item.link">{{ item.title }}</a>
                                    </template>
                                </div>
                            </template>
                        </PopoverBase>

                        <PopoverBase
                            :triggers="['hover', 'click']"
                            mode="menu"
                            class="block text-xs font-medium text-gray-500 hover:text-black"
                            :delay="popoverMenuDelay"
                        >
                            <template #action="{ shown }">
                                <button class="flex gap-1.5 items-center ml-auto">
                                    {{ mailContacts[1] }}
                                    <IconsIconArrowBottom
                                        :class="{
                                            'fill-current w-3 h-5': true,
                                            'rotate-180': shown
                                        }"
                                    />
                                </button>
                            </template>
                            <template #content>
                                <div class="flex flex-col max-w-[281px] gap-3 p-6">
                                    <template v-for="item in mailContacts" :key="item.id">
                                        <a class="block text-sm text-gray-500 font-medium hover:text-black" :href="'mailto:' + item">{{ item }}</a>
                                    </template>
                                </div>
                            </template>
                        </PopoverBase>
                    </div>
                </div>
            </div>
            <div class="flex items-center lg:justify-between gap-6 py-2 lg:p-4">
                <TheLogo class="fill-current w-[10.3125rem] h-[2.6875rem] inline-block" />

                <div class="flex items-center gap-4 lg:hidden">
                    <template
                        v-for="(item) in mainMenu"
                        :key="item.title"
                    >
                        <PopoverBase
                            v-if="item.children?.length"
                            :triggers="['hover', 'click']"
                            mode="menu"
                            class="p-2 block text-sm font-medium text-black-500"
                            :delay="popoverMenuDelay"
                        >
                            <template #action="{ shown }">
                                <button class="flex gap-3 items-center ml-auto">
                                    {{ item.name }}
                                    <IconsIconArrowBottom
                                        :class="{
                                            'fill-current w-3 h-5': true,
                                            'rotate-180': shown
                                        }"
                                    />
                                </button>
                            </template>
                            <template #content>
                                <div
                                    :class="item.children.length > 4 ? 'grid-cols-2' : 'grid-cols-1'"
                                    class="grid max-w-[40.625rem] gap-x-6 p-6"
                                >
                                    <template v-for="el in item.children" :key="el.id">
                                        <BaseLink
                                            class="text-sm text-black hover:text-blue py-3 font-medium"
                                            :to="el.url"
                                        >
                                            {{ el.name }}
                                        </BaseLink>
                                    </template>
                                </div>
                            </template>
                        </PopoverBase>
                        <BaseLink
                            v-else
                            class="text-sm text-black font-medium p-2"
                            :to="item.url"
                        >
                            {{ item.name }}
                        </BaseLink>
                    </template>
                </div>

                <IconsIconBurgerMenu class="fill-current w-6 h-6 a-lg:hidden" />
            </div>
        </div>
    </div>
</template>
