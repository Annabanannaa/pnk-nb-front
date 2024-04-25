import type { QueryItem } from '~/schemas/Router'
import { getFirstIntegerFromQuery } from '~/helpers/routeQueryHelpers'

export function getPagesCount (total: number, limit: number): number {
    return Math.ceil(total / limit)
}

export function getPageFromQuery (payload: QueryItem): number {
    let page = getFirstIntegerFromQuery(payload)

    if (!page || page < 1) {
        page = 1
    }

    return page
}
