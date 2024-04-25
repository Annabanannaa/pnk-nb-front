<script lang="ts" setup>
const props = withDefaults(defineProps<{
    value: string
}>(), {
    value: ''
})

const emit = defineEmits(['update:value'])

const inputValue = computed<string | number>({
    get (): string | number {
        return props.value
    },
    set (value: string | number) {
        emit('update:value', value)
    }
})

const isFocused = ref(false)
</script>
<template>
    <textarea
        v-model="inputValue"
        maxlength="3000"
        class="w-full h-32 md:h-20 px-6 py-4 md:p-4 rounded-2xl resize-none"
        placeholder="Задайте вопрос, опишите ситуацию"
    />
</template>

