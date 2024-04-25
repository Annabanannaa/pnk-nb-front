<script lang="ts" setup>
import FilePreview from '~/components/Form/FilePreview.vue'
import FileInputBase, { type FileInputBaseItem } from '~/components/Form/FileInputBase'


const pageTitle = 'Инпут файла'

const fileModel1 = ref<FileInputBaseItem[]>([])
const fileModel2 = ref<FileInputBaseItem[]>([])

const onRemoveFileModel = (itemId: string, source: Ref<FileInputBaseItem[]>) => {
    const foundIndex = source.value.findIndex(item => item.id === itemId)
    if (foundIndex === -1) {
        return
    }

    source.value.splice(foundIndex, 1)
}

const onRemoveFileModel1 = (itemId: string) => {
    onRemoveFileModel(itemId, fileModel1)
}
</script>
<template>
    <div class="container">
        <div class="flex items-center gap-3 text-3xl my-4">
            <NuxtLink
                to="/ui/"
                class="block mt-1 hover:text-green-500 transition-colors duration-200"
                aria-label="Вернуться на страницу списка компонентов"
            >
                <IconsIconArrowLeft class="fill-current w-6 h-6" />
            </NuxtLink>
            <span>{{ pageTitle }}</span>
        </div>

        <div>
            <div class="py-5">
                <FilePreview
                    v-for="item in fileModel1"
                    :key="item.id"
                    :file="item.file"
                    :error="item.error?.message"
                    @remove="onRemoveFileModel1(item.id)"
                />
            </div>
            <FileInputBase
                v-model:value="fileModel1"
                multiple
            >
                <template #default="{ inputId, dragEvents, isDragActive }">
                    <label
                        :for="inputId"
                        :class="{
                            'inline-flex items-center gap-3 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 px-6 py-10 border-2 border-dotted': true,
                            'border-gray-300': !isDragActive,
                            'border-green-500': isDragActive
                        }"
                        v-on="dragEvents"
                    >
                        <span class="font-bold text-3xl">+</span> Выберите или перетащите файл
                    </label>
                </template>
            </FileInputBase>

            <hr class="my-6">

            <FileInputBase
                v-model:value="fileModel2"
                multiple
            >
                <template #default="{ open }">
                    <button @click="open">
                        добавить файл
                    </button>
                </template>
            </FileInputBase>

            <div class="my-2">
                Значение: <pre>{{ fileModel2 }}</pre>
            </div>
        </div>
    </div>
</template>
