<script lang="ts" setup>
const pageTitle = 'Алерты'

const isAlert3Visible = ref(true)
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

        <div class="grid grid-cols-5">
            <Alert
                title="Спасибо за ваш отзыв"
                description="Отзыв отправлен на проверку модератору и будет опубликован в ближайшее время"
            />
            <Alert
                type="error"
                title="Ошибка"
                description="При отправке отзыва возникла ошибка. Повторите попытку"
            />
            <Alert
                v-if="isAlert3Visible"
                type="error"
                :closable="true"
                title="Ошибка"
                description="При отправке отзыва возникла ошибка. Повторите попытку"
                @close-alert="isAlert3Visible = false"
            />
        </div>
    </div>
</template>
