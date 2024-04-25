<script lang="ts" setup>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <TheHeader />
        <div class="flex-1">
            <slot />
        </div>
        <TheFooter />
    </div>
</template>
