<script lang="ts" setup>
import { object, string, boolean, ValidationError } from 'yup'

import FileInputBase, { type FileInputBaseItem } from '~/components/Form/FileInputBase'
import BaseInput from '~/components/Form/BaseInput.vue'
import CheckboxField from '~/components/Form/CheckboxField.vue'
import TextareaField from '~/components/Form/TextareaField.vue'
import Captcha from '~/components/Captcha.vue'
import FilePreview from '~/components/Form/FilePreview.vue'
import TheButton from '~/components/Buttons/TheButton.vue'
import type { DynamicPage } from '~/schemas/DynamicPage'

import { VALIDATION_MESSAGES } from '~/constans/validationMessages'

import useLayer from '~/composables/useLayer'

defineProps<{
    page: string,
}>()

type InfoForm = {
    last_name: string;
    first_name: string;
    patronymic: string;
    email: string;
    region: string;
    phone: string;
    question: string;
    data_transfer: boolean;
    data_processing: boolean;
    captcha: string;
}

const FORM_INITIAL: InfoForm = {
    last_name: '',
    first_name: '',
    patronymic: '',
    email: '',
    region: '',
    phone: '',
    question: '',
    data_transfer: false,
    data_processing: false,
    captcha: ''
}

const formFiles = ref<FileInputBaseItem[]>([])

const onRemoveFileModel = (itemId: string, source: Ref<FileInputBaseItem[]>) => {
    const foundIndex = source.value.findIndex(item => item.id === itemId)
    if (foundIndex === -1) {
        return
    }

    source.value.splice(foundIndex, 1)
}

const onRemoveFormFiles = (itemId: string) => {
    onRemoveFileModel(itemId, formFiles)
}

const FORM_ERRORS_INITIAL_STATE = {
    last_name: null,
    first_name: null,
    data_transfer: null,
    data_processing: null,
    captcha: null,
    email: null
}

const formErrors = ref<any>({ ...FORM_ERRORS_INITIAL_STATE })

const validationSchema = object({
    email: string().email(VALIDATION_MESSAGES.EMAIL_INCORRECT).required(VALIDATION_MESSAGES.REQUIRED),
    first_name: string().required(VALIDATION_MESSAGES.REQUIRED),
    last_name: string().required(VALIDATION_MESSAGES.REQUIRED),
    data_transfer: boolean()
        .required(VALIDATION_MESSAGES.TRANSFER_OF_PERSONAL_DATA)
        .oneOf([true], VALIDATION_MESSAGES.TRANSFER_OF_PERSONAL_DATA),
    data_processing: boolean()
        .required(VALIDATION_MESSAGES.ACCEPT_TERMS_OF_USE)
        .oneOf([true], VALIDATION_MESSAGES.ACCEPT_TERMS_OF_USE),
    captcha: string().required(VALIDATION_MESSAGES.REQUIRED)
})

const formData = ref<InfoForm>({
    ...FORM_INITIAL
})

const pending = ref<boolean>(false)

const isFormValid = (): boolean => {
    resetErrors()

    try {
        validationSchema.validateSync(formData.value, { abortEarly: false })
        return true
    } catch (errors: any) {
        errors.inner.forEach((error: ValidationError) => {
            formErrors.value = { ...formErrors.value, ...{ [error.path as string]: error.message } }
        })
    }
    return false
}

const layer = useLayer()

const resetForm = () => {
    formData.value = {
        ...FORM_INITIAL
    }

    formFiles.value = []
}

const onSubmit = async (): Promise<void> => {
    if (!isFormValid()) {
        return
    }

    pending.value = true

    const documents = ref<any>([])

    const formDataForSend = new FormData()

    formFiles.value.forEach((item) => {
        documents.value.push(item.file)
    })

    documents.value.forEach((file: any, index: number) => {
        formDataForSend.append(`documents[${index}]`, file)
    })

    const options = {
        ...formData.value,
        hone_number: formData.value.phone,
        situation_content: formData.value.question,
        agreed_with_personal_data_processing_policy: formData.value.data_processing,
        agreed_with_transfer_of_personal_data: formData.value.data_transfer,
        service: 0
    }

    Object.entries(options).forEach(([key, value]: [string, any]) => {
        formDataForSend.append(key, value)
    })

    const { data: pageData, error } = await useApiFetch<DynamicPage>('/api/service_orders', {
        method: 'POST',
        body: formDataForSend
    })

    if (pageData.value) {
        layer.success({ title: 'Спасибо', description: 'Все получилось' })

        resetForm()
    }

    if (error.value) {
        layer.error({ title: 'Ошибка', description: 'При отправлении заявки возникла ошибка Повторите попытку' })
    }

    pending.value = false
}

const resetErrors = (): void => {
    formErrors.value = { ...FORM_ERRORS_INITIAL_STATE }
}

</script>

<template>
    <form class="relative p-8 md:p-4 rounded-4.5xl md:rounded-3xl bg-gradient-brand md:overflow-hidden" @submit.prevent="onSubmit">
        <p class="text-1.5xl md:text-lg font-medium mb-6">
            Заказать услугу
        </p>

        <div class="grid grid-cols-3 md:grid-cols-1 gap-4 mb-15 md:mb-6">
            <BaseInput
                v-model:value="formData.last_name"
                placeholder="Фамилия*"
                theme="white"
                name="last_name"
            >
                <template v-if="formErrors.last_name" #error="slotProps">
                    <span :class="slotProps.class">{{ formErrors.last_name }}</span>
                </template>
            </BaseInput>
            <BaseInput
                v-model:value="formData.first_name"
                placeholder="Имя*"
                theme="white"
                name="first_name"
            >
                <template v-if="formErrors.first_name" #error="slotProps">
                    <span :class="slotProps.class">{{ formErrors.first_name }}</span>
                </template>
            </BaseInput>
            <BaseInput
                v-model:value="formData.patronymic"
                placeholder="Отчество"
                theme="white"
                name="patronymic"
            />
            <BaseInput
                v-model:value="formData.email"
                placeholder="Email*"
                theme="white"
                name="email"
            >
                <template v-if="formErrors.email" #error="slotProps">
                    <span :class="slotProps.class">{{ formErrors.email }}</span>
                </template>
            </BaseInput>
            <BaseInput
                v-model:value="formData.region"
                placeholder="Ваш регион"
                theme="white"
                name="region"
            />
            <BaseInput
                v-model:value="formData.phone"
                placeholder="Телефон"
                theme="white"
                name="phone_number"
            />
        </div>
        <div class="flex flex-col gap-3">
            <TextareaField
                v-model:value="formData.question"
                placeholder="Задайте вопрос, опишите ситуацию"
                data-field-name="situation_content"
                name="situation_content"
            />

            <div v-if="formFiles.length" class="grid grid-cols-3 md:grid-cols-1 gap-3">
                <FilePreview
                    v-for="item in formFiles"
                    :key="item.id"
                    :file="item.file"
                    :error="item.error?.message"
                    @remove="onRemoveFormFiles(item.id)"
                />
            </div>

            <FileInputBase
                v-if="formFiles.length < 5"
                v-model:value="formFiles"
                class="md:w-full"
                multiple
                name="documents"
                :accept="['.PDF', '.PNG', '.JPG', '.JPEG', '.HEIC   ', '.DOCS']"
            >
                <template #default="{ inputId, dragEvents, isDragActive }">
                    <label
                        :for="inputId"
                        :class="{
                            'inline-flex items-center gap-3 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 bg-white px-6 py-2 rounded-xl': true,
                            'border-gray-300': !isDragActive,
                            'border-green-500': isDragActive
                        }"
                        class="text-blue-600 md:w-full md:leading-8 font-medium md:justify-center"
                        v-on="dragEvents"
                    >
                        Прикрепить документы
                        <IconsIconPlus class="fill-current w-[18px] h-[18px]" />
                    </label>
                </template>
            </FileInputBase>
        </div>

        <Captcha
            v-model:value="formData.captcha"
            :error="formErrors.captcha"
        />

        <div class="flex flex-col gap-2 sm:gap-6 relative z-10">
            <div class="flex gap-1 sm:gap-2">
                <CheckboxField
                    v-model:value="formData.data_processing"
                    :error="formErrors.data_processing"
                    :field-value="true"
                    name="agreed_with_personal_data_processing_policy"
                >
                    <span class="block sm:text-sm text-gray-800">Согласен с
                        <NuxtLink target="_blank" href="https://creonit.ru/" class="text-blue-400 contents"> политикой обработки персональных данных </NuxtLink>
                    </span>
                </CheckboxField>
            </div>
            <div class="flex gap-1 sm:gap-2">
                <CheckboxField
                    v-model:value="formData.data_transfer"
                    :error="formErrors.data_transfer"
                    :field-value="true"
                    name="agreed_with_transfer_of_personal_data"
                >
                    <span class="sm:text-sm text-gray-800">Разрешаю передачу персональных данных</span>
                </CheckboxField>
            </div>
        </div>

        <TheButton
            type="submit"
            class="relative z-10 w-full mt-6 leading-[30px] md:leading-5 md:py-3"
            size="default"
            theme="accent"
        >
            Отправить
        </TheButton>

        <div class="">
            <picture>
                <source srcset="/images/OrderFormMoobile.svg" media="(max-width: 800px)">
                <img class="absolute right-0 bottom-0 w-[391px] h-[400px] md:w-[180px] md:h-[160px] md:-bottom-3 sm:-right-4" src="/images/OrderForm.svg" alt="OrderForm">
            </picture>
        </div>
    </form>
</template>
