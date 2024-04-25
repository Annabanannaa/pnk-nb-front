interface UsePaginationOptions {
    pages: Ref<number>;
    page?: number;
    limit?: number;
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

export default function usePagination (options: UsePaginationOptions) {
    const page = ref(options.page || DEFAULT_PAGE)
    const limit = ref(options.limit || DEFAULT_LIMIT)

    const isPaginationAvailable = computed(() => {
        const pages = options.pages?.value

        return pages > 1 && pages > page.value
    })

    const paginate = (newPage: UsePaginationOptions['page']) => {
        if (!newPage) {
            return
        }

        if (newPage > options.pages?.value) {
            return
        }
        page.value = newPage || DEFAULT_PAGE
    }

    const changeLimit = (newLimit: UsePaginationOptions['limit']) => {
        limit.value = newLimit || DEFAULT_LIMIT
    }

    return {
        page,
        limit,
        isPaginationAvailable,

        paginate,
        changeLimit
    }
}
