<script lang="ts">
import type { PropType } from 'vue'
import { h } from '#imports'
import { makeTextPretty } from '~/helpers/typograph'

interface ComponentProps {
    html: string;
    tag: string;
}
export default {
    props: {
        html: {
            type: String as PropType<ComponentProps['html']>,
            required: true
        },
        tag: {
            type: String as PropType<ComponentProps['tag']>,
            default: 'div'
        }
    },
    setup (props: ComponentProps) {
        return () => h(
            props.tag,
            {
                class: 'typography',
                innerHTML: makeTextPretty(props.html)
            }
        )
    }
}
</script>
