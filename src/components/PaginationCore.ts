import type { PropType, SlotsType } from 'vue'
import { getPagesCount } from '~/helpers/paginationHelper'

export interface PaginationCoreProps {
    page: number;
    limit: number;
    total: number;
    showArrows?: boolean;
    route?: Record<string, unknown>;
    visibleCount?: number;
    useLinks?: boolean;
    showFirst?: boolean;
    showLast?: boolean;
}

export type PaginationCoreActionType = 'page' | 'prev' | 'next' | 'delimiter';

const DEFAULT_ACTION_CONTENT_BY_TYPE: {[key in Exclude<PaginationCoreActionType, 'page'>]: string|number } = {
    prev: '←',
    next: '→',
    delimiter: '┅'
}

interface PaginationData {
    items: Array<{
        page: number;
        type: 'page' | 'delimiter',
        url: '',
        delimiterStart?: number;
        delimiterMiddle?: number;
        delimiterEnd?: number;
    }>
}

export interface PaginationCoreSlotPayload {
    type: PaginationCoreActionType
    disabled: boolean
    isActive: boolean
    route: PaginationCoreProps['route']
    onClick: () => void
    page: number
    item?: PaginationData['items'][number]
    isUrl: boolean
}

const buildPages = (
    page: number,
    pagesCount: number,
    visibleCount = 3,
    showFirst: boolean,
    showLast: boolean
): PaginationData['items'] => {
    let pages: PaginationData['items'] = []
    const currentPage = page || 1

    if (pagesCount > visibleCount + 2) {
        let pageStart = currentPage - Math.floor(visibleCount / 2)

        if (pageStart < 1) {
            pageStart = 1
        } else if (pageStart + visibleCount > pagesCount) {
            pageStart = pagesCount - visibleCount + 1
        }

        pages = [...Array(visibleCount).keys()].map((_x, index) => ({
            page: pageStart + index,
            type: 'page',
            url: ''
        }))

        if (showFirst && currentPage > Math.ceil(visibleCount / 2)) {
            if (currentPage > Math.ceil(visibleCount / 2) + 1) {
                const delimiterStart = 2
                const delimiterEnd = pages[0].page - 1
                const delimiterMiddle = Math.ceil((pages[0].page - 1) / 2)

                pages.splice(0, 0, {
                    page: delimiterMiddle,
                    type: 'delimiter',
                    url: '',
                    delimiterStart,
                    delimiterEnd,
                    delimiterMiddle
                })
            }

            pages.splice(0, 0, {
                page: 1,
                type: 'page',
                url: ''
            })
        }

        if (showLast && currentPage < pagesCount - Math.floor(visibleCount / 2)) {
            if (currentPage < pagesCount - Math.floor(visibleCount / 2) - 1) {
                const delimiterStart = pages[pages.length - 1].page
                const delimiterEnd = pagesCount
                const delimiterMiddle = Math.ceil(delimiterStart + ((delimiterEnd - delimiterStart) / 2))

                pages.push({
                    page: delimiterMiddle || 1,
                    type: 'delimiter',
                    url: '',
                    delimiterStart: delimiterStart + 1,
                    delimiterEnd: delimiterEnd - 1,
                    delimiterMiddle
                })
            }

            pages.push({
                page: pagesCount,
                type: 'page',
                url: ''
            })
        }
    } else {
        pages = [...Array(pagesCount + 1).keys()]
            .slice(1)
            .map(page => ({
                page,
                type: 'page',
                url: ''
            }))
    }

    return pages
}

export default defineComponent({
    name: 'PaginationCore',
    slots: Object as SlotsType<{
        action: PaginationCoreSlotPayload
    }>,
    props: {
        page: {
            type: Number as PropType<PaginationCoreProps['page']>,
            required: true
        },
        limit: {
            type: Number as PropType<PaginationCoreProps['limit']>,
            required: true
        },
        total: {
            type: Number as PropType<PaginationCoreProps['total']>,
            required: true
        },
        showArrows: {
            type: Boolean as PropType<PaginationCoreProps['showArrows']>,
            default: true
        },
        route: {
            type: Object as PropType<PaginationCoreProps['route']>,
            required: false,
            default: undefined
        },
        visibleCount: {
            type: Number as PropType<PaginationCoreProps['visibleCount']>,
            default: 3
        },
        useLinks: {
            type: Boolean as PropType<PaginationCoreProps['useLinks']>,
            default: false
        },
        showFirst: {
            type: Boolean as PropType<PaginationCoreProps['showFirst']>,
            default: true
        },
        showLast: {
            type: Boolean as PropType<PaginationCoreProps['showLast']>,
            default: true
        }
    },
    emits: ['update:page'],
    setup (
        props: PaginationCoreProps,
        { emit, slots, attrs }
    ) {
        const useLinks = computed(() => !!(props.useLinks && props.route && typeof props.route === 'object'))
        const pagesCount = computed(() => getPagesCount(props.total, props.limit))

        const prevPage = computed(() => {
            return props.page - 1 < 1 ? 1 : props.page - 1
        })
        const nextPage = computed(() => {
            return props.page + 1 > pagesCount.value ? pagesCount.value : props.page + 1
        })

        const items = computed<PaginationData['items']>(() => buildPages(
            props.page,
            pagesCount.value,
            props.visibleCount,
            props.showFirst ?? true,
            props.showLast ?? true
        ))

        const goPage = (page: number | string) => {
            if (props.page === page) {
                return
            }

            emit('update:page', page)
        }

        const getPageRoute = (page: string | number): PaginationCoreProps['route'] => {
            if (!useLinks.value || !props.route) {
                return undefined
            }
            const { query, ...route } = props.route

            return {
                ...route,
                query: {
                    ...(query || {}),
                    page
                }
            }
        }
        const itemRender = (data: Omit<PaginationCoreSlotPayload, 'onClick' | 'isUrl'>) => {
            const itemKey = `pagination-${ data.type || 'item' }-${ data.page }`
            const isUrl = !!props.useLinks

            const slotProps = {
                ...data,
                key: itemKey,
                isUrl,
                onClick: () => goPage(data.page)
            }

            if (slots.action) {
                return h(
                    'span',
                    {
                        key: itemKey
                    },
                    slots.action(slotProps)
                )
            }

            const itemContent = DEFAULT_ACTION_CONTENT_BY_TYPE[data.type as Exclude<PaginationCoreActionType, 'page'>] || data.page

            return h(
                'button',
                slotProps,
                itemContent
            )
        }

        return () => pagesCount.value > 1 && h(
            'div',
            attrs,
            [
                props.showArrows && itemRender({
                    type: 'prev',
                    disabled: props.page === 1,
                    isActive: false,
                    route: getPageRoute(prevPage.value),
                    page: prevPage.value
                }),
                items.value.map((pageItem) => {
                    return itemRender({
                        type: pageItem.type,
                        item: pageItem,
                        isActive: pageItem.page === props.page,
                        disabled: pageItem.page === props.page,
                        page: pageItem.page,
                        route: getPageRoute(pageItem.page)
                    })
                }),
                props.showArrows && itemRender({
                    type: 'next',
                    disabled: props.page === pagesCount.value,
                    isActive: false,
                    route: getPageRoute(nextPage.value),
                    page: nextPage.value
                })
            ]
        )
    }
})
