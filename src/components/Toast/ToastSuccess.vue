<script lang="ts" setup>
defineProps<{
    content: string; /** HTML */
}>()
</script>
<template>
    <div v-html="content" />
</template>
