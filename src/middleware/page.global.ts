import { usePageStore } from '~/stores/pageStore'

export default defineNuxtRouteMiddleware(async (to) => {
    const url = to.path

    const { data } = useApiFetch('/api/pages/', {
        params: {
            url
        }
    })

    const { metaInfo, setData } = usePageStore()
    if (data.value) {
        setData(data.value)
    }

    useSeoMeta(metaInfo)
})
