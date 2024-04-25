<script lang="ts" setup>
import { generateUiid } from '~/plugins/uiid'

type BaseToggleValidValues = boolean | string | number;
type BaseToggleValues = BaseToggleValidValues | BaseToggleValidValues[] | null;
type BaseToggleFieldValue = BaseToggleValidValues | null;

interface BaseToggleClasses {
    input?: unknown;
    label?: unknown;
}
export interface BaseToggleProps {
    value?: BaseToggleValues,
    fieldValue?: BaseToggleFieldValue,
    type?: 'checkbox' | 'radio',
    name?: string | undefined,
    disabled?: boolean;
    error?: boolean;
    classes?: BaseToggleClasses,
    tag?: string;
}

interface BaseToggleSlots {
    default: {
        isChecked: boolean;
    }
}

const props = withDefaults(
    defineProps<BaseToggleProps>(),
    {
        value: '',
        fieldValue: '',
        type: 'checkbox',
        name: '',
        disabled: false,
        classes: undefined,
        tag: 'span'
    }
)

const emit = defineEmits(['update:value'])

defineSlots<{
    default(props: BaseToggleSlots['default']): any
}>()

const inputValue = computed<BaseToggleValues>({
    get (): BaseToggleValues {
        return props.value || null
    },
    set (value: BaseToggleValues) {
        emit('update:value', value)
    }
})

const isChecked = computed<boolean>(() => {
    return props.fieldValue
        ? Array.isArray(inputValue.value)
            ? inputValue.value.includes(props.fieldValue)
            : inputValue.value === props.fieldValue
        : !!inputValue.value
})

const inputClasses = computed(() => {
    return (props.classes?.input ? props.classes.input : '') as string
})

const uniqId = generateUiid(`toggle-${ props.type }-`)

const defaultSlotPayload = computed<BaseToggleSlots['default']>(() => {
    return {
        isChecked: isChecked.value
    }
})
</script>
<template>
    <Component :is="tag">
        <input
            :id="uniqId"
            v-model="inputValue"
            :value="fieldValue"
            :type="type"
            :name="name"
            :disabled="disabled"
            :class="{
                [inputClasses]: true,
                'peer': true
            }"
        >
        <label :class="classes?.label" :for="uniqId">
            <slot
                v-bind="defaultSlotPayload"
            />
        </label>
    </Component>
</template>
