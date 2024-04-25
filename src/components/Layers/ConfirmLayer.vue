<script lang="ts" setup>
import BaseLayer from '~/components/Layers/BaseLayer.vue'
import { useFocus } from '@vueuse/core'

withDefaults(
    defineProps<{
        title: string;
        description: string;
        acceptButtonCaption?: string;
        declineButtonCaption?: string;
    }>(),
    {
        acceptButtonCaption: 'Да',
        declineButtonCaption: 'Нет'
    }
)

defineEmits(['close'])

const declineActionRef = ref()

useFocus(declineActionRef, { initialValue: true })
</script>

<template>
    <BaseLayer @close="$emit('close')">
        <template #title>
            {{ title }}
        </template>
        <template #default>
            <div class="mt-6">
                <div class="mb-6">
                    {{ description }}
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-1 gap-2">
                    <button @click="$emit('close', true)">
                        {{ acceptButtonCaption }}
                    </button>

                    <button ref="declineActionRef" @click="$emit('close', false)">
                        {{ declineButtonCaption }}
                    </button>
                </div>
            </div>
        </template>
    </BaseLayer>
</template>
