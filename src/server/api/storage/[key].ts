const rawData = {
    socials: [
        {
            'title': 'instagram',
            'link': 'https://www.instagram.com/angliya_newspaper/'
        },
        {
            'title': 'facebook',
            'link': 'https://www.facebook.com/angliyanewspaper'
        },
        {
            'title': 'ya-zen',
            'link': 'https://zen.yandex.ru/angliya?lang=ru'
        },
        {
            'title': 'telegram',
            'link': 'https://t.me/angliya_newspaper'
        },
        {
            'title': 'twitter',
            'link': 'https://twitter.com/angliyanewspap1'
        }
    ]

}

export default defineEventHandler(async (event) => {

    const key = getRouterParam(event, 'key')

    if (!key) {
        return null
    }

    return rawData[key as keyof typeof rawData] || null
})

