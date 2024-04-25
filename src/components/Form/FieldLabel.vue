<script lang="ts" setup>

export type FormFieldType = 'default' | 'hint'

export interface FormFieldProps {
    title: string;
    type?: FormFieldType;
}


const props = withDefaults(
    defineProps<{
        title: FormFieldProps['title'],
        type?: FormFieldProps['type']
    }>(),
    {
        type: 'default'
    }
)

const isHintTitle = computed(() => props.type === 'hint')
</script>
<template>
    <label class="relative">
        <span
            v-if="!isHintTitle"
            class="block"
        >
            {{ title }}
        </span>
        <slot v-bind="{ isHintTitle, title }" />
    </label>
</template>
