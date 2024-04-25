<script setup lang="ts">
import { getPageFromQuery } from '~/helpers/paginationHelper'
import { useGenericList } from '~/components/ListGeneric'

const route = useRoute()

const UsersList = useGenericList<{
    email: string;
    last_name: string;
    first_name: string;
}>()

const searchModel = ref('')

const dataSource = computed(() => {
    return {
        url: '/api/users/',
        debounce: 500,
        params: {
            search: searchModel.value
        }
    }
})

const currentRoute = computed(() => {
    const query: Record<string, any> = {
        ...(route.query || {}),
        page: getPageFromQuery(route.query.page),
        search: searchModel.value
    }

    if (!searchModel.value) {
        delete query.search
    }
    return {
        query
    }
})
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
            <span>Списки</span>
        </div>
        <div class="my-4">
            <label>
                <span class="block mb-1 text-gray-600 font-semibold">Search</span>
                <input v-model="searchModel" type="text" class="w-full px-3 py-1.5 border border-purple-500 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 focus:outline-none">
            </label>
        </div>
        <UsersList
            :data-source="dataSource"
            :pagination="{
                initialPage: currentRoute.query.page,
                limit: 8,
                useLinks: true,
                route: currentRoute
            }"
            class="relative"
            :classes="{
                pagination: 'mt-6',
                listContainer: 'flex flex-col gap-3'
            }"
        >
            <template #error="{ response }">
                <pre>{{ response?.data?.detail }}</pre>
            </template>
            <template #item="{ item }">
                <div class="block border border-gray-300 rounded-md px-3 py-5">
                    <div class="font-semibold mb-2">
                        {{ [item.first_name, item.last_name].filter(Boolean).join(' ') }}
                    </div>
                    <div>
                        Email: {{ item.email }}
                    </div>
                </div>
            </template>
        </UsersList>
    </div>
</template>
