<script lang="ts" setup>
interface FooterMenuBlockItem {
    id: number | string
    name: string
    url: string
}
const props = defineProps<{
    title?: string;
    linkClasses?: string;
    isDesktop?: boolean;
    items: FooterMenuBlockItem[]
}>()
const disclosureModel = ref(null)
const itemClasses = computed(() => {
    return {
        '!block text-sm': true,
        [props.linkClasses ?? '']: true
    }
})
</script>
<template>
    <div>
        <DisclosureItem
            v-model:value="disclosureModel"
            :is-desktop="isDesktop"
            current-value="footer-menu-block"
            :class="isDesktop ? '' : 'a-xs:hidden'"
            :theme="isDesktop ? 'list' : 'default'"
        >
            <template v-if="title" #title>
                {{ title }}
            </template>

            <div class="space-y-3">
                <BaseLink
                    v-for="item in items"
                    :key="item.id"
                    :class="itemClasses"
                    :to="item.url"
                >
                    {{ item.name }}
                </BaseLink>
            </div>
        </DisclosureItem>

        <div :class="isDesktop ? 'hidden' : 'xs:hidden'" class="space-y-3 pr-3 ">
            <p v-if="title" class="font-semibold text-sm">
                {{ title }}
            </p>

            <BaseLink
                v-for="item in items"
                :key="item.id"
                :class="itemClasses"
                :to="item.url"
            >
                {{ item.name }}
            </BaseLink>
        </div>
    </div>
</template>
