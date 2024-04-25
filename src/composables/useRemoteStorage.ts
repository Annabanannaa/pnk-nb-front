import type { Ref } from 'vue'

interface RemoteStorageOptionsInterface {
    locale?: string;
    context?: Record<string, unknown>;
}

const buildBufferKey = (key: string, options: RemoteStorageOptionsInterface): string => {
    return ['api-storage', key, options?.locale, options?.context ? JSON.stringify(options.context) : null].filter(Boolean).join('-')
}
const _bufferData: Record<string, Ref<unknown>> = {}

export default async function useRemoteStorage<T> (key: string, options: RemoteStorageOptionsInterface = { locale: 'ru' } ): Promise<Ref<T | null>> {
    const bufferKey = buildBufferKey(key, options)

    if (_bufferData[bufferKey]) {
        return _bufferData[bufferKey] as Ref<T>
    }

    const request = useApiFetch<T>(`/api/storage/${ key }/`, {
        // key: bufferKey,
        params: options
        // dedupe: 'defer'
    })

    _bufferData[bufferKey] = request.data

    return _bufferData[bufferKey] as Ref<T>
}
