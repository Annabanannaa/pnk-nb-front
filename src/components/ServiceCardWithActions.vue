<script lang="ts" setup>
import TheButton from '~/components/Buttons/TheButton.vue'

interface tagItem {
    id: number;
    content: string
}

defineProps<{
    itemData: {
        id: number,
        name: string,
        tags: tagItem[],
        link: string
    },
}>()

</script>

<template>
    <div
        role="tabpanel"
        tabindex="0"
        class="relative flex flex-col md:flex-row md:items-center p-6 md:px-4 md:py-6 rounded-4.5xl md:rounded-3xl shadow-card min-h-[17.125rem] md:min-h-[6.25rem] group border-b-[6px] md:border-b-0 border-white hover:border-blue-600 md:hover:border-none md:hover:bg-none focus-visible:border-blue-600 overflow-hidden"
    >
        <div class="absolute md:hidden inset-0 bg-gradient-blue transition-opacity opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none" />
        <p class="absolute md:relative top-2/4 -translate-y-2/4 px-6 md:px-0 w-full left-0 transition-opacity group-hover:opacity-0 md:group-hover:opacity-100 text-2xl md:text-lg text-blue-600 my-auto font-medium">
            {{ itemData.name }}
        </p>

        <p class="relative md:hidden opacity-0 text-2xl md:text-lg font-medium transition-opacity group-hover:opacity-100 mt-0 text-white mb-[26px] md:group-hover:text-blue-600 group-focus-visible:text-white">
            {{ itemData.name }}
        </p>

        <div class="relative mt-auto md:my-auto flex gap-3 items-end opacity-0 md:opacity-100 group-hover:opacity-100 group-focus-visible:100 group-focus:flex">
            <div class="flex flex-wrap gap-2 md:hidden">
                <p
                    v-for="tag in itemData.tags"
                    :key="tag.id"
                    class="border border-white py-[3px] px-2.5 font-medium text-sm rounded-xl text-white"
                >
                    {{ tag.content }}
                </p>
            </div>
            <TheButton
                class="relative ml-auto mt-auto min-w-fit py-2.5 md:hidden !px-3"
                size="sm"
                theme="rounded-white"
            >
                <NuxtLink :to="`/services/${itemData.id}/`" class="absolute inset-0 z-10" />

                Заказать услугу
            </TheButton>
            <TheButton :href="`/services/${itemData.id}/`" theme="default-bg-accent" size="square" class="a-md:hidden">
                <template #append>
                    <IconsIconArrowBottom class="w-7 md:w-5 h-7 md:h-5 rotate-[270deg]" />
                </template>
            </TheButton>
        </div>
    </div>
</template>
