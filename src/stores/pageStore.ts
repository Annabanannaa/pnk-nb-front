import type { DynamicPage } from '~/schemas/DynamicPage'
import type { UseSeoMetaInput } from '@unhead/schema'

const defaults = {
    title: 'Налоговое Бюро',
    description: 'Налоговое Бюро Палаты налоговых консультантов',
    image: '/images/poster.jpg'
}
export const usePageStore = defineStore('pageStore', () => {
    const runtimeConfig = useRuntimeConfig()
    const appUrl = computed(() => runtimeConfig.public.appUrl)

    const _rawData = ref<Partial<DynamicPage>>({})

    const setData = (page: Partial<DynamicPage>) => {
        _rawData.value = page
    }

    const title = computed(() => _rawData.value?.name || _rawData.value?.meta_title || defaults.title)
    const description = computed(() => _rawData.value?.meta_description || defaults.description)
    const image = computed(() => {
        return [appUrl.value, defaults.image].join('')
    })

    const metaInfo = computed<UseSeoMetaInput>(() => {
        const r = _rawData.value

        return {
            title: title.value,
            description: description.value,
            keywords: r?.meta_keywords,
            ogTitle: title.value,
            ogDescription: description.value,
            ogType: 'website' as UseSeoMetaInput['ogType'],
            applicationName: defaults.title,
            ogUrl: appUrl.value,
            ogImage: image.value,
            ogImageWidth: 1200,
            ogImageHeight: 630,
            ogLocale: 'ru_RU',
            ogSiteName: defaults.title
        }
    })

    return {
        setData,
        metaInfo
    }
})
