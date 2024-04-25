<script lang="ts" setup>
const pageTitle = 'Тултипы'
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
            <div class="grid grid-cols-4">
                <div>
                    <button v-tooltip="{ content: 'help text' }" class="inline-flex w-7 h-7 items-center justify-center rounded-full">
                        ?
                    </button>
                </div>
                <div>
                    <button v-tooltip="{ content: 'help text', placement: 'bottom' }" class="inline-flex w-7 h-7 items-center justify-center rounded-full">
                        ?
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
