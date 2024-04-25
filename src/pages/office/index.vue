<script lang="ts" setup>
import OfficeList from '~/components/Office/OfficeList.vue'
import type { ColumnsCollection } from '~/schemas/Table.d.ts'

const cols: ColumnsCollection = [
    { id: 'title', label: 'Название организации' },
    { id: 'date', label: 'Дата включения в реестр' },
    { id: 'number', label: '№ лицензионного договора' },
    { id: 'ending', label: 'Окончание действия лицензионного договора' }
]

</script>
<template>
    <div>
        <OfficeList
            :style="`${cols.length > 4 ? 'grid-template-columns:' + 100 / cols.length + '% 1fr' : 'grid-template-columns: 42% 1fr' }`"
            :cols="cols"
            type=""
        />
    </div>
</template>
