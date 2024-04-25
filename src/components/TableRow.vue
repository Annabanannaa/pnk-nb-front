<script lang="ts" setup>
import TheButton from '~/components/Buttons/TheButton.vue'
import type { OfficesItem } from '~/schemas/Offices.d.ts'
import type { ColumnsCollection, Row } from '~/schemas/Table.d.ts'
import { formatIntlDate } from '~/helpers/formatIntlDate'

const props = defineProps<{
    colsWithoutTitle: ColumnsCollection;
    rowData: OfficesItem;
    style: string;
}>()

const title = ref<string>('тайт после нормализации rowData')

const { isMobileOrTablet } = useDevice()
const isMobileOrTabletScreen = ref(false)

const onResize = () => {
    isMobileOrTabletScreen.value = window.innerWidth < 1001
}

const rowDataNormalized = computed<Row>(() => {
    const result: Row = {
        title: props.rowData.license_agreement.office_name,
        number: props.rowData.license_agreement.number,
        date: formatIntlDate(props.rowData.license_agreement['date_of_inclusion']),
        ending: formatIntlDate(props.rowData.license_agreement['date_of_expiration']),
        tooltip: props.rowData.license_agreement.tooltip
    }

    function getColById (id: number | string) {
        return props.colsWithoutTitle.find((col) => col.id === id)
    }

    const cityCol = getColById('city')
    const regionCol = getColById('region')
    const specializationCol = getColById('specialization')

    if (cityCol) {
        result[cityCol.id] = props.rowData?.city?.name || ''
    }

    if (regionCol) {
        result[regionCol.id] = props.rowData?.region?.name || ''
    }

    if (specializationCol) {
        result[specializationCol.id] = props.rowData?.specialization?.name || ''
    }

    return result
})


const isOpened = ref<boolean>(false)

const doOpen = () => {
    isOpened.value = true
}

const doClose = () => {
    isOpened.value = false
}

const doToggle = () => {

    if (window.innerWidth < 1000) {
        if (isOpened.value) {
            doClose()
            return
        }

        doOpen()
    }
}
</script>

<template>
    <NuxtLink
        :to="!isMobileOrTablet && !isMobileOrTabletScreen ? `/office/${rowData.id}/` : ''"
        :style="style"
        class="!grid md:!grid-cols-1 first:border-0 border-t border-gray-220 even:bg-gray-60 md:border md:first:border md:rounded-2.5xl border-gray-220 md:p-4.5 items-center md:hover:text-black"
    >
        <TableCell
            :id="rowData.id"
            :is-title-cell="true"
            :cell-data="rowDataNormalized.title"
            @click="doToggle"
        />

        <div
            class="relative grid grid-cols-auto-fit md:grid-cols-1"
            :class="{
                'transition-[grid-template-rows] duration-500 ease-out': true,
                'grid-rows-[1fr]': isOpened,
                'grid-rows-[0fr]': !isOpened
            }"
        >
            <div class="grid grid-cols-auto-fit md:grid-cols-1 md:overflow-hidden">
                <TableCell
                    v-for="col in colsWithoutTitle"
                    :key="col.id"
                    :cell-data="rowDataNormalized[col.id]"
                    :cell-title="col.label"
                />

                <button
                    v-if="rowDataNormalized.tooltip"
                    v-tooltip="{
                        content: 'help text',
                        triggers: ['hover', 'focus', 'click']
                    }"
                    class="absolute right-4 md:right-auto top-1/2 -translate-y-1/2 md:-translate-y-0 md:top-0 md:mt-4.5 md:relative inline-flex w-7 h-7 items-center justify-center rounded-full"
                >
                    <IconsIconTooltip class="fill-current w-5 h-5 shrink-0 pointer-events-none" />
                </button>

                <TheButton :href="`/office/${rowData.id}/`" size="md" class="a-md:hidden pointer-events-auto md:w-full md:rounded-2xl mt-4.5" theme="default-bg-accent">
                    Страница офиса
                </TheButton>
            </div>
        </div>
    </NuxtLink>
</template>
