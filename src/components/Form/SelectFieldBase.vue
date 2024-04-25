<script lang="ts" setup>
import Multiselect from '@vueform/multiselect'
import pluralize from '../../helpers/pluralize'

type SelectFieldBaseValue = null | number | string | Record<string, unknown> | (number | string | Record<string, unknown>)[];
type SelectFieldBaseOption = number | string | Record<string, unknown>;
interface SelectFieldBaseProps {
    value: SelectFieldBaseValue;
    options: SelectFieldBaseOption[];
    isObject?: boolean;
    valueProp?: string;
    labelProp?: string;
    placeholder?: string;
    searchable?: boolean;
    canClear?: boolean;
    isLoading?: boolean;
    mode?: Multiselect['mode'];
    canCreate?: boolean;
}

enum PROP_DEFAULTS {
    VALUE_PROP = 'value',
    LABEL_PROP = 'label'
}

const props = withDefaults(
    defineProps<SelectFieldBaseProps>(),
    {
        isObject: false,
        valueProp: PROP_DEFAULTS.VALUE_PROP,
        labelProp: PROP_DEFAULTS.LABEL_PROP,
        placeholder: 'Выберите значение',
        searchable: false,
        canClear: false,
        isLoading: false,
        mode: 'single',
        canCreate: true
    }
)

const emit = defineEmits(['update:value', 'search', 'create'])

const valueModel = computed<SelectFieldBaseValue>({
    get () {
        return props.value
    },
    set (value: SelectFieldBaseValue) {
        emit('update:value', value)
    }
})

const onCreateOption = (payload: any) => {
    if (!props.canCreate || props.mode === 'single') {
        return false
    }
    emit('create', payload)

    return payload
}
</script>
<template>
    <div>
        <Multiselect
            v-model="valueModel"
            :options="options"
            :object="isObject"
            :track-by="valueProp"
            :value-prop="valueProp"
            :label="labelProp"
            :placeholder="placeholder"
            :searchable="searchable"
            :search-filter="() => true"
            :can-clear="canClear"
            :add-option-on="['enter']"
            :loading="isLoading"
            :mode="mode"

            :create-option="mode === 'multiple' && canCreate"
            :create-tag="mode === 'tags' && canCreate"

            :aria="{
                'aria-label': 'Name'
            }"

            @create="onCreateOption"
            @search-change="$emit('search', $event)"
        >
            <template #caret="{ isOpen, handleCaretClick }">
                <slot name="caret" v-bind="{ isOpen }">
                    <button
                        aria-expanded="false"
                        aria-controls="listbox"
                        aria-haspopup="listbox"
                        role="combobox"
                        aria-label="Открыть селект"
                        :class="{
                            'relative pr-3 opacity-50': true,
                            'pointer-events-none': isOpen
                        }"
                        @click="handleCaretClick"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            :class="{ 'fill-current transform duration-150': true, 'rotate-180': isOpen }"
                        >
                            <path d="M18.7437 9.72781C18.402 9.42406 17.848 9.42406 17.5063 9.72781L12 14.6223L6.49372 9.7278C6.15201 9.42406 5.59799 9.42406 5.25628 9.7278C4.91457 10.0315 4.91457 10.524 5.25628 10.8277L11.3813 16.2722C11.723 16.5759 12.277 16.5759 12.6187 16.2722L18.7437 10.8277C19.0854 10.524 19.0854 10.0315 18.7437 9.72781Z" />
                        </svg>
                    </button>
                </slot>
            </template>
            <template #clear="{ clear }">
                <button
                    class="relative w-4 h-4"
                    tabindex="0"
                    role="button"
                    data-clear
                    aria-roledescription="❎"
                    aria-label="Очистить селект"
                    @click.stop="clear"
                    @keyup.enter="clear"
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-current"
                    >
                        <path d="M1.68349 1.33871L1.75628 1.25628C2.07171 0.940858 2.56803 0.916595 2.91129 1.18349L2.99372 1.25628L8.5 6.76188L14.0063 1.25628C14.348 0.914573 14.902 0.914573 15.2437 1.25628C15.5854 1.59799 15.5854 2.15201 15.2437 2.49372L9.73812 8L15.2437 13.5063C15.5591 13.8217 15.5834 14.318 15.3165 14.6613L15.2437 14.7437C14.9283 15.0591 14.432 15.0834 14.0887 14.8165L14.0063 14.7437L8.5 9.23812L2.99372 14.7437C2.65201 15.0854 2.09799 15.0854 1.75628 14.7437C1.41457 14.402 1.41457 13.848 1.75628 13.5063L7.26188 8L1.75628 2.49372C1.44086 2.17829 1.41659 1.68197 1.68349 1.33871L1.75628 1.25628L1.68349 1.33871Z" />
                    </svg>
                </button>
            </template>
            <template #spinner>
                <Spin class="relative w-5 h-5" />
            </template>
            <template #nooptions>
                <Empty class="py-3" />
            </template>
            <template #noresults>
                <Empty
                    class="py-3"
                    message="Ничего не найдено"
                />
            </template>
            <template #multiplelabel="{ values }">
                <div class="relative">
                    {{ pluralize('элемент|элемента|элементов', (values as any[]).length || 0, { showNumber: true }) }} {{ pluralize('выбран|выбрано|выбраны', (values as any[]).length || 0 ) }}
                </div>
            </template>
        </Multiselect>
    </div>
</template>
<style lang="postcss">
.multiselect {
    @apply relative mx-auto w-full flex items-center justify-end py-2 box-border cursor-pointer border border-gray-80 rounded-2xl bg-gray-60 text-base leading-snug outline-none;
}
.multiselect.is-disabled {
    @apply cursor-default bg-gray-100;
}
.multiselect.is-open {
    @apply border-b-transparent rounded-bl-none rounded-br-none;
}
.multiselect.is-open-top {
    @apply rounded-t-none;
}
.multiselect.is-active {}

.multiselect-wrapper {
    @apply relative mx-auto w-full flex items-center justify-end box-border cursor-pointer outline-none;
}

.multiselect-single-label {
    @apply flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5;
}

.multiselect-single-label-text {
    @apply overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full;
}

.multiselect-multiple-label {
    @apply flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5;
}

.multiselect-search {
    @apply w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-base font-golos bg-white rounded pl-3.5 rtl:pl-0 rtl:pr-3.5;
}

.multiselect-tags {
    @apply flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 min-w-0 rtl:pl-0 rtl:pr-2;
}

.multiselect-tag {
    @apply bg-green-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1;
}
.multiselect-tag.is-disabled {
    @apply pr-2 opacity-50 rtl:pl-2;
}

.multiselect-tag-wrapper {
    @apply whitespace-nowrap overflow-hidden overflow-ellipsis;
}

.multiselect-tag-wrapper-break {
    @apply whitespace-normal break-all;
}

.multiselect-tag-remove {
    @apply flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black-500 hover:bg-opacity-10;
}

.multiselect-tag-remove-icon {
    /* bg-multiselect-remove */
    @apply bg-center bg-no-repeat opacity-30 inline-block w-3 h-3;
}

.multiselect-tag-remove:hover .multiselect-tag-remove-icon {
    @apply opacity-60;
}

.multiselect-tags-search-wrapper {
    @apply inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full;
}

.multiselect-tags-search {
    @apply absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-golos box-border w-full;
}

.multiselect-tags-search-copy {
    @apply invisible whitespace-pre-wrap inline-block h-px;
}

.multiselect-placeholder {
    @apply flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-500 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5;
}

.multiselect-caret {
    /* bg-multiselect-caret */
    @apply bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5;
}
.multiselect-caret.is-open {
    @apply rotate-180 pointer-events-auto;
}

.multiselect-clear {
    @apply pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5;
}

.multiselect-clear-icon {
    /* bg-multiselect-remove */
    @apply bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block;
}

.multiselect-spinner {
    /* bg-multiselect-spinner */
    @apply bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0 rtl:mr-0 rtl:ml-3.5;
}

.multiselect-inifite {
    @apply flex items-center justify-center w-full;
}

.multiselect-inifite-spinner {
    /* bg-multiselect-spinner */
    @apply bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0 m-3.5;
}

.multiselect-dropdown {
    @apply max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b border-t-transparent rounded-tl-none rounded-tr-none;
}
.multiselect-dropdown.is-top {
    @apply -translate-y-full top-px bottom-auto rounded-b-none rounded-t;
}
.multiselect-dropdown.is-hidden {
    @apply hidden;
}

.multiselect-options {
    @apply flex flex-col p-0 m-0 list-none;
}

.multiselect-group {
    @apply p-0 m-0;
}

.multiselect-group-label {
    @apply flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-gray-200 cursor-default leading-normal;
}
.multiselect-group-label.is-pointable {
    @apply cursor-pointer;
}
.multiselect-group-label.is-pointed {
    @apply bg-gray-300 text-gray-700;
}
.multiselect-group-label.is-selected {
    @apply bg-gray-50 text-black;
}
.multiselect-group-label.is-disabled {
    @apply bg-gray-100 text-gray-300 cursor-not-allowed;
}
.multiselect-group-label.is-selected.is-pointed {
    @apply bg-gray-50 text-black opacity-90;
}
.multiselect-group-label.is-selected.is-disabled {
    @apply text-green-100 bg-green-600 bg-opacity-50 cursor-not-allowed;
}

.multiselect-group-options {
    @apply p-0 m-0;
}

.multiselect-option {
    @apply flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3;
}
.multiselect-option.is-pointed {
    @apply text-gray-800 bg-gray-100;
}
.multiselect-option.is-selected {
    @apply bg-gray-50 text-black;
}
.multiselect-option.is-disabled {
    @apply text-gray-300 cursor-not-allowed;
}
.multiselect-option.is-selected.is-pointed {
    @apply text-white bg-green-500 opacity-90;
}
.multiselect-option.is-selected.is-disabled {
    @apply text-green-100 bg-green-500 bg-opacity-50 cursor-not-allowed;
}

.multiselect-no-options {
    @apply py-2 px-3 text-gray-600 bg-white text-left rtl:text-right;
}

.multiselect-no-results {
    @apply py-2 px-3 text-gray-600 bg-white text-left rtl:text-right;
}

.multiselect-fake-input {
    @apply bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent;
}

.multiselect-assistive-text {
    @apply absolute -m-px w-px h-px overflow-hidden;
    clip: rect(0 0 0 0);
}

.multiselect-spacer {
    @apply h-9 py-px box-content;
}
</style>
