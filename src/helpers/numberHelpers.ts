export function getNumberPositiveNumber (num: string | null): number | null {
    if (!num) {
        return null
    }

    const parsedNum = parseInt(num)

    if (isNaN(parsedNum)) {
        return null
    }

    return parsedNum

}
