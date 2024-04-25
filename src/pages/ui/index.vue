<script lang="ts" setup>
const pageTitle = ref('Компоненты')
</script>
<template>
    <div class="container">
        <div class="text-3xl my-4">
            {{ pageTitle }}
        </div>

        <ul>
            <li>
                <NuxtLink to="/ui/buttons/" aria-label="Страница кнопок">
                    Кнопки
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/inputs/" aria-label="Страница инпутов">
                    Инпуты
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/modals/" aria-label="Страница модалок">
                    Модалки
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/pagination/" aria-label="Страница пагинации">
                    Пагинация
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/lists/" aria-label="Страница списка">
                    Списки
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/selects/" aria-label="Страница с селектами">
                    Селекты
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/storage/" aria-label="Управление контентом">
                    Управление контентом
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/toggles/" aria-label="Тоглы">
                    Тоглы (чекбоксы и радио)
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/alerts/" aria-label="Алерты">
                    Алерты
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/popovers/" aria-label="Popover-ы">
                    Popover-ы
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/toasts/" aria-label="Toast-ы">
                    Toast-ы
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/tooltips/" aria-label="Тултипы">
                    Тултипы
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/file-input/" aria-label="Инпут файла">
                    Инпут файла
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ui/accordions/" aria-label="Аккордеоны">
                    Аккордеоны
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>
