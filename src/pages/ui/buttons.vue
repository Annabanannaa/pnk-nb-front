<script lang="ts" setup>
import TheButton from '~/components/Buttons/TheButton.vue'

const pageTitle = 'Кнопки'
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
        <div class="flex items-start flex-wrap gap-x-5 gap-y-8">
            <TheButton>
                Default
            </TheButton>
            <TheButton>
                Default
                <template #append>
                    <IconsIconTelegram class="fill-current w-5 " />
                </template>
            </TheButton>
            <TheButton size="sm">
                Default sm
            </TheButton>
            <TheButton disabled>
                Default disabled
            </TheButton>
            <TheButton loading>
                Default
            </TheButton>
            <TheButton theme="accent">
                Accent
            </TheButton>
            <TheButton theme="accent">
                Accent

                <template #append>
                    <IconsIconTelegram class="fill-current w-5 " />
                </template>
            </TheButton>
            <TheButton theme="accent" disabled>
                Accent

                <template #append>
                    <IconsIconTelegram class="fill-current w-5 " />
                </template>
            </TheButton>
            <TheButton size="sm" theme="accent" loading>
                Accent

                <template #append>
                    <IconsIconTelegram class="fill-current w-5 " />
                </template>
            </TheButton>
            <TheButton theme="default-bg-accent">
                Bg Accent

                <template #append>
                    <IconsIconTelegram class="fill-current w-5 " />
                </template>
            </TheButton>
            <TheButton theme="default-bg-accent">
                Bg Accent
            </TheButton>
            <TheButton theme="default-bg-accent" size="sm">
                Bg Accent
            </TheButton>
            <TheButton theme="default-bg-accent" disabled>
                Bg Accent
            </TheButton>
            <TheButton theme="default-bg-accent" loading>
                Bg Accent
            </TheButton>
        </div>
    </div>
</template>
