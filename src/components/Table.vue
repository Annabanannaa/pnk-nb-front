<script lang="ts" setup>
import type { Column, ColumnsCollection } from '~/schemas/Table.d.ts'
import { useGenericList } from '~/components/ListGeneric'
import TableRow from '~/components/TableRow.vue'

const props = defineProps<{
    cols: ColumnsCollection,
    rowStyles: string,
    rowsListAttrs: any
}>()

const RowsList = useGenericList<any>()

const colsWithoutTitle = computed<ColumnsCollection>(() =>
    props.cols.filter((item) => item.id !== 'title')
)

const titleCol = computed<Column>(() =>
    props.cols.filter((item) => item.id === 'title')[0]
)
</script>
<template>
    <div
        :style="rowStyles"
        class="grid border border-blue-510 bg-blue-500 rounded-t-2xl md:hidden"
    >
        <div
            v-if="titleCol"
            class="flex items-center py-3 px-4 text-sm font-semibold text-white"
        >
            {{ titleCol.label }}
        </div>

        <div class="grid grid-cols-auto-fit">
            <div
                v-for="col in colsWithoutTitle"
                :key="col.id"
                class="flex items-center py-3 px-4 text-sm font-semibold text-white"
            >
                {{ col.label }}
            </div>
        </div>
    </div>

    <RowsList v-bind="rowsListAttrs">
        <template #error="{ response }">
            <pre>{{ response?.data?.detail }}</pre>
        </template>

        <template #item="{ item }">
            <TableRow
                :style="rowStyles"
                :cols-without-title="colsWithoutTitle"
                :row-data="item"
            />
        </template>
    </RowsList>
</template>
