import type { PropType, SlotsType } from 'vue'
import { generateUiid } from '~/plugins/uiid'
import type { PaginatedData } from '~/schemas/Pagination'
import type { PaginationCoreProps } from '~/components/PaginationCore'
import { BasePagination } from '#components'
import { refDebounced } from '@vueuse/core'
import type { RequestError } from '~/schemas/Request'

type ClassItem = string | object | (string | object)[];
interface ListClasses {
    pagination?: ClassItem;
    listContainer?: ClassItem;
}
interface ListProps {
    dataSource: {
        url: string;
        debounce?: number;
        params?: Record<string, unknown>;
    },
    pagination?: boolean | Omit<PaginationCoreProps, 'page' | 'total'> & {
        initialPage: number;
    };
    loading?: boolean;
    classes?: ListClasses;
}

type ItemSlotPayload<Item> = {
    item: Item,
    uuid: string;
    isPending: boolean;
}

interface ErrorSlotPayload {
    response: RequestError | null
}
interface PendingSlotPayload {
    isPending: boolean;
}

export function useGenericList<ItemType> () {
    return defineComponent({
        name: 'ListGeneric',
        slots: Object as SlotsType<{
            item: ItemSlotPayload<ItemType>,
            error: ErrorSlotPayload,
            pending: PendingSlotPayload
        }>,
        props: {
            dataSource: {
                type: Object as PropType<ListProps['dataSource']>,
                required: true
            },
            pagination: {
                type: [Boolean, Object] as PropType<ListProps['pagination']>,
                required: false,
                default: false
            },
            loading: {
                type: Boolean as PropType<ListProps['loading']>,
                required: false,
                default: false
            },
            classes: {
                type: [String, Object] as PropType<ListProps['classes']>,
                required: false,
                default: undefined
            }
        },
        async setup (
            props,
            { slots }
        ) {
            const initialPage = computed(() => {
                return (props.pagination && typeof props.pagination !== 'boolean' && props.pagination.initialPage && !isNaN(props.pagination.initialPage)) ? props.pagination.initialPage : 1
            })

            const currentPage = ref(initialPage.value)

            const requestDebounce = props.dataSource.debounce || 250
            const _requestParams = computed(() => {
                let data = {
                    ...(props.dataSource.params || {})
                }

                if (props.pagination && typeof props.pagination !== 'boolean') {
                    data = {
                        ...data,
                        limit: props.pagination.limit
                    }

                    data.page = props.pagination.useLinks ? initialPage.value : currentPage.value
                }

                return data
            })

            const requestParams = refDebounced(_requestParams, requestDebounce)

            const paginationData = computed<Omit<PaginationCoreProps, 'page'> | null>(() => {
                if (typeof props.pagination === 'boolean' || !props.pagination) {
                    return null
                }

                return {
                    ...props.pagination,
                    total: dataResponse.value?.count || 0
                }
            })

            const responseErrorNormalized = computed(() => {
                const _d = responseError.value?.data
                return {
                    message: _d?.detail || '',
                    status: responseError.value?.status || 404
                }
            })

            const {
                data: dataResponse,
                error: responseError,
                status: dataResponseStatus
            } = await useApiFetch<PaginatedData<ItemType>>(props.dataSource.url, {
                params: requestParams
            })

            const isPending = computed(() => dataResponseStatus.value === 'pending')

            const items = computed<Array<ItemSlotPayload<ItemType>>>(() => {
                return (dataResponse.value?.results && Array.isArray(dataResponse.value.results) ? dataResponse.value.results : []).map((item: ItemType) => {
                    return {
                        uuid: generateUiid('list-item-'),
                        item,
                        isPending: isPending.value
                    }
                })
            })

            const itemRender = (slotPayload: ItemSlotPayload<ItemType>) => {
                if (slots.item) {
                    return slots.item(slotPayload)
                }

                return null
            }

            const errorRender = () => {
                if (slots.error) {
                    return slots.error({
                        response: responseError.value
                    })
                }

                return responseErrorNormalized.value.message && h('div', responseErrorNormalized.value.message)
            }

            const pendingRender = () => {
                if (slots.pending) {
                    return slots.pending({
                        isPending: dataResponseStatus.value === 'pending'
                    })
                }
            }

            return () => h(
                'div',
                [
                    errorRender(),
                    pendingRender(),
                    h(
                        'div',
                        {
                            class: props.classes?.listContainer
                        },
                        items.value.map((_item) => itemRender(_item))
                    ),
                    paginationData.value && h(BasePagination, {
                        page: currentPage.value,
                        'onUpdate:page': (value) => currentPage.value = value,
                        ...paginationData.value,
                        class: props.classes?.pagination || ''
                    })
                ]
            )
        }
    })
}
