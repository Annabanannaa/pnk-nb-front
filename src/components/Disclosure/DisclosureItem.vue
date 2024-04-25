<script setup lang="ts">
import DisclosureBase from '~/components/Disclosure/DisclosureBase.vue'
import { generateUiid } from '~/plugins/uiid'

type DisclosureValueTypes = string | number | null;

interface DisclosureSlotProps {
    isOpened: boolean;
    doOpen: () => void;
    doClose: () => void;
    doToggle: () => void;
}

const props = withDefaults(
    defineProps<{
        value: DisclosureValueTypes | (DisclosureValueTypes)[]
        currentValue: DisclosureValueTypes;
        theme?: 'default' | 'rounded' | 'list',
        isDesktop?: boolean;
    }>(),
    {
        isDesktop: false,
        theme: 'default'
    }
)
const emit = defineEmits(['update:value'])

const modelValue = computed<DisclosureValueTypes | (DisclosureValueTypes)[]>({
    get () {
        return props.value
    },
    set (value) {
        emit('update:value', value)
    }
})

const isOpened = computed<boolean>(() => {
    if (!modelValue.value) {
        return false
    }

    if (Array.isArray(modelValue.value)) {
        return modelValue.value.includes(props.currentValue)
    }

    return modelValue.value === props.currentValue
})

const doOpen = () => {
    if (Array.isArray(modelValue.value)) {
        modelValue.value = [...modelValue.value, props.currentValue]
        return
    }

    modelValue.value = props.currentValue
}

const doClose = () => {
    if (Array.isArray(modelValue.value)) {
        modelValue.value = modelValue.value.filter(item => item !== props.currentValue)
        return
    }

    modelValue.value = null
}

const doToggle = () => {

    if (isOpened.value) {
        doClose()
        return
    }

    doOpen()
}

const slotProps = computed<DisclosureSlotProps>(() => {
    return {
        isOpened: isOpened.value,
        doClose,
        doOpen,
        doToggle
    }
})

const classes = computed(() => {
    const isDefaultTheme = props.theme === 'default'
    const isRoundedTheme = props.theme === 'rounded'
    return {
        root: {
            'flex flex-col overflow-hidden group': true,
            'border-b border-blue-550/12': isDefaultTheme,
            'xs:border-b xs:border-blue-550/12': props.theme === 'list',
            'border-2 border-blue-550/12 rounded-3xl sm:rounded-2.5xl': isRoundedTheme
        },
        action: {
            'group/action flex items-center gap-3 w-full text-left text-lg font-normal transition duration-200 focus:outline-none': true,
            'py-6 leading-[1.625rem]': isDefaultTheme,
            'flex p-5.5 sm:p-4 sm:pb-3 rounded-[22px] sm:rounded-[18px] a-sm:hover:bg-gray-50 a-sm:focus:bg-gray-50': props.theme === 'rounded',
            'text-sm font-semibold xs:py-6 xs:leading-[1.625rem]': props.theme === 'list'
        },
        actionText: {
            'sm:text-lg': isDefaultTheme,
            'text-sm font-semibold sm:font-medium a-xs:contents sm:text-lg': props.theme === 'list'
        },
        actionIconWrapper: {
            'flex-initial transition duration-300 inline-flex text-[#9097AD]': true,
            'rotate-180': isOpened.value,
            'a-xs:w-1.5 xs:group-hover/action:text-blue-550 xs:group-focus/action:text-blue-550 xs:rounded-3xl': props.theme === 'list',
            'group-hover/action:text-blue-550 group-focus/action:text-blue-550 rounded-3xl': isDefaultTheme
        },
        actionIcon: {
            'a-xs:hidden w-4': props.theme === 'list',
            'w-4': isDefaultTheme,
            'w-8 h-8 sm:w-7 smh-[1.625rem]': isRoundedTheme

        },
        contentWrapper: {
            'py-2 px-0 sm:!p-0 mb-4': props.theme === 'list',
            'p-6 pt-3 sm:p-4 sm:pt-0 text-sm': true,
            'sm:px-0 sm:pt-0': isDefaultTheme
        }
    }
})

const itemId = computed(() => {
    if (!props.currentValue) {
        return generateUiid('disclosure-item-')
    }

    return String(props.currentValue)
})

</script>
<template>
    <div
        :class="classes.root"
    >
        <button
            :class="classes.action"
            :aria-expanded="isOpened"
            :aria-controls="itemId"
            @click="doToggle"
        >
            <span :class="classes.actionText" class="flex-auto font-medium sm:text-base">
                <slot name="title" v-bind="slotProps" />
            </span>
            <span
                :class="classes.actionIconWrapper"
                aria-hidden="true"
            >
                <IconsIconArrowBottomPainted v-if="props.theme === 'list'" class="h-1 my-auto w-1.5 xs:hidden" />
                <IconsIconArrowBottom :class="classes.actionIcon" />
            </span>
        </button>
        <DisclosureBase
            :opened="isOpened"
            :aria-labelledby="itemId"
        >
            <div :class="classes.contentWrapper">
                <slot v-bind="slotProps" />
            </div>
        </DisclosureBase>
    </div>
</template>
