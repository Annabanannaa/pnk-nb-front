<script lang="ts" setup>
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import OfficeContacts from '~/components/OfficeContacts.vue'

interface ContentWidgetOfficeContactsData extends ContentWidgetBase {
    data: {
        address: string;
        addressMapLink: string;
        workingHours: string;
        phones: string[];
        emails: string[];
    }
}

defineProps<{
    block: ContentWidgetOfficeContactsData;
    withContainer?: boolean;
}>()

</script>
<template>
    <div :class="{ 'container': withContainer }">
        <OfficeContacts :contacts-data="block.data" />
    </div>
</template>
