<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import BaseLayer from '~/components/Layers/BaseLayer.vue'

const emit = defineEmits(['close'])

const inputRef = ref()
const inputModel = ref('')

useFocus(inputRef, { initialValue: true })

const onClose = () => {
    emit('close', inputModel.value)
}
</script>
<template>
    <BaseLayer @close="onClose">
        <template #title>
            Скажи имя
        </template>
        <form @submit.prevent="onClose">
            <div class="py-4">
                <input
                    ref="inputRef"
                    v-model="inputModel"
                    type="text"
                    placeholder="Твое имя"
                    class="w-full px-3 py-1.5 border border-purple-500 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 focus:outline-none"
                >
            </div>
            <button type="submit" @click="onClose">
                Готово
            </button>
        </form>
    </BaseLayer>
</template>
