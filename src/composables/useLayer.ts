import { useNuxtApp } from '#app';

export default function useLayer () {
    const { vueApp } = useNuxtApp();

    return vueApp.config.globalProperties.$layer;
}
