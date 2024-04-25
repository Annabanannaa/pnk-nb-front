<script lang="ts" setup>
import { boolean } from 'yup'

interface BreadcrumbItem {
    title: string;
    link: string;
}
const props = defineProps<{
    items: BreadcrumbItem[]
}>()

const index = ref<number>(props.items?.length - 2)
const penultimateItem = ref<BreadcrumbItem | undefined>(props.items.at(index.value))

</script>
<template>
    <div v-if="items.length > 1" class="container my-4 overflow-hidden">
        <div class="flex items-end gap-1 text-text-2 text-xs max-w-full overflow-hidden">
            <div
                v-for="(item, itemIndex) in items"
                :key="item.link"
                class="relative sm:hidden flex items-end gap-1 max-w-[75%] overflow-hidden"
            >
                <span
                    v-if="itemIndex >= items.length - 1"
                    class=" truncate text-ellipsis whitespace-nowrap overflow-hidden text-gray-500 text-xs	"
                >
                    {{ item.title }}
                </span>

                <NuxtLink
                    v-else
                    :to="item.link"
                    class="truncate text-ellipsis whitespace-nowrap !text-gray-500 hover:!text-blue text-xs"
                    :aria-label="item.title"
                >
                    {{ item.title }}
                </NuxtLink>

                <span v-if="itemIndex < items.length - 1">
                    <IconsIconArrowBottom class="text-gray-500 fill-current w-4 h-4 rotate-[270deg]" />
                </span>
            </div>
            <NuxtLink
                :to="penultimateItem?.link"
                class="a-sm:!hidden"
            >
                <IconsIconArrowLeft class="text-gray-500 fill-current w-6 h-6" />
            </NuxtLink>
        </div>
    </div>
</template>
