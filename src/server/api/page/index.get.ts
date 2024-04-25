import { getHeader } from 'h3'


const rawData = {
    id: 63,
    slug: '',
    title: 'Creonit - диджитал-продакшн для сервисов и интернет-магазинов',
    url: 'https://creonit.ru/',
    createdAt: '2020-02-28T11:09:48+03:00',
    updatedAt: '2023-05-26T16:08:20+03:00',
    content: {
        id: 9203,
        text: ''
    },
    metaTitle: 'Creonit - диджитал-продакшн для сервисов и интернет-магазинов',
    metaDescription: 'Мы — Creonit, диджитал-продакшн для сервисов и интернет-магазинов. Создаем веб и мобильные приложения с нуля или развиваем уже существующие. Наш офис и команда находятся в Калининграде — 45 человек. Работаем с крупными проектами и вместе с клиентами получаем награды международных конкурсов.',
    metaKeywords: 'creonit, диджитал-продакшн, мобильные приложения',
    children: []
}
export default defineEventHandler((event) => {
    // throw createError({
    //     statusCode: 401,
    //     message: 'У вас недостаточно прав'
    // })

    const referer = getHeader(event, 'referer')

    const query = getQuery(event)
    const path = query.path as string

    return {
        ...rawData,
        path,
        url: referer
    }
})
