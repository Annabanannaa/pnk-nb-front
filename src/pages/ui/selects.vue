<script lang="ts" setup>
import SelectFieldBase from '~/components/Form/SelectFieldBase.vue'

/**
 * Обынчный селект
 */
const simpleSelectModel = ref(null)
const simpleSelectOptions = [1, 2, 3, 4]
/** ========== */

/**
 * Обынчный селект опции которого объекты
 */
const simpleObjectSelectModel = ref(null)
const simpleObjectSelectOptions = [
    {
        value: 1,
        label: 'First'
    },
    {
        value: 2,
        label: 'Second'
    },
    {
        value: 3,
        label: 'Third'
    }
]
/** ========== */

/**
 * Селект с поиском
 */

const selectedOption = ref({
    id: 201,
    first_name: 'Rhys',
    last_name: 'McGinnell',
    email: 'rmcginnell5k@quantcast.com',
    gender: 'Male',
    ip_address: '168.130.139.37'
})

const selectSearchQeury = ref('')

const listRequestParams = computed(() => {
    return {
        search: selectSearchQeury.value
    }
})

const { data, pending: isSearchPending } = useApiFetch<{ results: Array<any>}>('/api/users/', {
    baseURL: '/',
    params: listRequestParams,
    lazy: true,
    server: false
})

const addressOptions = computed(() => {
    return (data.value?.results && Array.isArray(data.value.results) ? data.value.results : [])
})

/** ========== */
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
            <span>Селекты</span>
        </div>
        <div class="my-4">
            <div class="p-4">
                <div class="font-semibold mb-2">
                    Обычный селект
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div class="mb-3">
                        <div class="mb-1">
                            Опции - числа ({{ simpleSelectOptions }})
                        </div>
                        <SelectFieldBase
                            v-model:value="simpleSelectModel"
                            :options="simpleSelectOptions"
                        />
                        <pre class="text-sm mt-2">Значение: {{ simpleSelectModel }}</pre>
                    </div>
                    <div class="mb-3">
                        <div class="mb-1">
                            Опции - объекты (<code>[{ value, label }]</code>)
                        </div>
                        <SelectFieldBase
                            v-model:value="simpleObjectSelectModel"
                            :options="simpleObjectSelectOptions"
                        />
                        <pre class="text-sm mt-2">Значение: {{ simpleObjectSelectModel }}</pre>
                    </div>
                    <div class="mb-3">
                        <div class="mb-1">
                            С кнопкой сброса (<code>:can-clear="true"</code>)
                        </div>
                        <SelectFieldBase
                            v-model:value="simpleObjectSelectModel"
                            :options="simpleObjectSelectOptions"
                            :can-clear="true"
                        />
                        <pre class="text-sm mt-2">Значение: {{ simpleObjectSelectModel }}</pre>
                    </div>
                    <div class="mb-3">
                        <div class="mb-1">
                            Контент вместо стрелки
                        </div>
                        <SelectFieldBase
                            v-model:value="simpleObjectSelectModel"
                            :options="simpleObjectSelectOptions"
                        >
                            <template #caret>
                                <svg
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="relative mr-3 fill-current"
                                >
                                    <path d="M6.67544 0C10.086 0 12.8509 2.76484 12.8509 6.17544C12.8509 7.57706 12.3839 8.86962 11.5971 9.90604L16.2534 14.5624C16.5822 14.8913 16.5822 15.4245 16.2534 15.7534C15.9544 16.0523 15.4866 16.0795 15.1569 15.8349L15.0624 15.7534L10.406 11.0971C9.36962 11.8839 8.07706 12.3509 6.67544 12.3509C3.26484 12.3509 0.5 9.58604 0.5 6.17544C0.5 2.76484 3.26484 0 6.67544 0ZM6.67544 1.68421C4.195 1.68421 2.18421 3.695 2.18421 6.17544C2.18421 8.65587 4.195 10.6667 6.67544 10.6667C9.15587 10.6667 11.1667 8.65587 11.1667 6.17544C11.1667 3.695 9.15587 1.68421 6.67544 1.68421Z" />
                                </svg>
                            </template>
                        </SelectFieldBase>
                        <pre class="text-sm mt-2">Значение: {{ simpleObjectSelectModel }}</pre>
                    </div>
                    <div class="mb-3">
                        <div class="mb-1">
                            С удаленным поиском. Выбранного текущего значения нет в списке. Это частая практика,
                            когда есть огромный справочник где выбранного значения может не быть в списке. В таком
                            случае, сервер должен отдавать этот объект полностью (или как минимум value-prop и label-prop - в нашем случае это <code>{id: number, first_name: string}</code>) из сущности, куда сохранено это значение.
                        </div>
                        <SelectFieldBase
                            v-model:value="selectedOption"
                            :options="addressOptions"
                            label-prop="first_name"
                            value-prop="id"
                            :searchable="true"
                            :is-object="true"
                            :can-clear="true"
                            :is-loading="isSearchPending"
                            @search="selectSearchQeury = $event"
                        />
                        <pre class="text-sm mt-2">Значение: {{ selectedOption }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
