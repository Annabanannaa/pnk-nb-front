<script lang="ts" setup>
import PopoverBase from '~/components/Popover/PopoverBase.vue'

const pageTitle = 'Popover-ы'
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
            <div class="">
                <span class="text-xl">
                    Lorem ipsum dolor
                </span>
                <PopoverBase class="inline-block">
                    <template #action="{ shown }">
                        <button>
                            {{ shown ? 'Закрыть' : 'Открыть' }}
                        </button>
                    </template>
                    <template #content="{ hide }">
                        <div class="max-w-[281px] p-6">
                            <button @click="hide">
                                Х
                            </button>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Adipisci at deserunt est nemo quas ratione reprehenderit
                                soluta ullam veniam? Corporis dicta dolorem incidunt nam,
                                obcaecati quaerat sint sunt tempore voluptates.
                            </div>
                        </div>
                    </template>
                </PopoverBase>
            </div>
        </div>
    </div>
</template>
