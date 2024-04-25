<script lang="ts" setup>
import Card from '~/components/Card.vue'
import SelectFieldBase from '~/components/Form/SelectFieldBase.vue'

import IconAllOffices from '~/components/Icons/IconAllOffices.vue'
import IconRegionalOffices from '~/components/Icons/IconRegionalOffices.vue'
import IconSpecializedOffices from '~/components/Icons/IconSpecializedOffices.vue'
import IconIndustryOffices from '~/components/Icons/IconIndustryOffices.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

import type { BreadcrumbsItem } from '~/schemas/Breadcrumbs'

const offices = [
    {
        id: 'all',
        title: 'Все офисы',
        label: 'Все офисы',
        routeName: 'office',
        link: '/office/',
        value: '/office/',
        icon: IconAllOffices,
        description: ''
    },
    {
        id: 'regional',
        title: 'Региональные офисы',
        titlePage: 'Региональные офисы',
        label: 'Региональные офисы',
        routeName: 'office-regional',
        link: '/office/regional/',
        value: '/office/regional/',
        icon: IconRegionalOffices,
        description: 'Описание региональных офисов'
    },
    {
        id: 'specialized',
        title: 'Специализированные офисы',
        titlePage: 'Специализированные офисы',
        label: 'Специализированные офисы',
        routeName: 'office-specialized',
        link: '/office/specialized/',
        value: '/office/specialized/',
        icon: IconSpecializedOffices,
        description: 'Описание специализированных офисов'
    },
    {
        id: 'industry',
        title: 'Отраслевые офисы',
        titlePage: 'Отраслевые офисы',
        label: 'Отраслевые офисы',
        routeName: 'office-industry',
        link: '/office/industry/',
        value: '/office/industry/',
        icon: IconIndustryOffices,
        description: 'Описание отраслевых офисов'
    }
]

const route = useRoute()
const router = useRouter()
const simpleSelectModel = ref(route.path)

watch(simpleSelectModel, (value) => {
    router.push({ path: value })
})

const currentPage = computed<any>(() =>
    offices.filter((item) => item.routeName === route.name)[0]
)

const breadcrumbsBase = ref<BreadcrumbsItem[]>([
    {
        title: 'Главная',
        link: '/'
    },
    {
        title: 'Реестр офисов',
        link: '/'
    }
])


const breadcrumbs = computed<BreadcrumbsItem[]>(() => {
    const result = [
        ...breadcrumbsBase.value
    ]

    if (currentPage.value?.title !== 'Все офисы') {
        result.push(
            {
                title: currentPage.value?.title,
                link: currentPage.value?.link
            }
        )
    }

    return result
})


</script>
<template>
    <Breadcrumbs v-if="currentPage" :items="breadcrumbs" />

    <div v-if="currentPage" class="container space-y-15 md:space-y-6 mb-15">
        <div class="mt-8 md:mt-4">
            <h1 class="title-h1">
                {{ currentPage.title !== 'Все офисы' ? currentPage.title : 'Реестр офисов' }}
            </h1>

            <p v-if="currentPage.description" class="mt-4.5 md:font-medium text-gray-800">
                {{ currentPage.description }}
            </p>
        </div>

        <div class="grid gap-6 grid-cols-4 my-15 md:hidden">
            <Card
                v-for="office in offices"
                :key="office.id"
                :item-data="office"
                :route-name="String(route.name)"
            >
                <Component :is="office.icon" />

                <template #icon>
                    <Component :is="office.icon" />
                </template>
            </Card>
        </div>

        <SelectFieldBase
            v-model:value="simpleSelectModel"
            class="a-md:hidden mt-6 mb-2"
            :options="offices"
        />

        <NuxtPage />
    </div>

    <NuxtPage v-else />
</template>
