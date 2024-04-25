<script setup lang="ts">
import BaseToggle, { type BaseToggleProps } from '~/components/Form/BaseToggle.vue'

const props = defineProps<Omit<BaseToggleProps, 'type' | 'classes'> & { label?: string }>()

const emit = defineEmits(['update:value'])

const inputModel = computed<BaseToggleProps['value']>({
    get () {
        return props.value
    },
    set (payload: BaseToggleProps['value']) {
        emit('update:value', payload)
    }
})

const bindableProps = computed<BaseToggleProps>(() => {
    return {
        ...props,
        type: 'radio'
    }
})
</script>
<template>
    <BaseToggle
        v-model:value="inputModel"
        v-bind="bindableProps"
        :classes="{
            label: 'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1'
        }"
        class="inline-flex focus-visible:ring group group-focus-visible:bg-red-500"
    >
        <template #default="slotProps">
            <div
                :class="{
                    'border border-black px-4 py-1.5 rounded-sm font-bold': true,
                    'bg-green-200': slotProps.isChecked,
                    'bg-red-200': !slotProps.isChecked
                }"
            >
                <slot v-bind="slotProps">
                    {{ label }}
                </slot>
            </div>
        </template>
    </BaseToggle>
</template>
