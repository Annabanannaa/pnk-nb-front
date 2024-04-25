<script lang="ts" setup>
import PaginationCore,
    {
        type PaginationCoreActionType,
        type PaginationCoreProps
    } from '~/components/PaginationCore'

const props = withDefaults(
    defineProps<PaginationCoreProps>(),
    {
        showArrows: true,
        route: undefined,
        visibleCount: 3,
        useLinks: false,
        showFirst: true,
        showLast: true,
        loading: false
    }
)
const emit = defineEmits(['update:page'])

const pageModel = computed<PaginationCoreProps['page']>({
    get () {
        return props.page
    },
    set (page) {
        emit('update:page', page)
    }
})

const bindableProps = computed<Omit<PaginationCoreProps, 'page'>>(() => ({
    limit: props.limit,
    total: props.total,
    showArrows: props.showArrows,
    route: props.route,
    visibleCount: props.visibleCount,
    useLinks: props.useLinks,
    showFirst: props.showFirst,
    showLast: props.showLast,
    loading: props.loading

}))

const ResolvedNuxtComponent = resolveComponent('NuxtLink')

const getActionLabel = (type: PaginationCoreActionType, page: PaginationCoreProps['page']): string => {
    if (type === 'prev') {
        return `Предыдущая страница (№ ${ page })`
    }
    if (type === 'next') {
        return `Следующая страница (№ ${ page })`
    }
    if (type === 'delimiter') {
        return 'Разделитель скрытых страниц'
    }
    return `Страница №${ page }`
}

</script>
<template>
    <PaginationCore
        v-model:page="pageModel"
        v-bind="bindableProps"
        class="flex items-center"
    >
        <template #action="actionProps">
            <Component
                :is="actionProps.isUrl && !actionProps.disabled ? ResolvedNuxtComponent : 'button'"
                :to="actionProps.disabled ? '' : actionProps.route"
                :type="!actionProps.isUrl || actionProps.disabled ? 'button' : ''"
                :class="{
                    'inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md font-medium text-gray-500': true,
                    'bg-gray-100 text-black': actionProps.isActive,
                    'opacity-60': !actionProps.isActive && actionProps.disabled
                }"
                :data-page="actionProps.page"
                :aria-label="getActionLabel(actionProps.type, actionProps.page)"
                :title="getActionLabel(actionProps.type, actionProps.page)"
                @click="actionProps.onClick"
            >
                <template v-if="actionProps.type === 'prev'">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.26862 11.793C5.9687 12.0787 5.49397 12.0672 5.20828 11.7672L0.206942 6.51678C-0.0689808 6.22711 -0.0689808 5.77187 0.206942 5.4822L5.20828 0.231735C5.49397 -0.0681872 5.9687 -0.0797238 6.26863 0.205968C6.56855 0.491659 6.58008 0.966392 6.29439 1.26631L1.7858 5.99949L6.29439 10.7327C6.58008 11.0326 6.56855 11.5073 6.26862 11.793Z" fill="#171718" fill-opacity="0.36" />
                    </svg>
                </template>
                <template v-else-if="actionProps.type === 'next'">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.732712 0.206944C1.03263 -0.0787473 1.50737 -0.0672107 1.79306 0.232712L6.79439 5.48318C7.07032 5.77285 7.07032 6.22809 6.79439 6.51776L1.79306 11.7682C1.50737 12.0681 1.03263 12.0797 0.732712 11.794C0.432789 11.5083 0.421253 11.0336 0.706944 10.7336L5.21553 6.00047L0.706944 1.26729C0.421253 0.967369 0.432789 0.492635 0.732712 0.206944Z" fill="#171718" fill-opacity="0.36" />
                    </svg>
                </template>
                <template v-else-if="actionProps.type === 'delimiter'">
                    ...
                </template>
                <template v-else>
                    {{ actionProps.page }}
                </template>
            </Component>
        </template>
    </PaginationCore>
</template>
