import useApiFetch from '~/composables/useApiFetch'
import type { DynamicPage } from '~/schemas/DynamicPage'
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import { callWithNuxt } from '#app'

export default async function usePageContentBlocks (url: string) {
    const nuxtApp = useNuxtApp()
    const { data: page } = await callWithNuxt(nuxtApp, () => useApiFetch<DynamicPage>('/api/pages', {
        params: {
            url
        }
    }))

    if (!page.value?.content) {
        return {
            page,
            widgets: ref(null)
        }
    }

    const { data: widgets } = await callWithNuxt(nuxtApp, () => useApiFetch<ContentWidgetBase[]>(computed(() => `/api/content_blocks/${ page.value?.content }`)))

    return {
        page,
        widgets
    }
}
