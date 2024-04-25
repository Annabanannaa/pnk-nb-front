<script lang="ts" setup>
import {
    Dropdown as VDropdown,
    type Placement,
    type TriggerEvent,

    Menu as VMenu
} from 'floating-vue'

interface PopoverProps {
    mode?: 'default' | 'menu',
    placement?: Placement;
    triggers?: TriggerEvent[];
    delay?: string | number | {
        show: number;
        hide: number;
    }
}
interface SlotPayloadBase {
    shown: boolean;
    hide(): void;
}
interface ActionSlotPayload extends SlotPayloadBase {
    show(): void;
}
type ContentSlotPayload = SlotPayloadBase;

const props = withDefaults(
    defineProps<PopoverProps>(),
    {
        mode: 'default',
        placement: 'bottom',
        triggers: () => ['click'],
        delay: undefined
    }
)

defineSlots<{
    action(props: ActionSlotPayload): any
    content(props: ContentSlotPayload): any
}>()

const componentType = computed(() => {
    if (props.mode === 'menu') {
        return VMenu
    }

    return VDropdown
})

</script>
<template>
    <Component
        :is="componentType"
        :placement="placement"
        :triggers="triggers"
        :delay="delay"
    >
        <template #default="slotsPayload">
            <slot name="action" v-bind="slotsPayload" />
        </template>
        <template #popper="slotsPayload">
            <slot name="content" v-bind="slotsPayload" />
        </template>
    </Component>
</template>
