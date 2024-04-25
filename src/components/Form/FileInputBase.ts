import type { PropType, SlotsType } from 'vue'
import { generateUiid } from '~/plugins/uiid'
import { byteToMb } from '~/helpers/fileSize'
import { isFilesEqual } from '~/helpers/file'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export interface FileInputBaseItemError {
    code: string;
    message: string;
}
export interface FileInputBaseItem {
    id: string;
    file: File;
    isError: boolean;
    error?: FileInputBaseItemError;
}
export interface FileInputBaseProps {
    value: FileInputBaseItem[];
    tag: string;
    multiple?: boolean;
    accept: string[];
    maxSizeMb: number;
    preventDuplicate?: boolean;
}
interface FileInputBaseSlotProps {
    inputId: string;
    isDragActive: boolean;
    dragEvents: {
        drop(props: DragEvent): void
        dragover(props: DragEvent): void
        dragstart(props: DragEvent): void
        dragleave(props: DragEvent): void
    };
    open(): void
}

enum ERRORS_CODE {
    SIZE_MISMATCH = 'SIZE_MISMATCH',
    TYPE_MISMATCH = 'TYPE_MISMATCH',
}
const ERRORS = {
    [ERRORS_CODE.SIZE_MISMATCH]: (maxFileSizeInMb: number) => `Размер файла не может быть больше ${ maxFileSizeInMb }МБ`,
    [ERRORS_CODE.TYPE_MISMATCH]: (acceptTypes: string) => `Можно загружать файлы формата ${ acceptTypes }`
}

const getExtension = (file: File) => '.' + ((file.name).split('.').pop())?.toLocaleLowerCase()

const processFiles = (payload: FileList | null | undefined, props: FileInputBaseProps): FileInputBaseProps['value'] => {
    const files: FileInputBaseProps['value'] = []

    if (payload?.length) {
        files.push(...Array.from(payload).map(file => ({
            file,
            id: generateUiid('upload-file-'),
            isError: false
        })))
    }

    return files.map((file) => {
        const extension = getExtension(file.file)
        const isExtensionPassed = extension && props.accept.includes(extension)
        if (!isExtensionPassed) {
            return {
                ...file,
                isError: true,
                error: {
                    message: ERRORS[ERRORS_CODE.TYPE_MISMATCH](props.accept.join(', ')),
                    code: ERRORS_CODE.TYPE_MISMATCH
                }
            }
        }
        const fileSizeInMB = byteToMb(file.file.size)
        const isSizePassed = props.maxSizeMb >= fileSizeInMB

        if (!isSizePassed) {
            return {
                ...file,
                isError: true,
                error: {
                    message: ERRORS[ERRORS_CODE.SIZE_MISMATCH](fileSizeInMB),
                    code: ERRORS_CODE.SIZE_MISMATCH
                }
            }
        }


        return file
    })
}

export default defineComponent({
    slots: Object as SlotsType<{
        default: FileInputBaseSlotProps
    }>,
    props: {
        value: {
            type: Array as PropType<FileInputBaseProps['value']>,
            required: true
        },
        tag: {
            type: String as PropType<FileInputBaseProps['tag']>,
            default: 'div'
        },
        multiple: {
            type: Boolean as PropType<FileInputBaseProps['multiple']>,
            default: false
        },
        accept: {
            type: Array as PropType<FileInputBaseProps['accept']>,
            default: () => ['.jpg', '.png']
        },
        maxSizeMb: {
            type: Number as PropType<FileInputBaseProps['maxSizeMb']>,
            default: 10
        },
        preventDuplicate: {
            type: Boolean as PropType<FileInputBaseProps['preventDuplicate']>,
            default: true
        }
    },
    emits: ['update:value'],
    setup (props, { emit, slots }) {
        const inputModel = computed<FileInputBaseProps['value']>({
            get () {
                return props.value
            },
            set (payload) {
                emit('update:value', payload)
            }
        })
        const inputRef = ref<HTMLInputElement>()
        const inputId = generateUiid('file-input-')

        const acceptedTypes = computed(() => props.accept.join(','))

        /**
         * Отсеивать уже загруженные файлы и добавить новые
         * @param filesToAppend - файлы для добавления
         */
        const appendFiles = (filesToAppend: FileInputBaseProps['value']) => {
            if (props.preventDuplicate === false) {
                inputModel.value = inputModel.value.concat(filesToAppend)

                return
            }

            inputModel.value = inputModel.value.concat(
                filesToAppend.filter((newFile) => {
                    return !inputModel.value.find(existingFile => existingFile?.file && newFile?.file && isFilesEqual(existingFile.file, newFile.file))
                })
            )
        }

        /**
         * Очистка инпута после того как забрали файл
         * Это необходимо, когда загрузили файл, удалили из модели и повторно этот же файл загружают
         */
        const clearInput = () => {
            if (!inputRef.value?.value) {
                return
            }

            inputRef.value.value = ''
        }

        /**
         * Drag'n'Drop
         */
        const isDragActive = ref(false)

        const onDrop = (event: DragEvent) => {
            event.preventDefault()
            isDragActive.value = false

            appendFiles(processFiles(event.dataTransfer?.files, props))
        }
        const onDragOver = (event: DragEvent) => {
            event.preventDefault()
            isDragActive.value = true
        }
        const onDragStart = (event: DragEvent) => {
            event.preventDefault()
        }

        const onDragLeave = () => {
            isDragActive.value = false
        }

        const onChange = (event: HTMLInputEvent) => {
            if (!event.target?.files) {
                return
            }

            appendFiles(processFiles(event.target.files, props))

            clearInput()
        }

        const open = () => {
            inputRef.value?.click()
        }

        /**
         * Slot props
         */
        const slotProps = computed<FileInputBaseSlotProps>(() => {
            return {
                inputId,
                isDragActive: isDragActive.value,
                dragEvents: {
                    drop: onDrop,
                    dragover: onDragOver,
                    dragstart: onDragStart,
                    dragleave: onDragLeave
                },
                open
            }
        })

        return () => h(
            props.tag,
            {
                className: 'relative'
            },
            [
                h(
                    'input',
                    {
                        ref: inputRef,
                        type: 'file',
                        className: 'absolute top-0 left-0 w-px h-px opacity-0 peer',
                        id: inputId,
                        multiple: props.multiple,
                        accept: acceptedTypes.value,
                        onChange
                    }
                ),
                slots.default(slotProps.value)
            ]
        )
    }
})
