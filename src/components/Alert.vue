<script lang="ts" setup>

type AlertType = 'success' | 'error'

interface AlertProps {
    type?: AlertType;
    title?: string;
    description?: string;
    closable?: boolean;
}

const ICONS_MAP = {
    success: defineAsyncComponent(() => import('@/components/Icons/IconSuccessCircle.vue')),
    error: defineAsyncComponent(() => import('@/components/Icons/IconCircleError.vue'))
}

const props = withDefaults(
    defineProps<AlertProps>(),
    {
        type: 'success',
        title: '',
        description: '',
        closable: false
    }
)

defineEmits(['close-alert'])

const statusIcon = computed(() => {
    return {
        component: ICONS_MAP[props.type],
        classes: {
            'w-12 h-12': true,
            'fill-red-500 stroke-red-500': props.type === 'error',
            'fill-blue-600': props.type === 'success'
        }
    }
})

const closeIconComponent = computed(() => {
    if (!props.closable) {
        return null
    }

    return defineAsyncComponent(() => import('@/components/Icons/IconCross.vue'))
})
</script>
<template>
    <div class="py-8 px-6 text-center relative">
        <button
            v-if="closeIconComponent"
            class="absolute w-5 h-5 right-6 top-6 hover:opacity-60"
            @click="$emit('close-alert')"
        >
            <Component :is="closeIconComponent" class="fill-current" />
        </button>
        <div v-if="statusIcon.component" class="flex justify-center mb-6">
            <Component
                :is="statusIcon.component"
                :class="statusIcon.classes"
            />
        </div>
        <div
            v-if="title || $slots.title"
            :class="{
                'text-xl font-medium': true,
                'mb-3': description || $slots.description
            }"
        >
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <div v-if="description || $slots.description" class="text-sm text-gray-500 max-w-[378px] mx-auto">
            <slot name="description">
                {{ description }}
            </slot>
        </div>
    </div>
</template>
