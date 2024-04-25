<script  lang="ts" setup>
import type { ServicePage } from '~/schemas/services'
import type { BreadcrumbsItem } from '~/schemas/Breadcrumbs'
import Breadcrumbs from '~/components/Breadcrumbs.vue'


const route = useRoute()

console.log(route.params.serviceId[0])

const { data: pageData, error } = await useApiFetch<ServicePage>(`/api/services/${route.params.serviceId[0]}`)

const breadcrumbsBase = ref<BreadcrumbsItem[]>([
    {
        title: 'Главная',
        link: '/'
    },
    {
        title: 'Все услуги',
        link: '/'
    }
])

const breadcrumbs = computed<BreadcrumbsItem[]>(() => {
    const result = [
        ...breadcrumbsBase.value
    ]

    if (pageData.value?.name) {
        result.push(
            {
                title: pageData.value?.name,
                link: ''
            }
        )
    }


    return result
})

</script>

<template>
    <div>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="container mt-8 md:mt-4">
            <h1>{{ pageData?.name }}</h1>
            <div class="my-15 md:my-4 space-y-8 md:space-y-6">
                <p> {{ pageData?.description }}</p>

                <OrderForm page="service" />
            </div>
        </div>
    </div>
</template>
