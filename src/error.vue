<script lang="ts" setup>
import TheHeader from '~/components/TheHeader.vue'
import TheButton from '~/components/Buttons/TheButton.vue'
interface ErrorPayload {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any,
    stack?: string; /** HTML */
}
const props = defineProps<{
    error: ErrorPayload
}>()

const statusCode = computed(() => props.error.statusCode)

</script>
<template>
    <div class="min-h-screen flex flex-col">
        <TheHeader />

        <div class="container my-auto md:my-8 md:flex md:flex-col md:grow">
            <div class="relative p-8 sm:p-6 bg-gray-50 rounded-4.5xl overflow-hidden md:flex md:flex-col md:h-full md:grow md:pb-14">
                <div class="absolute left-8 md:relative md:left-0 max-w-[280px] min-w-[280px]">
                    <p class="mb-4 sm:mb-6 text-4xl sm:text-2xl font-medium	">
                        Кажется, здесь ничего&nbsp;нет
                    </p>

                    <TheButton href="/" size="xs" class="pl-1.5" theme="dark-blue">
                        <template #before>
                            <IconsIconArrowBottom class="text-white fill-current w-6 h-6 rotate-[90deg]" />
                        </template>
                        На главную
                    </TheButton>
                </div>

                <p class="text-[523px] ml-auto w-fit leading-[0.8] text-blue-600 a-2xl:text-[523px] a-lg:text-[calc(1em_+_35vw)] a-sm:text-[calc(1em_+_30vw)] text-[calc(1em_+_38vw)] md:ml-0 md:my-auto sm:absolute sm:top-[43%]">
                    {{ statusCode }}
                </p>

                <div class="absolute bottom-0 right-0 w-full bg-404 md:bg-404-sm h-[279px] md:h-[61%] pointer-events-none" />
            </div>
        </div>
    </div>
</template>
