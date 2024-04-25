<script lang="ts" setup>
const props = defineProps<{
    to: string;
}>()

const isExternalLink = computed(() => /^(https?|www\.|\/\/)/.test(props.to) || !String(props.to).startsWith('/'))

const target = computed(() => isExternalLink.value ? '_blank' : '')

</script>
<template>
    <NuxtLink :target="target" :to="to" :external="isExternalLink">
        <slot />
    </NuxtLink>
</template>
