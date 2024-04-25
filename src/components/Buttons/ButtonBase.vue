<script lang="ts" setup>

type ClassNameType = string | Record<string, boolean>;
interface BaseButtonClasses {
    root?: ClassNameType;
    content?: ClassNameType;
    loader?: ClassNameType;
    append?: ClassNameType;
}

const props = withDefaults(defineProps<{
    href?: string,
    loading?: boolean,
    disabled?: boolean,
    contentOpacityWhenLoading?: string, // Класс с опасити для контента кнопки, когда она в состоянии loading
    classes?: BaseButtonClasses,
}>(), {
    href: undefined,
    loading: false,
    disabled: false,
    contentOpacityWhenLoading: 'opacity-0',
    classes: undefined
})

const componentName = computed<string>(() => {
    if (props.href) {
        return resolveComponent('NuxtLink') as string
    }
    return 'button'
})

const componentAttrs = computed<Record<string, unknown>>(() => {
    const _componentAttrs = useAttrs()

    const attrs = Object.assign({}, _componentAttrs, {
        disabled: props.disabled || props.loading
    })

    if (componentName.value === 'button') {
        Object.assign(attrs, {
            type: _componentAttrs.type || 'button'
        })
    } else {
        Object.assign(attrs, {
            to: props.href
        })
    }

    return attrs
})

const classNamePropToObject = (classes?: ClassNameType): Record<string, boolean> => {
    if (!classes) {
        return {}
    }
    if (typeof classes === 'string') {
        return {
            [classes]: true
        }
    }

    return classes
}

const componentClasses = computed<Record<string, Record<string, boolean>>>(() => ({
    root: {
        'relative inline-flex justify-center items-center text-center cursor-pointer break-word transition duration-150 ease-in-out': true,
        ...classNamePropToObject(props.classes?.root)
    },
    content: {
        'flex justify-center items-center': true,
        [props.contentOpacityWhenLoading]: props.loading,
        ...classNamePropToObject(props.classes?.content)
    },
    loader: {
        'absolute inset-0 flex items-center justify-center': true,
        ...classNamePropToObject(props.classes?.loader)
    },
    append: {
        ...classNamePropToObject(props.classes?.append)
    }
}))
</script>

<template>
    <Component
        :is="componentName"
        :class="componentClasses.root"
        v-bind="componentAttrs"
    >
        <span v-if="loading" :class="componentClasses.loader">
            <slot name="loader">
                <Spin class="w-5 h-5" />
            </slot>
        </span>
        <span
            v-if="$slots['default'] || $slots['append']"
            :class="componentClasses.content"
        >
            <span
                v-if="$slots['before']"
                :class="componentClasses.before"
            >
                <slot name="before" />
            </span>

            <slot />

            <span
                v-if="$slots['append']"
                :class="componentClasses.append"
            >
                <slot name="append" />
            </span>
        </span>
    </Component>
</template>
