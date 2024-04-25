import type { UseFetchOptions } from 'nuxt/app'
import type { Ref } from 'vue'


/**
 * Обертка над useFetch, чтобы в будущем можно было на сервер слать access-токены и прочее
 * @param request - запрос
 * @param opts - настройки запроса
 */
export default function useApiFetch<T> (
    request: string | (() => string) | Ref<string>,
    opts: UseFetchOptions<T> = {}
) {
    const runtimeConfig = useRuntimeConfig()
    const _opts = {
        baseURL: opts?.baseURL || runtimeConfig.public.apiUrl,
        ...(opts || {})
    }

    return useFetch(request, _opts)
}
