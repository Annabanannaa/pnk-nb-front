<script lang="ts" setup>

interface BaseFormFieldProps {
    value?: any;
    title?: string;
    theme?: string;
    isMaterial?: boolean;
    error?: string;
    focused?: boolean;
}

const props = withDefaults(
    defineProps<BaseFormFieldProps>(),
    {
        value: undefined,
        title: '',
        theme: '',
        isMaterial: false,
        error: '',
        focused: false
    }
)

const isHintTitle = computed(() => props.value || props.focused)

const slots = useSlots()

const hasErrorSlot = computed<boolean>(() => !!slots.error)

const classes = computed(() => {
    const borderClasses = computed(() => {
        if (props.theme === 'gray') {
            return 'bg-gray-60 rounded-2xl border border-gray-80 px-3 pl-6 md:pl-3 py-2 relative'
        } else if (props.theme === 'white') {
            return 'bg-white rounded-2xl px-3 py-2 relative'
        } else {
            return 'bg-white rounded-2xl border border-gray-80 px-3 py-2 relative'
        }
    })

    return {
        root: 'inline-block',
        containerWrapper: {
            'flex flex-col': true,
            [borderClasses.value]: props.isMaterial,
            'ring ring-blue-300': props.isMaterial && props.focused
        },
        container: {
            'flex gap-1.5': true,
            [borderClasses.value]: !props.isMaterial,
            'ring ring-blue-300': !props.isMaterial && props.focused,
            'mt-1': props.isMaterial
        },
        input: {
            'w-full outline-none bg-transparent leading-9': true
        },
        inputDynamicShift: '',
        inputStaticShift: '',
        title: {
            'transition-all duration-300 truncate w-full': true,
            'absolute inset-0 pointer-events-none px-2.5 py-2.5': props.isMaterial,
            'pl-6 text-gray-500': props.theme === 'gray',
            'text-xs pt-0': props.isMaterial && isHintTitle.value
        },
        error: {
            input: 'placeholder:text-red-500',
            container: '!bg-red-200 border border-red-500',
            label: 'text-red-500 text-xs'
        }
    }
})
</script>
<template>
    <label
        ref="rootLabel"
        :class="classes.root"
    >
        <span :class="classes.containerWrapper">
            <slot
                name="title"
                v-bind="{
                    class: classes.title
                }"
            >
                <span
                    :class="classes.title"
                    v-html="title"
                />
            </slot>

            <span
                :class="{
                    ...classes.container,
                    [classes.error.container]: slots.error
                }"
            >
                <slot name="prefix" />
                <slot
                    v-bind="{
                        class: {
                            ...classes.input,
                            [classes.error.input]: slots.error
                        },
                        dynamicShift: classes.inputDynamicShift,
                        staticShift: classes.inputStaticShift
                    }"
                />
                <slot name="suffix" />
            </span>
        </span>
        <slot
            v-if="slots.error"
            name="error"
            v-bind="{
                class: classes.error.label
            }"
        >
            <span
                v-if="error"
                :class="classes.error"
                v-html="error"
            />
        </slot>
    </label>
</template>
