<script setup lang="ts">
import useLayer from '~/composables/useLayer'
const layer = useLayer()
const onConfirm = async () => {
    const isConfirmed = await layer.confirm({
        title: 'Вы уверены?',
        description: 'Описание'
    })
    if (!isConfirmed) {
        layer.alert({
            title: 'Вы не согласились (',
            description: 'Окно закроется через 3 секунды',
            timeout: 3 * 1000
        })

        return
    }

    layer.alert({
        title: 'Вы согласились',
        description: 'Окно закроется через 2 секунды',
        timeout: 2 * 1000
    })
}

const onSayNameLayer = async () => {
    const response = await layer.open('SayNameLayer')
    if (!response) {
        layer.alert({
            title: 'Жаль',
            description: 'Модалка ничего не венула',
            timeout: 2 * 1000
        })

        return
    }

    layer.alert({
        title: 'Ура',
        description: `Модалка вернула "${ response }"`
    })
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
            <span>Модальные окна</span>
        </div>
        <ul>
            <li>
                <button @click="$layer.open('User/UserProfileLayer')">
                    User/UserProfileLayer
                </button>
            </li>
            <li>
                <button @click="$layer.open('TestLayer', { backgroundClose: false })">
                    Тестовая модалка
                </button>
            </li>
            <li>
                <button @click="$layer.open('TestLayer', { timeout: 3 * 1000 })">
                    Модалка, которая закроется через 3 секунды
                </button>
            </li>
            <li>
                <button @click="onSayNameLayer">
                    Модалка, которая вернет значение
                </button>
            </li>
            <li>
                <button @click="$layer.alert({ title: 'Hello', buttonCaption: 'Bye' })">
                    Alert
                </button>
            </li>
            <li>
                <button @click="onConfirm">
                    Confirm
                </button>
            </li>
            <li>
                <button @click="$layer.open('EmptyLayer', { title: 'Заблокированная модалка', description: 'Модалку нельзя закрыть', locked: true })">
                    Модалка, которую нельзя закрыть
                </button>
            </li>
            <li>
                <button @click="$layer.error({ title: 'Что-то пошло не так', reason: 'Почему так произошло' })">
                    Окно ошибки
                </button>
            </li>
            <li>
                <button @click="$layer.success({ title: 'Спасибо', description: 'Все получилось' })">
                    Окно успеха
                </button>
            </li>
        </ul>
    </div>
</template>
