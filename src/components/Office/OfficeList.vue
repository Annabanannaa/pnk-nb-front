<script lang="ts" setup>
import type { ColumnsCollection } from '~/schemas/Table.d.ts'
import { getPageFromQuery } from '~/helpers/paginationHelper'
import Table from '~/components/Table.vue'

const props = defineProps<{
    type: string,
    cols: ColumnsCollection,
    style: string,
}>()

const route = useRoute()

const dataSource = computed(() => ({
    url: `/api/offices/${props.type}`,
    debounce: 500
}))

const currentRoute = computed(() => {
    const query: Record<string, any> = {
        ...(route.query || {}),
        page: getPageFromQuery(route.query.page)
    }

    return {
        query
    }
})
</script>

<template>
    <Table
        :cols="cols"
        :row-styles="style"
        :rows-list-attrs="{
            dataSource: dataSource,
            pagination: {
                initialPage: currentRoute.query.page,
                limit: 10,
                useLinks: true,
                route: currentRoute
            },
            class: 'relative',
            classes: {
                pagination: 'mt-6',
                listContainer: 'border border-gray-220 rounded-b-2xl overflow-hidden md:border-0 md:space-y-2'
            }
        }"
    />
</template>
