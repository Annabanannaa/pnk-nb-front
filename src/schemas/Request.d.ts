import type { FetchError } from 'ofetch'

export type RequestErrorType = 'validation_error'
export type RequestErrorCode = 'invalid_input'
export interface RequestErrorData {
    type: RequestErrorType;
    code: RequestErrorCode;
    detail: string;
    attr: string;
    description: string | null;
}

export type RequestError = FetchError<RequestErrorData>;
