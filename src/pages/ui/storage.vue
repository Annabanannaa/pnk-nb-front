<script lang="ts" setup>
import useRemoteStorage from '~/composables/useRemoteStorage'

const socials = await useRemoteStorage<{title: string; link: string;}[]>('socials')

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
            <span>Управление контентом</span>
        </div>

        <div class="socials">
            <div v-for="social in socials" :key="social.link">
                <span>{{ social.title }}</span>
            </div>
        </div>
    </div>
</template>
