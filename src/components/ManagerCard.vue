<script  lang="ts" setup>
withDefaults(defineProps<{
    itemData: {
        id: number;
        name: string;
        position: string;
        description: string;
        img: string;
    },
    isSmall?: boolean
}>(), {
    isSmall: false
})

</script>
<template>
    <div class="p-5 sm:p-4 flex sm:flex-col gap-7 sm:gap-4 shadow-card-text rounded-4.5xl sm:rounded-3xl">
        <img
            :class="isSmall ? 'max-h-[263px] xs:min-h-[371px] xs:h-[371px]' : ' max-h-[195px] sm:min-h-[289px] sm:h-[289px]'"
            class="min-w-[210px] a-xs:object-contain sm:object-cover sm:max-w-full rounded-3xl overflow-hidden"
            :src="itemData.img"
        >
        <div>
            <p class="text-gray-500 sm:text-lg mb-2">
                {{ itemData.position }}
            </p>
            <p class="text-2xl mb-4 font-medium">
                {{ itemData.name }}
            </p>
            <p class="text-gray-800 font-medium sm:text-sm">
                {{ itemData.description }}
            </p>
        </div>
    </div>
</template>
