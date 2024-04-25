<script lang="ts" setup>
import TheFooter from '~/components/TheFooter.vue'
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <div class="flex-1">
            <slot />
        </div>
        <TheFooter />
    </div>
</template>
