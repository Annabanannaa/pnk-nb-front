import type { QueryItem } from '~/schemas/Router'
import { getNumberPositiveNumber } from '~/helpers/numberHelpers'

export function getIntegerFromQuery (
    payload: QueryItem
) {
    let parsedItems: number[] = []

    if (Array.isArray(payload)) {
        parsedItems = payload.map(_item => getNumberPositiveNumber(_item)).filter(_item => _item && !isNaN(_item)) as number[]
    } else {
        const parsedItem = getNumberPositiveNumber(payload)
        if (parsedItem && !isNaN(parsedItem)) {
            parsedItems = [parsedItem]
        }
    }

    return parsedItems
}

export function getFirstIntegerFromQuery (payload: QueryItem): number | null {
    return getIntegerFromQuery(payload)?.[0] || null
}
