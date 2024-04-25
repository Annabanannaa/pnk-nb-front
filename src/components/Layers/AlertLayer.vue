<script lang="ts" setup>
import { useFocus } from '@vueuse/core'
import BaseLayer from '~/components/Layers/BaseLayer.vue'

withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        buttonCaption?: string
    }>(),
    {
        title: '',
        description: '',
        buttonCaption: 'Ок'
    }
)

defineEmits(['close'])

const closeButtonRef = ref()

useFocus(closeButtonRef, { initialValue: true })
</script>
<template>
    <BaseLayer @close="$emit('close')">
        <template #title>
            {{ title }}
        </template>
        <template #default>
            <div class="mt-6">
                <div v-if="description" class="mb-6">
                    {{ description }}
                </div>
                <div class="grid grid-cols-1">
                    <button
                        v-if="buttonCaption"
                        ref="closeButtonRef"
                        @click="$emit('close')"
                    >
                        {{ buttonCaption }}
                    </button>
                </div>
            </div>
        </template>
    </BaseLayer>
</template>
