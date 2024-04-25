<script lang="ts" setup>
withDefaults(
    defineProps<{
        opened?: boolean;
    }>(),
    {
        opened: true
    }
)
</script>
<template>
    <div
        :class="{
            'grid grid-cols-1 transition-[grid-template-rows] duration-500 ease-out': true,
            'grid-rows-[1fr]': opened,
            'grid-rows-[0fr]': !opened
        }"
    >
        <div class="overflow-hidden">
            <slot />
        </div>
    </div>
</template>

