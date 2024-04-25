<script lang="ts" setup>
import InputFieldBase from '~/components/Form/InputFieldBase.vue'

withDefaults(
    defineProps<{
        isCompact?: boolean;
        title?: string;
    }>(),
    {
        isCompact: false,
        title: ''
    }
)
</script>
<template>
    <label class="relative">
        <span
            v-if="isCompact && title"
            :class="{
                'absolute inset-0 pointer-events-none': true
            }"
        >
            {{ title }}
        </span>
        <InputFieldBase />
    </label>
</template>
