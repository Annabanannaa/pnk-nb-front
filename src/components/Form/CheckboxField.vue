<script setup lang="ts">
import BaseToggle, { type BaseToggleProps } from '~/components/Form/BaseToggle.vue'

const props = defineProps<Omit<BaseToggleProps, 'type' | 'classes'> & {
    label?: string,
}>()

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
        type: 'checkbox'
    }
})
</script>
<template>
    <BaseToggle
        v-model:value="inputModel"
        v-bind="bindableProps"
        :classes="{
            label: 'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 flex'
        }"
        class="inline-flex focus-visible:ring group group-focus-visible:bg-red-500"
    >
        <template #default="slotProps">
            <div
                :class="{
                    'flex items-center justify-center border-2 rounded-sm font-bold m-auto rounded-md transition-all mr-2': true,
                    'bg-blue-550 border-blue-550': slotProps.isChecked,
                    'border-gray-250 border-gray-250': !slotProps.isChecked,
                    'border-red-500': bindableProps.error && !bindableProps.value
                }"
            >
                <IconsIconCheck
                    :class="slotProps.isChecked ? 'opacity-100' : 'opacity-0'"
                    class="fill-current w-4 h-4 transition-opacity text-white"
                />
            </div>
            <slot v-bind="slotProps">
                {{ label }}
            </slot>
        </template>
    </BaseToggle>
</template>
