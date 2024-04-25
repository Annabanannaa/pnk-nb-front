import type { PropType } from 'vue'
import { defineAsyncComponent } from '#imports'

export enum WIDGET_TYPES {
    TEXT = 'text',
    BRAND = 'brand',
    GROUP = 'group',
    ACCORDION = 'accordion',
    SERVICES = 'services',
    TEXTCARDS = 'textCards',
    BANNER = 'banner',
    IMAGECARD = 'imageCard',
    QUOTE = 'quote',
    OFFICECONTACTS = 'officeContacts',
}

export type ContentWidgetBase<T = Record<string, unknown>> = T & {
    block_type: string;
    block_size: number;
    children?: ContentWidgetBase[]
}

// Тип класса в исходном коде vue => unknown
export interface ContentWidgetFactoryClasses {
    root?: unknown;
    item?: unknown;
}

const COMPONENT_MAP = {
    UNDEFINED: defineAsyncComponent(() => import('./ContentWidgetUndefined.vue')),
    [WIDGET_TYPES.GROUP]: defineAsyncComponent(() => import('./ContentWidgetGroup.vue')),
    [WIDGET_TYPES.TEXT]: defineAsyncComponent(() => import('./ContentWidgetText.vue')),
    [WIDGET_TYPES.BRAND]: defineAsyncComponent(() => import('./ContentWidgetBrand.vue')),
    [WIDGET_TYPES.ACCORDION]: defineAsyncComponent(() => import('./ContentWidgetAccordion.vue')),
    [WIDGET_TYPES.SERVICES]: defineAsyncComponent(() => import('./ContentWidgetServices.vue')),
    [WIDGET_TYPES.TEXTCARDS]: defineAsyncComponent(() => import('./ContentWidgetTextCards.vue')),
    [WIDGET_TYPES.BANNER]: defineAsyncComponent(() => import('./ContentWidgetBanner.vue')),
    [WIDGET_TYPES.IMAGECARD]: defineAsyncComponent(() => import('./ContentWidgetImageCard.vue')),
    [WIDGET_TYPES.QUOTE]: defineAsyncComponent(() => import('./ContentWidgetQuote.vue')),
    [WIDGET_TYPES.OFFICECONTACTS]: defineAsyncComponent(() => import('./ContentWidgetOfficeContacts.vue'))
}

export default defineComponent({
    name: 'ContentWidgetFactory',
    inheritAttrs: true,
    props: {
        widgets: {
            type: Array as PropType<ContentWidgetBase[]>,
            required: true
        },
        classNames: {
            type: Object as PropType<ContentWidgetFactoryClasses>,
            default: () => {}
        },
        withContainer: {
            type: Boolean as PropType<boolean>,
            default: true
        }
    },
    setup (props) {
        const widgets = computed(() => {
            return props.widgets.map(widget => {
                const currentComponent = COMPONENT_MAP[String(widget.block_type) as keyof typeof COMPONENT_MAP] || COMPONENT_MAP.UNDEFINED

                return {
                    data: widget,
                    component: currentComponent
                }
            })
        })
        return () => h(
            'div',
            {
                className: props.classNames?.root || 'grid grid-cols-12 gap-y-14 sm:gap-y-4'
            },
            widgets.value.map((widget) => {
                const allGridColSpans = 'col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12'
                const classes: Record<string, unknown> = {
                    [allGridColSpans]: true
                }
                const sizeClass = `col-span-${ widget.data.size || 12 }`
                classes[sizeClass] = true
                classes[allGridColSpans] = false

                return h(
                    'div',
                    {
                        class: [classes, props.classNames?.item || '']
                    },
                    h(
                        widget.component,
                        {
                            block: widget.data,
                            withContainer: props.withContainer
                        }
                    )
                )
            })
        )
    }
})
