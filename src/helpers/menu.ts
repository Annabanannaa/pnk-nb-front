import type { DynamicPage } from '~/schemas/DynamicPage'
export type MenuItem = Pick<DynamicPage, 'id' | 'name' | 'url' | 'type' | 'children'>

export function fetchMenuByCode (code: string) {
    return useApiFetch<DynamicPage>('/api/pages/', {
        params: {
            code,
            include_children: true
        },
        pick: ['id', 'name', 'url', 'type', 'children']
    })
}

export function normalizeMenuResponse (response: ReturnType<typeof useApiFetch<MenuItem>>): MenuItem[] {
    return response.data.value?.children && Array.isArray(response.data.value.children) ? response.data.value.children : []
}
