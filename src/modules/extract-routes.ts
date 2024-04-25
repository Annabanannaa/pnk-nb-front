import { writeFile } from 'fs'
import type { ModuleOptions, Nuxt } from '@nuxt/schema'
import { defineNuxtModule } from '@nuxt/kit'

const JSON_ROUTES_PATH_DEFAULT = './.nuxt/structure.json'

const extractRouteModule = defineNuxtModule({
    setup (_moduleOptions: ModuleOptions, nuxt: Nuxt) {
        nuxt.hook('pages:extend', (routesList) => {
            if (!routesList?.length) {
                return
            }

            let routesJson = ''

            try {
                routesJson = JSON.stringify(routesList)

                writeFile(JSON_ROUTES_PATH_DEFAULT, routesJson, () => {
                    console.log('\x1b[42m%s\x1b[0m', ` ✓ Роуты сохранеы в ${ JSON_ROUTES_PATH_DEFAULT } `)
                })
            } catch (e) {
                console.error('Не удалось сохранить роуты в ' + JSON_ROUTES_PATH_DEFAULT, e)
            }
        })
    }
})

export { extractRouteModule as default }
