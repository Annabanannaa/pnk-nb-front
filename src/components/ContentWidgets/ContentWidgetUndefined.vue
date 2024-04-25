<script lang="ts" setup>
import type { ContentWidgetBase } from './ContentWidgetFactory'

const props = defineProps<{
    block: ContentWidgetBase
    withContainer?: boolean
}>()
const type = computed<string>(() => `${ props.block.type }` || '')

const isDetailShown = ref(false)
</script>
<template>
    <DevOnly>
        <div class="undefined-component">
            <div>[ Виджет типа <code v-if="type" class="font-bold">{{ type }}</code> не определен в <code class="font-bold">components/ContentWidgets/ContentWidgetFactory.vue</code> ]</div>
            <div class="mt-4">
                <a
                    href="#"
                    :class="{
                        'undefined-component-detail-action': true
                    }"
                    @click.prevent="isDetailShown = !isDetailShown"
                >
                    Данные виджета <span :class="{ 'undefined-component-detail-action-icon': true, 'undefined-component-detail-action-icon_opened': isDetailShown }">▼</span>
                </a>
                <pre v-if="isDetailShown" class="code">{{ block }}</pre>
            </div>
        </div>
    </DevOnly>
</template>
<style scoped>
.undefined-component {
  padding: 1rem;
  border: 1px solid #6b7280;
  border-radius: 6px;
  margin: 1rem 0;
}
.undefined-component-detail-action {
  display: block;
  font-weight: 600;
}
.undefined-component-detail-action-icon {
  display: inline-block;
  transition-duration: 150ms;
  transform: rotate(0);
}
.undefined-component-detail-action-icon_opened {
  transform: rotate(-180deg);
}
.code {
  white-space: pre-wrap;
}
</style>
