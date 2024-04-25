export interface FormFieldAttributes {
    id: string;
    placeholder?: string|null;
    disabled?: boolean|null;
    required?: boolean|null;
    readonly?: boolean|null;
}

export interface FormFieldProps {
    modelValue?: string|number|boolean|object|(string|number|boolean|object)[]|null;
    id: string;
    title: string;
    placeholder?: FormFieldAttributes['placeholder'];
    error?: string|null|boolean;
    disabled?: FormFieldAttributes['disabled'];
    required?: FormFieldAttributes['required'];
    readonly?: FormFieldAttributes['readonly'];
}

export function useFormField () {

}
