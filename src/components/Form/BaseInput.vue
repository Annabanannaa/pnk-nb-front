<script lang="ts" setup>
import BaseFormField from '~/components/Form/BaseFormField.vue'

interface BaseInputProps {
    value?: string;
    title?: string;
    theme?: string;
    placeholder?: string;
    isMaterial?: boolean;
    error?: string;
}

const props = withDefaults(
    defineProps<BaseInputProps>(),
    {
        value: undefined,
        title: '',
        theme: '',
        placeholder: '',
        isMaterial: false,
        error: ''
    }
)

const emit = defineEmits(['update:value'])

const _modelValue = computed<BaseInputProps['value']>({
    get () {
        return props.value
    },
    set (value: BaseInputProps['value']) {
        emit('update:value', value)
    }
})

const isFocused = ref(false)
</script>
<template>
    <BaseFormField
        :title="title"
        :theme="theme"
        :focused="isFocused"
        :value="_modelValue"
        :is-material="isMaterial"
    >
        <template #default="slotPayload">
            <input
                v-model="_modelValue"
                :placeholder="placeholder"
                type="text"
                :class="slotPayload.class"
                @focus="isFocused = true"
                @blur="isFocused = false"
            >
        </template>

        <template #title>
            <slot name="title" />
        </template>

        <template v-if="$slots.error" #error="slotProps">
            <slot name="error" v-bind="slotProps" />
        </template>

        <template #prefix>
            <slot name="prefix" />
        </template>

        <template #suffix>
            <slot name="suffix" />
        </template>
    </BaseFormField>
</template>
