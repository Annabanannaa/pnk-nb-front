<script lang="ts" setup>
withDefaults(
    defineProps<{
        cellData: string | number;
        cellTitle?: string;
        isTitleCell?: boolean;
        id?: number | null;
    }>(),
    {
        isTitleCell: false,
        cellTitle: '',
        id: null
    }
)

</script>
<template>
    <div
        class="flex md:flex-col items-start p-4 md:p-0"
    >
        <p v-if="cellTitle" class="a-md:hidden text-sm text-gray-500 mt-2.5 md:leading-5.5">
            {{ cellTitle }}
        </p>

        <div
            :class="{ 'md:font-medium md:flex md:justify-between items-center': isTitleCell }"
            class="text-sm md:text-base w-full"
        >
            {{ cellData }}

            <IconsIconArrowBottom :class="{ 'md:block': isTitleCell }" class="hidden min-w-6 w-6 ml-2 opacity-50" />
        </div>
    </div>
</template>
