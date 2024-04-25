import { createApp, TransitionGroup, Suspense, nextTick } from 'vue'
import type { Plugin, VNode } from 'vue'
import { h, defineAsyncComponent } from '#imports'
import LayerLoadingComponent from '~/components/Layers/LayerLoadingComponent.vue'
import LayerErrorComponent from '~/components/Layers/LayerErrorComponent.vue'
import '~/assets/css/components/layer.css'

export interface LayerInterface {
    open<T = any>(name: string, props?: LayerComponentProps): Promise<T>
    close<T = any>(name: string): Promise<T>
    alert<T = any>(props?: LayerComponentProps): Promise<T>
    confirm<T = any>(props?: LayerComponentProps): Promise<T>
    success<T = any>(props?: LayerComponentProps): Promise<T>
    error<T = any>(props?: LayerComponentProps): Promise<T>
    closeAll<T = any>(): Promise<T>
}

type LayerComponentProps = {[key: string]: any} & {
    timeout?: number;
    locked?: boolean;
    key?: string;
    blackoutClasses?: string;
    backgroundClose?: boolean;
}

interface LayerItem extends Omit<VNode, 'component'> {
    offset?: number;
    component: VNode['component'] | string;
    promise?: Promise<any>;
    resolve?: (result?: any) => any,
    timeoutTimer?: number;
}

/**
 * Генерирует ключ для слоя
 * @param key {string|array}
 * @returns {string}
 */
function buildKey (key: string | string[]) {
    if (typeof key === 'string') {
        return key
    }

    return key.filter(x => !!x).join('-')
}

let appElement: HTMLElement | null = null

const cachedComponents: Record<string, any> = {}

const LayerPlugin: Plugin = {
    install (app) {
        const options = {}

        // Счетчик для добавления суффикса к ключу слоя
        let keyCounter = 0

        // Смещение прокрутки до открытия первого слоя
        let appScrollOffset = 0

        // Контейнер приложения
        appElement = app._container

        /**
         * Хук срабатыаем при анимании закрытия слоя
         * @param el
         * @this { layers: []}
         */
        function transitionLeave (this: { layers: LayerItem[]}, el: HTMLElement) {
            // Пропускаем элемент блекаута при обработки анимации
            if (el.classList.contains('layer-blackout')) {
                return
            }

            if (this.layers.length) {
                // При закрытии восстанвливает смещение прокрутки предыдущего слоя
                nextTick(() => {
                    document.documentElement.scrollTop = this.layers[this.layers.length - 1].offset || 0
                })
            } else {
                // При закрытии последего слоя разблокирует приложение и восстанавливает смещение прокрутки
                if (appElement) {
                    appElement.style.top = ''
                    appElement.classList.remove('is-layer-locked')
                }
                document.documentElement.scrollTop = appScrollOffset
            }
        }

        /**
         * Хук срабатывает перед началом анимации закрытия слоя
         * @param el
         */
        function transitionBeforeLeave (el: HTMLElement) {
            // Пропускаем элемент блекаута при обработки анимации
            if (el.classList.contains('layer-blackout')) {
                return
            }

            // Смещает позицию анимируемого слоя на значение смещения прокрутки
            el.style.top = -document.documentElement.scrollTop + 'px'
        }

        const $container = document.createElement('div')
        $container.setAttribute('data-layer', '')
        document.body.appendChild($container)

        const $layer = createApp({
            ...options,

            data () {
                return {
                    // Стак всех слоев
                    layers: []
                }
            },
            computed: {
                // Размер стака слоев, используется для управления анимацией
                layersStackSize () {
                    return this.layers.length
                }
            },
            watch: {
                layersStackSize (size, prevSize) {
                    if (prevSize < 1 && size > 0) {
                        // При открытии первого слоя блокирует приложение и запоминает смещения прокрутки
                        appScrollOffset = document.documentElement.scrollTop
                        if (appElement) {
                            appElement.style.top = -appScrollOffset + 'px'
                            appElement.classList.add('is-layer-locked')
                        }
                        document.documentElement.scrollTop = 0
                    } else if (size > prevSize && size > 1) {
                        // При открытии последующих слоев запоминает смещение прокрутки для предыдущего слоя
                        if (document.documentElement.scrollTop) {
                            this.layers[this.layers.length - 2].offset = document.documentElement.scrollTop
                        }
                    }
                }
            },
            methods: {
                alert (props: LayerComponentProps) {
                    return this.open('AlertLayer', props)
                },

                confirm (props: LayerComponentProps) {
                    return this.open('ConfirmLayer', props)
                },
                success (props: LayerComponentProps) {
                    return this.open('SuccessLayer', props)
                },
                error (props: LayerComponentProps) {
                    return this.open('ErrorLayer', props)
                },

                /**
                 * Открыть слой компонента
                 * @param component Компонент
                 * @param props Входные параметры компонента
                 * @returns {Promise<*>}
                 */
                async open (component: LayerItem | string, props: LayerComponentProps = {}) {
                    const layerName = (typeof component === 'string') ? component : props.name || 'layer'
                    const key = buildKey(props.key || [layerName, props.single ? null : ++keyCounter])

                    try {
                        // Если слой с таким ключем уже присутствует, делает его фронтальным
                        const layer = this.findLayer(key)
                        return this.focusLayer(layer, props)
                    } catch (e) {
                        //
                    }

                    let resolve
                    const promise = new Promise(r => resolve = r)

                    let timeoutTimer
                    const timeout = props.timeout || props.timeout
                    if (timeout) {
                        timeoutTimer = setTimeout(() => this.close(key), timeout)
                    }

                    this.layers.push({
                        key,
                        component,
                        props,
                        options,
                        promise,
                        resolve,
                        timeoutTimer
                    })

                    return promise
                },

                /**
                 * Закрыть слой по ключу
                 * @param key Ключ слоя
                 * @param result Возвращаемое значение ответа
                 * @returns {Promise<*>}
                 */
                async close (key: string, result: () => any) {
                    if (!this.layers.length) {
                        return
                    }

                    const layer = this.findLayer(key)
                    this.layers = this.layers.filter((l: LayerItem) => l.key !== key)

                    clearTimeout(layer.timeoutTimer)

                    return await this.resolveClose(layer, result)
                },

                /**
                 * Закрыть все слои
                 * @returns {Promise<[*]>}
                 */
                closeAll () {
                    const promise = Promise.all(this.layers.map((l: LayerItem) => this.resolveClose(l)))
                    this.layers = []

                    return promise
                },

                /**
                 * Возвращает результата ответ при закрытии слоя.
                 * Если в компоненте слоя определена функция resolve, вызывает ее для получения ответа.
                 * Функция будет вызывана только в том случае, если при закрытии не был передан результат ответа (result).
                 * @param layer
                 * @param result
                 * @returns {Promise<*>}
                 */
                async resolveClose (layer: LayerItem, result = undefined) {
                    const layerInstance = this.$refs['layer-' + (layer.key as string)]

                    if (typeof result === 'undefined') {
                        if (typeof layer.resolve === 'function') {
                            result = await layer.resolve.call(layerInstance)
                        }
                    }

                    layer.resolve && layer.resolve(result)

                    return result
                },

                /**
                 * Найти индекс слоя в стаке по ключу
                 * @param key
                 */
                findLayerIndex (key: string) {
                    for (const i in this.layers) {
                        if (this.layers[i].key === key) {
                            return i
                        }
                    }

                    throw new Error('Layer not found: ' + key)
                },

                /**
                 * Делает слой фронтальным
                 * @param layer
                 * @param props
                 * @returns {Promise<*>}
                 */
                async focusLayer (layer: LayerItem, props: LayerComponentProps) {
                    this.layers.splice(this.findLayerIndex(layer.key), 1)
                    this.layers.push(layer)

                    layer.props = props

                    return layer.promise
                },

                /**
                 * Найти слой по ключу
                 * @param key
                 * @returns {T}
                 */
                findLayer (key: string) {
                    const layer = this.layers.find((l: LayerItem) => l.key === key)
                    if (!layer) {
                        throw new Error('Layer not found: ' + key)
                    }

                    return layer
                },

                /**
                 * Закрыть фронтальный слой
                 * @returns {Promise<*>}
                 */
                async closeFrontLayer () {
                    if (!this.layers.length) {
                        return
                    }

                    const layer = this.layers[this.layers.length - 1]

                    if (layer.props.locked) {
                        return
                    }

                    return await this.close(this.layers[this.layers.length - 1].key)
                }
            },
            render () {
                const layers: LayerItem[] = []
                const self = this

                this.layers.forEach((l: LayerItem, i: number) => {
                    const _componentName = typeof l.component === 'string' ? l.component : l.key as string
                    let loadedComponent = cachedComponents[_componentName]
                    if (!loadedComponent) {
                        try {
                            loadedComponent = defineAsyncComponent({
                                loader: () => {
                                    const importHandler = import.meta.glob('../components/Layers/**/**.vue')

                                    return (importHandler[`../components/Layers/${ l.component }.vue`]?.()) as unknown as any
                                },
                                suspensible: true,
                                loadingComponent: LayerLoadingComponent,
                                errorComponent: LayerErrorComponent

                            })
                            loadedComponent && (cachedComponents[_componentName] = loadedComponent)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    if (loadedComponent) {
                        layers.push(h(loadedComponent, {
                            ...(l.props || {}),
                            key: l.key as string,
                            ref: 'layer-' + (l.key as string),
                            style: {
                                top: (l.offset && i < self.layersStackSize - 1) ? -l.offset + 'px' : null
                            },
                            class: {
                                layer_hidden: i < self.layersStackSize - 3,
                                layer_back: i < self.layersStackSize - 1,
                                layer_front: i >= self.layersStackSize - 1
                            },
                            onClose: (result: any) => {
                                this.close(l.key, result)
                            }
                        }))
                    }
                })

                const blackoutClasses = layers[layers.length - 1]?.props?.blackoutClasses
                const backgroundClose = layers[layers.length - 1]?.props?.backgroundClose ?? true

                // Добавляет элемент блекаута перед фронтальным слоем
                layers.splice(layers.length ? layers.length - 1 : 0, 0,
                    h(
                        'div',
                        {
                            class: {
                                'layer-blackout': true,
                                [blackoutClasses]: blackoutClasses,
                                'layer-blackout_hidden': !layers.length
                            },
                            onClick () {
                                // Запретить закрытие по клику вне модалки
                                if (!backgroundClose) {
                                    return
                                }
                                self.closeFrontLayer()
                            },
                            key: 'layer-blackout'
                        }
                    )
                )

                return h(
                    Suspense,
                    h(
                        TransitionGroup,
                        {
                            class: ['layers-container'],
                            onLeave (el) {
                                transitionLeave.call(self, el as HTMLElement)
                            },
                            onBeforeLeave (el) {
                                transitionBeforeLeave.call(self, (el as HTMLElement))
                            },
                            tag: 'div',
                            name: 'layer'
                        },
                        () => layers
                    )
                )
            }
        })
        Object.assign($layer._context, app._context)

        const _layerInstance = $layer.mount($container) as unknown as LayerInterface

        app.config.globalProperties.$layer = _layerInstance
        $layer.config.globalProperties.$layer = _layerInstance
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hooks.hook('app:mounted', (app) => {
        appElement = app._container as HTMLElement | null
    })

    nuxtApp.vueApp.use(LayerPlugin)
})
