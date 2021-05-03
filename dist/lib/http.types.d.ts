import { Method } from "axios";
export interface HttpResponse<T> {
    request: {
        method?: Method;
        payload?: any;
        url?: string;
        headers?: any;
    };
    data: T;
    status: number;
    statusText: string;
    hasError: boolean;
}
export interface HttpErrorResponse<T> extends HttpResponse<T> {
    isHttpError: boolean;
}
export interface HttpNetworkErrorResponse<T> extends HttpErrorResponse<T> {
    isNetworkError: true;
}
