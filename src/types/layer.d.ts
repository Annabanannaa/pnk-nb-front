import type { LayerInterface } from '~/plugins/layer.client'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $layer: LayerInterface
    }
}
