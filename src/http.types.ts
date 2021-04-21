import { Method } from "axios";

//Represents http response model
export interface HttpResponse<T> {
    request: {
        method?: Method,
        payload?: any,
        url?: string,
        headers?: any
    },
    data: T,
    status: number,
    statusText: string,
    hasError: boolean
}

//Represents http error response model
export interface HttpErrorResponse<T> extends HttpResponse<T> {
    isHttpError: boolean
}

//Represents http network error
export interface HttpNetworkErrorResponse<T> extends HttpErrorResponse<T> {
    isNetworkError: true,
}
