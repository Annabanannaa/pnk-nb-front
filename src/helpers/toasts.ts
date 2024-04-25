import { useToast } from 'vue-toastification'
import ToastSuccess from '~/components/Toast/ToastSuccess.vue'

const toast = useToast()

/** Toast успеха */
export const showSuccessToast = (content: string): void => {
    toast({
        component: ToastSuccess,
        props: {
            content
        }
    })
}

/**
 * Дальше, таким же образом при необходимости надо создавать
 * для ошибки и остальных случаев (showErrorToast...)
 * */
