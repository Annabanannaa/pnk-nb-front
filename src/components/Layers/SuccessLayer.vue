<script setup lang="ts">
import BaseLayer from '~/components/Layers/BaseLayer.vue'

defineProps<{
    title: string,
    description?: string;
}>()
</script>
<template>
    <BaseLayer
        :show-close-icon="false"
        block-classes="p-0 bg-white rounded-2xl"
    >
        <Alert
            :title="title"
            :description="description"
            :closable="true"
            @close-alert="$emit('close')"
        />
    </BaseLayer>
</template>
