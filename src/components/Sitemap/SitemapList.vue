<script lang="ts" setup>
import type { MenuItem } from '~/helpers/menu.ts'

defineProps<{
    listInfo: MenuItem,
}>()

</script>

<template>
    <p v-if="listInfo.children?.length" class="text-lg font-medium  mb-4.5">
        {{ listInfo.name }}
    </p>

    <ul v-if="listInfo.children?.length" class="space-y-4 max-w-[403px]">
        <li v-for="subMenu in listInfo.children" :key="subMenu.id">
            <NuxtLink :to="subMenu.url" class="btn text-blue-400">
                {{ subMenu.name }}
            </NuxtLink>

            <ul v-if="subMenu.children" class="space-y-4">
                <li
                    v-for="el in subMenu.children"
                    :key="el.id"
                >
                    <NuxtLink :to="el.url" class="btn text-blue-400">
                        {{ el.name }}
                    </NuxtLink>
                </li>
            </ul>
        </li>
    </ul>
</template>
