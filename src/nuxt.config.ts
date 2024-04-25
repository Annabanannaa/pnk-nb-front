// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: process.env.NODE_ENV === 'develop'
    },
    debug: process.env.NODE_ENV === 'develop',
    logLevel: 'verbose',
    vite: {
        server: {
            hmr: {
                path: '/hmr',
                port: 3000
            }
        }
    },
    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru'
            },
            /**
             * ToDo: Использование .env переменных не работает тут.
             * Надо унести эти линки в другое место, где эти линки будут там гарантированно
             */
            link: [
                {
                    rel: 'manifest',
                    href: '/app.webmanifest'
                },
                {
                    rel: 'dns-prefetch',
                    href: process.env.NUXT_PUBLIC_APP_URL
                },
                {
                    rel: 'preconnect',
                    href: process.env.NUXT_PUBLIC_APP_URL
                },
                {
                    rel: 'dns-prefetch',
                    href: process.env.NUXT_PUBLIC_API_URL
                },
                {
                    rel: 'preconnect',
                    href: process.env.NUXT_PUBLIC_API_URL
                }
            ]
        }
    },
    typescript: {
        typeCheck: true,
        tsConfig: {
            compilerOptions: {
                types: [
                    '@vueuse/core'
                ]
            }
        }
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        'floating-vue/nuxt',
        '@nuxtjs/device',
        './modules/extract-routes.ts'
    ],
    tailwindcss: {
        cssPath: '~/assets/css/index.css'
    },
    runtimeConfig: {
        public: {
            appUrl: process.env.NUXT_PUBLIC_APP_URL,
            apiUrl: process.env.NUXT_PUBLIC_API_URL,
            yaCaptcha: process.env.NUXT_PUBLIC_YA_CAPTCHA
        }
    }
})
