<script  lang="ts" setup>

defineProps<{
    type: string,
    city?: string,
    logo?: string
}>()
</script>
<template>
    <div class="bg-gray-50 py-4">
        <div class="container">
            <div class="relative flex md:block items-center">
                <NuxtLink class="a-lg:absolute a-lg:left-0 lg:relative block" to="/">
                    <img class=" max-h-[76px] md:max-h-12" :src="logo" alt="Региональный офис">
                </NuxtLink>
                <div class="w-full text-center md:text-left a-lg:max-w-[750px] a-lg:mx-auto ">
                    <template v-if="type === 'regional' || type === 'main'">
                        <p class="text-4.5xl text-blue-600 leading-13 md:text-2xl md:mt-5 md:leading-8 font-medium">
                            Региональный офис
                        </p>
                        <p v-if="city" class="text-blue-530 text-2xl md:text-base md:leading-6">
                            {{ city }}
                        </p>
                    </template>
                    <template v-if="type === 'specialized'">
                        <p class="text-blue-530 text-2xl md:text-base md:leading-6 md:mt-5">
                            Специализированный офис
                        </p>
                        <p class="text-3.5xl text-blue-600 leading-11 md:text-2xl md:leading-8 font-medium">
                            Налогообложение в процедурах банкротства
                        </p>
                    </template>
                    <template v-if="type === 'industry'">
                        <p class="text-blue-530 text-2xl md:text-base md:leading-6 md:mt-5">
                            Отраслевой офис
                        </p>
                        <p class="text-3.5xl text-blue-600 leading-11 md:text-2xl md:leading-8 font-medium">
                            Строительство
                        </p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
