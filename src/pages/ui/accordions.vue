<script lang="ts" setup>
import DisclosureItem from '~/components/Disclosure/DisclosureItem.vue'

const pageTitle = 'Аккордеоны'

const openedItems = ref<number[]>([])
const faqList = [
    {
        id: 1,
        title: 'Lorem'
    },
    {
        id: 2,
        title: 'Lorem 2'
    }
]

const openedItemsRounded = ref<number[]>([])
const faqListRounded = [
    {
        id: 1,
        title: 'Lorem'
    },
    {
        id: 2,
        title: 'Lorem 2'
    }
]
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

        <div class="flex flex-col gap-6 sm:gap-4 my-10">
            <DisclosureItem
                v-for="faq in faqList"
                :key="faq.id"
                v-model:value="openedItems"
                :current-value="faq.id"
            >
                <template #title>
                    {{ faq.title }}
                </template>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto, assumenda corporis eaque inventore laboriosam magni obcaecati, quibusdam, quod temporibus velit veniam veritatis voluptatibus. Beatae consectetur culpa dolore quisquam ullam!
                </div>
            </DisclosureItem>
            <DisclosureItem
                v-for="faq in faqListRounded"
                :key="faq.id"
                v-model:value="openedItemsRounded"
                :current-value="faq.id"
                theme="rounded"
            >
                <template #title>
                    {{ faq.title }}
                </template>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto, assumenda corporis eaque inventore laboriosam magni obcaecati, quibusdam, quod temporibus velit veniam veritatis voluptatibus. Beatae consectetur culpa dolore quisquam ullam!
                </div>
            </DisclosureItem>
        </div>
    </div>
</template>
