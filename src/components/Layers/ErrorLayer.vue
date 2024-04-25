<script setup lang="ts">
import BaseLayer from '~/components/Layers/BaseLayer.vue'

defineProps<{
    title: string,
    reason?: string;
}>()
</script>
<template>
    <BaseLayer
        :show-close-icon="false"
        block-classes="p-0 bg-white rounded-2xl"
    >
        <Alert
            type="error"
            :title="title"
            :description="reason"
            :closable="true"
            @close-alert="$emit('close')"
        />
    </BaseLayer>
</template>
