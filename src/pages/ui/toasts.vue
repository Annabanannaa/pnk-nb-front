<script lang="ts" setup>
import { showSuccessToast } from '~/helpers/toasts'

const pageTitle = 'Toast-ы'

const onSuccess = () => {
    showSuccessToast('showSuccessToast')
}

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
            <div>
                <button @click="onSuccess">
                    showSuccessToast <code>'~/helpers/toasts'</code>
                </button>
            </div>
        </div>
    </div>
</template>
