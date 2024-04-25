<script lang="ts" setup>
useHead({
    script: [
        {
            id: 'ya-captcha',
            defer: true,
            src: 'https://smartcaptcha.yandexcloud.net/captcha.js'
        }
    ]
})

const emit = defineEmits(['update:value'])

defineProps<{
    value: string,
    error?: string,
}>()

let mo: MutationObserver | null = null

const captcha = ref<HTMLDivElement | null>(null)

watch(captcha, (value) => {
    if (!value) return

    const targetElement: HTMLInputElement | null =
        value.querySelector('input[name="smart-token"]')

    if (!targetElement) return

    mo = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                emit('update:value', targetElement.value)
            }
        }
    })

    mo.observe(targetElement, { attributes: true })
})

onBeforeUnmount(() => {
    try {
        if (mo) {
            mo.disconnect()
        }
    } catch (e) {
        console.log(e)
    }
})

const runtimeConfig = useRuntimeConfig()
const yaCaptchaKey = computed(() => {
    return runtimeConfig.public.yaCaptcha
})

</script>

<template>
    <div
        id="captcha-container"
        ref="captcha"
        :class="{ 'border border-red-500 rounded-t-[11px] rounded-b-[8px]': error }"
        class="smart-captcha relative z-10 my-8 max-w-[644px]"
        :data-sitekey="yaCaptchaKey"
    />
</template>

