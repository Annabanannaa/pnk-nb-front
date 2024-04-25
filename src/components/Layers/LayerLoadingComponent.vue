<script setup lang="ts">
import BaseLayer from '~/components/Layers/BaseLayer.vue'
</script>
<template>
    <BaseLayer :show-close-icon="false">
        <div class="flex justify-center py-5">
            <Spin class="block relative w-8 h-8" />
        </div>
    </BaseLayer>
</template>
