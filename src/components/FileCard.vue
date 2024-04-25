<script lang="ts" setup>

const props = defineProps<{
    file: {
        name: string;
        size: string;
        extension: string | undefined;
    };
}>()

const emit = defineEmits(['remove'])

const onRemove = () => {
    emit('remove', props.file)
}
</script>
<template>
    <div class="bg-white rounded-2xl p-3 flex gap-3 items-center">
        <div class="flex flex-auto gap-2.5 items-center w-full overflow-hidden">
            <IconsIconDocument class="fill-current w-8 h-8 shrink-0" />

            <div class="shrink overflow-hidden">
                <p class="md:text-sm truncate">
                    {{ file.name }}
                </p>

                <div class="flex gap-2 text-sm md:text-xs text-gray-500">
                    <span>{{ file.extension }}</span>
                    <span>{{ file.size }}</span>
                </div>
            </div>
        </div>
        <button class="shrink-0 basis-10" @click="onRemove">
            <IconsIconClose class="fill-current w-5 h-5" />
        </button>
    </div>
</template>
