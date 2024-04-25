<script lang="ts" setup>
import BaseLayer from '~/components/Layers/BaseLayer.vue'

</script>
<template>
    <BaseLayer @close="$emit('close')">
        <h1 class="text-3xl">
            Тестовая модалка
        </h1>
        <div class="py-3">
            <button @click="$layer.open('SayNameLayer')">
                Открыть другую
            </button>
            <button @click="$emit('close')">
                Закрыть
            </button>
        </div>
    </BaseLayer>
</template>
