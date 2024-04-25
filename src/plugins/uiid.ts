let counter = 0

export const generateUiid = (prefix: string): string => prefix + ++counter

export default defineNuxtPlugin(() => {
    counter = 0
})
