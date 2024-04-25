<script lang="ts" setup>

defineProps<{
    contactsData: {
        address: string;
        addressMapLink: string;
        workingHours: string;
        phones: string[];
        emails: string[];
    };
}>()

</script>

<template>
    <div class="rounded-4.5xl md:rounded-3xl a-sm:min-h-[142px] p-5 md:p-4 shadow-card grid grid-cols-2 md:grid-cols-1 md:gap-6 hover:bg-gray-50 hover:shadow-none">
        <div class="sm:text-sm a-sm:my-auto">
            <p class="mb-1 text-gray-500 font-medium leading-6 md:leading-5.5">
                Адрес центрального офиса
            </p>
            <p class="max-w-xl pr-4 font-medium leading-6 md:leading-5.5">
                {{ contactsData.address }}
            </p>
            <a
                class="block text-sm !text-blue-400 leading-[1.375rem] w-fit leading-5.5"
                :href="contactsData.addressMapLink"
                target="_blank"
            >
                Посмотреть на карте
            </a>
        </div>

        <div class="flex xs:flex-col justify-between flex-wrap gap-4 md:gap-6 sm:text-sm a-sm:my-auto">
            <div class="">
                <p class="mb-1 text-gray-500 font-medium leading-6 md:leading-5.5">
                    Телефон
                </p>
                <div class="flex flex-col gap-0.5 w-full">
                    <a
                        v-for="phone in contactsData.phones"
                        :key="phone"
                        :href="`tel:${phone}`"
                        class="block font-medium leading-5.5"
                    >
                        {{ phone }}
                    </a>
                </div>
            </div>
            <div class="md:w-full">
                <p class="mb-1 text-gray-500 font-medium leading-6 md:leading-5.5">
                    Почта
                </p>

                <a
                    v-for="email in contactsData.emails"
                    :key="email"
                    :href="`mailto:${email}`"
                    :title="email"
                    class="block font-medium md:leading-5.5 line-clamp-1 text-ellipsis"
                >
                    {{ email }}
                </a>
            </div>
            <div>
                <p class="mb-1 text-gray-500 font-medium leading-6 md:leading-5.5">
                    Время работы
                </p>
                <p class="font-medium max-w-52 md:max-w-full md:leading-5.5">
                    {{ contactsData.workingHours }}
                </p>
            </div>
        </div>
    </div>
</template>
