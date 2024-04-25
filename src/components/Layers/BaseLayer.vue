<script lang="ts" setup>
withDefaults(
    defineProps<{
        containerClasses?: string,
        showCloseIcon?: boolean,
        blockClasses?: string
    }>(),
    {
        containerClasses: 'max-w-[31.25rem] md:p-4',
        showCloseIcon: true,
        blockClasses: 'bg-white rounded-2xl p-6 md:p-4'
    }
)

defineEmits(['close'])
</script>

<template>
    <div class="layer break-word">
        <div
            :class="{
                'layer-container w-full': true,
                [containerClasses]: true
            }"
        >
            <div :class="blockClasses">
                <div class="flex items-center gap-3">
                    <h1 v-if="$slots.title" class="flex-auto text-xl font-medium">
                        <slot name="title" />
                    </h1>

                    <button
                        v-if="showCloseIcon"
                        class="relative z-10 flex-initial hover:opacity-70 ml-auto"
                        @click="$emit('close')"
                    >
                        ×
                    </button>
                </div>

                <slot />
            </div>
        </div>
    </div>
</template>
