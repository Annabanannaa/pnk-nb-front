import fs from 'fs/promises'
import { defineEventHandler, createError } from 'h3'

const routesFileUri = '.nuxt/structure.json'

interface RouteItem {
    name?: string;
    path: string;
    file: string;
    children: RouteItem[]
}
const normalizeRoutes = (routes: RouteItem[]|null): RouteItem[] => {
    return (routes && Array.isArray(routes) ? routes : []).map(route => {
        return {
            name: route.name || route.path.replace(/^\/|\/$/g, '').replace(/\//g, '-'),
            ...route,
            children: route.children?.length ? normalizeRoutes(route.children) : []
        }
    })
}
export default defineEventHandler(async () => {
    let routes: RouteItem[]|null = null

    try {
        const rawFile = await fs.readFile(routesFileUri, { encoding: 'utf-8' })
        if (rawFile) {
            routes = JSON.parse(rawFile)
        }
    } catch (e) {
        console.log(`Ошибка чтения файла ${routesFileUri}`, e)
        throw createError({
            statusCode: 404,
            statusMessage: 'structure.json is missing',
            message: `Файл списока роутов (structure.json) отсутствует. Попробуйте пересобрать приложение и убедиться что файл ${routesFileUri} существует.`
        })
    }

    return normalizeRoutes(routes)
})
