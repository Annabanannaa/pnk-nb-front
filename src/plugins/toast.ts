import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/css/components/toast.css'

const options: PluginOptions = {
    timeout: 3000,
    closeOnClick: true,
    shareAppContext: true,
    icon: false,
    closeButton: false,
    hideProgressBar: true
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, options)
})
