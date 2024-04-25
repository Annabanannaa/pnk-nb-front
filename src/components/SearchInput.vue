<script lang="ts" setup>
import BaseInput from '~/components/Form/BaseInput.vue'

const props = defineProps<{
    title: string,
    value: string,
}>()

const emit = defineEmits(['update:value'])


const search = computed<string>({
    get () {
        return props.value
    },
    set (value: string) {
        emit('update:value', value)
    }
})

</script>

<template>
    <BaseInput
        v-model:value="search"
        :placeholder="title"
        theme="gray"
        class="input-search w-full"
    >
        <template #suffix>
            <IconsIconSearch class="w-6 h-7 md:h-4 my-auto" />
        </template>
    </BaseInput>
</template>
