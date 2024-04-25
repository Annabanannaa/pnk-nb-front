<script lang="ts" setup>
import FileCard from '~/components/FileCard.vue'

const props = defineProps<{
    file: File;
    error?: string;
}>()

const emit = defineEmits(['remove'])

const fileData = computed(() => {
    const fileSize = props.file.size || 0
    const extension = ((props.file.name).split('.').pop())?.toUpperCase()
    return {
        name: props.file.name,
        size: (fileSize / (1024 * 1024)).toFixed(1) + ' МБ',
        extension
    }
})
const onRemove = () => {
    emit('remove', props.file)
}
</script>
<template>
    <div>
        <FileCard
            :file="fileData"
            @remove="onRemove"
        />

<!--        <div class="error" v-if="error">-->
<!--            {{ error }}-->
<!--        </div>-->
    </div>
</template>
