<script setup lang="ts">
import ButtonBase from '~/components/Buttons/ButtonBase.vue'

const props = withDefaults(
    defineProps<{
        theme?: 'default' | 'accent' | 'default-accent' | 'default-bg-accent' | 'error' | 'white' | 'rounded-white' | 'dark-blue' | 'swiperArrow',
        size?: 'default' | 'md' | 'sm' | 'square' | 'xs' | 'arrowSquare',
        disabled?: boolean,
        href?: string
    }>(),
    {
        theme: 'default',
        size: 'default',
        disabled: false
    }
)

const classes = computed(() => {
    return {
        root: {
            'disabled:cursor-not-allowed duration-200 leading-[20px] disabled:active:ring-0 font-medium focus:outline-none': true,
            // Themes
            'text-white bg-blue-600 hover:bg-[#3954A4] disabled:hover:bg-blue-600 focus:bg-[#3954A4] active:ring-1 active:ring-offset-1 active:ring-blue-600': props.theme === 'accent',
            'text-black hover:bg-gray-200 focus:bg-gray-200 active:ring-1 active:ring-gray-200 active:ring-offset-1 disabled:hover:bg-transparent': props.theme === 'default',
            'bg-white text-blue-600 hover:ring-offset-1 hover:ring-gray-200 active:ring-0 disabled:hover:bg-gray-200 disabled:hover:ring-0 hover:bg-gray-200': props.theme === 'white',
            'bg-white text-blue-600 hover:bg-gray-200 hover:ring-1 hover:ring-offset-1 hover:ring-gray-200 active:ring-0 disabled:hover:bg-gray-200 disabled:hover:ring-0 rounded-[36px]': props.theme === 'rounded-white',
            'bg-gray-200 text-blue-600 hover:ring-1 hover:ring-offset-1 hover:ring-gray-200 active:ring-0 disabled:hover:bg-gray-200 disabled:hover:ring-0': props.theme === 'default-bg-accent',
            'text-blue-600 hover:bg-gray-200 disabled:hover:bg-transparent': props.theme === 'default-accent',
            'text-white bg-blue-600': props.theme === 'dark-blue',

            // Sizes
            'px-6 py-4 rounded-2xl': props.size === 'default',
            'p-1.5 px-4 rounded-xl text-base': props.size === 'xs',
            'px-6 py-2 rounded-xl text-sm': props.size === 'sm',
            'px-6 py-3 rounded-2xl font-medium': props.size === 'md',
            'p-2.5 rounded-xl': props.size === 'square'
        },
        content: {
            'gap-2.5': true
        },
        append: {
            'text-blue-600': props.theme === 'default'
        }
    }
})
</script>
<template>
    <ButtonBase
        class="btn"
        :classes="classes"
        :disabled="disabled"
        :href="href"
    >
        <template v-if="$slots.before" #before>
            <slot name="before" />
        </template>

        <slot />

        <!-- Скрыть иконку для маленькой кнопки -->
        <template v-if="size !== 'sm' && $slots.append" #append>
            <slot name="append" />
        </template>
    </ButtonBase>
</template>
