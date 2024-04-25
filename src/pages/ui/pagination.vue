<script lang="ts" setup>
import BasePagination from '~/components/BasePagination.vue'
import type { LocationQueryValue } from 'vue-router'

const getNumberFromQuery = (item: LocationQueryValue | LocationQueryValue[]): number|undefined => {
    if (!item) {
        return
    }
    if (typeof item === 'string') {
        return parseInt(item)
    } else if (item[0]) {
        return parseInt(item[0])
    }
}

const route = useRoute()
const currentPage = ref(getNumberFromQuery(route.query.page) || 1)
const total = ref(31)
const limit = ref(2)

const pageRouteQuery = computed(() => {
    return {
        page: route.query.page,
        sort: 'ASC'
    }
})

</script>
<template>
    <div class="container">
        <div class="flex items-center gap-3 text-3xl my-4">
            <NuxtLink
                to="/ui/"
                class="block mt-1 hover:text-green-500 transition-colors duration-200"
                aria-label="Вернуться на страницу списка компонентов"
            >
                <IconsIconArrowLeft class="fill-current w-6 h-6" />
            </NuxtLink>
            <span>Пагинация</span>
        </div>
        <div class="my-4">
            <div>
                page: {{ currentPage }}
            </div>
            <div>
                total: {{ total }}
            </div>
            <div>
                limit: {{ limit }}
            </div>
        </div>
        <BasePagination
            v-model:page="currentPage"
            :total="total"
            :limit="limit"
            :use-links="true"
            :route="{ query: pageRouteQuery }"
        />
    </div>
</template>
