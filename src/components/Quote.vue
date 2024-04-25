<script lang="ts" setup>

import Typograph from '~/components/Typograph.vue'

defineProps<{
    quoteData: {
        title: string;
        text: string;
    };
}>()

</script>

<template>
    <div
        class="rounded-2xl p-6 bg-gray-50"
    >
        <p class="font-medium md:text-lg">
            {{ quoteData.title }}
        </p>
        <Typograph
            v-if="quoteData.text"
            class="space-y-6 mt-4"
            :html="quoteData.text"
        />
    </div>
</template>
