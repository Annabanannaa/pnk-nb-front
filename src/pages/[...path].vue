<script lang="ts" setup>
import type { DynamicPage } from '~/schemas/DynamicPage'
import type { ContentWidgetBase } from '~/components/ContentWidgets/ContentWidgetFactory'
import type { ContentWidget } from '~/schemas/ContentWidget'

import ContentWidgetFactory from '~/components/ContentWidgets/ContentWidgetFactory'

const route = useRoute()

onBeforeRouteUpdate((to, from, next) => {
    /**
     * Чтоб при изменение hash в урле не перерендерить страницу
     */
    if (to.path === from.path) {
        return
    }

    next()
})

const path = computed<string>(() => {
    let link = (Array.isArray(route.params.path) ? route.params.path : []).join('/')
    if (!link.length) {
        return '/'
    }

    if (!link.startsWith('/')) {
        link = ['/', link].join('')
    }

    if (link.endsWith('/')) {
        link = link.slice(0, -1)
    }

    return link
})

const requestParams = computed(() => {
    return {
        url: path.value
    }
})

const { data: pageData, error } = await useApiFetch<DynamicPage>('/api/pages/', {
    params: requestParams
})

if (error.value || !pageData.value) {
    throw createError({
        ...(
            error.value ||
            {
                statusCode: 404
            }
        ),
        fatal: true
    })
}

const {
    data: contentBlocksData,
    error: contentBlocksError
} = await useApiFetch<ContentWidget>(computed(() => `/api/content_blocks/${ pageData.value?.content }`))

const widgetsList = computed<Array<ContentWidgetBase>>(() => {
    return (contentBlocksData.value && Array.isArray(contentBlocksData.value) ? contentBlocksData.value : [])
        .map((widget: ContentWidgetBase) => {
            return widget
        })
})

if (contentBlocksError.value) {
    throw createError({
        ...(
            contentBlocksError.value ||
            {
                statusCode: 404
            }
        ),
        fatal: true
    })
}
</script>
<template>
    <ContentWidgetFactory
        :widgets="widgetsList"
        :class-names="{
            root: 'grid grid-cols-12 gap-y-14 my-15 md:my-4'
        }"
    />
</template>
