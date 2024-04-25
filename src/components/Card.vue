<script lang="ts" setup>
defineProps<{
    itemData: {
        id: string,
        title: string,
        routeName: string,
        link?: string,
        icon: any,
        description?: string
    },
    routeName: string,
}>()

</script>
<template>
    <div class="relative group px-4 py-7 bg-gray-50 rounded-3xl overflow-hidden">
        <div
            :class="{ 'opacity-100': routeName === itemData.routeName }"
            class="absolute md:hidden inset-0 bg-gradient-blue transition-opacity opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none"
        />
        <div class="relative mx-auto flex justify-center items-center h-[52px] w-[52px] mb-[18px] bg-white shadow-icon rounded-full">
            <div class="h-6 w-6">
                <slot name="icon" />
            </div>
        </div>
        <p
            :class="{ 'text-white': routeName === itemData.routeName }"
            class="relative text-blue-600 group-hover:text-white font-medium text-center"
        >
            {{ itemData.title }}
        </p>
        <NuxtLink
            v-if="itemData.link"
            :class="{ 'cursor-pointer': routeName !== itemData.routeName }"
            :to="itemData.link"
            class="absolute inset-0 z-10"
        />
    </div>
</template>
