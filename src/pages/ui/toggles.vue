<script lang="ts" setup>
import CheckboxField from '~/components/Form/CheckboxField.vue'
import RadioField from '~/components/Form/RadioField.vue'

const pageTitle = 'Тоглы (чекбоксы и радио)'

const inputModel = ref(false)
const objectsModel = ref()

const objects = [
    {
        title: 'Object 1',
        value: 1
    },
    {
        title: 'Object 2',
        value: 2
    },
    {
        title: 'Object 3',
        value: 3
    },
    {
        title: 'Object 4',
        value: 4
    }
]

const variants = [
    {
        title: 'Вариант 1',
        value: 1
    },
    {
        title: 'Вариант 2',
        value: 2
    },
    {
        title: 'Вариант 3',
        value: 3
    },
    {
        title: 'Вариант 4',
        value: 4
    }
]
const variantModel = ref([])
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
            <div class="mb-4 pb-4 border-b border-gray-300">
                <div>
                    <code>Значение: {{ objectsModel }}</code>
                </div>
                <div class="flex gap-3">
                    <RadioField
                        v-for="item in objects"
                        :key="item.value"
                        v-model:value="objectsModel"
                        :field-value="item.value"
                        class="inline-flex focus-visible:ring group group-focus-visible:bg-red-500"
                        :classes="{
                            label: 'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1'
                        }"
                        type="radio"
                        :label="item.title"
                    />
                </div>
            </div>
            <div class="mb-4 pb-4 border-b border-gray-300">
                <div>
                    <code>Значение: {{ inputModel }}</code>
                </div>
                <CheckboxField
                    v-model:value="inputModel"
                    :field-value="true"
                    label="label"
                />
            </div>
            <div class="mb-4 pb-4 border-b border-gray-300">
                <div>
                    <code>Значение: {{ variantModel }}</code>
                </div>
                <div class="flex gap-3">
                    <CheckboxField
                        v-for="variant in variants"
                        :key="variant.value"
                        v-model:value="variantModel"
                        :field-value="variant.value"
                    >
                        &raquo; {{ variant.title }} &laquo;
                    </CheckboxField>
                </div>
            </div>
        </div>
    </div>
</template>
