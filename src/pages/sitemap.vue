<script  lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue'

import { fetchMenuByCode, normalizeMenuResponse } from '~/helpers/menu'
import SitemapList from '~/components/Sitemap/SitemapList.vue'

const breadcrumbs = [
    {
        title: 'Главная',
        link: '/'
    },
    {
        title: 'Карта сайта',
        link: '/sitemap/'
    }
]

const fetchMenu = async () => {
    const mainMenu = fetchMenuByCode('main-header-menu')

    await Promise.all([
        mainMenu
    ])

    return {
        mainMenu: normalizeMenuResponse(mainMenu)
    }
}

const {
    mainMenu
} = await fetchMenu()

</script>

<template>
    <div class="mb-15 md:mb-6">
        <Breadcrumbs :items="breadcrumbs" />

        <div class="container space-y-15 md:space-y-6">
            <h1>Карта сайта</h1>

            <div v-for="item in mainMenu" :key="item.id" class="">
                <SitemapList v-if="item.children?.length" :list-info="item" />

                <NuxtLink v-else :to="item.url" class="btn text-blue-400">
                    {{ item.name }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
