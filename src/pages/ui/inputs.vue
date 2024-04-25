<script lang="ts" setup>
import BaseFormField from '~/components/Form/BaseFormField.vue'
import BaseInput from '~/components/Form/BaseInput.vue'

const input1 = ref('')
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
            <span>Инпуты</span>
        </div>

        <div class="my-4">
            <div class="p-4 grid grid-cols-4 gap-4">
                <BaseFormField
                    title="Введите имя"
                    error="Обязательное поле"
                >
                    <template #default="slotPayload">
                        <span :class="slotPayload.class">Мельникова Елизавета Владимировна</span>
                    </template>

                    <template #prefix>
                        >
                    </template>

                    <template #suffix>
                        >
                    </template>
                </BaseFormField>
                <BaseFormField
                    title="Введите имя"
                    :is-material="true"
                    :value="input1"
                >
                    <template #default="slotPayload">
                        <span :class="slotPayload.class">{{ input1 }}&nbsp;</span>
                    </template>
                </BaseFormField>
                <BaseInput
                    v-model:value="input1"
                    title="Введите имя"
                />
                <BaseInput
                    v-model:value="input1"
                    title="Введите имя"
                    :is-material="true"
                />
            </div>
        </div>
    </div>
</template>
