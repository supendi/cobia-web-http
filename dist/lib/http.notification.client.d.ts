import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpErrorResponse, HttpNetworkErrorResponse, HttpResponse } from './http.types';
import { ServerError } from './types';
declare const httpClient: {
    get: <T>(endPoint: string, params: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    post: <TResponse, TPayload>(endPoint: string, payload: TPayload, config?: AxiosRequestConfig) => Promise<object | HttpNetworkErrorResponse<ServerError> | HttpErrorResponse<ServerError> | AxiosResponse<ServerError>> | Promise<HttpResponse<TResponse>>;
    put: <TResponse_1, TPayload_1>(endPoint: string, payload: TPayload_1, config?: AxiosRequestConfig) => Promise<object | HttpNetworkErrorResponse<ServerError> | HttpErrorResponse<ServerError> | AxiosResponse<ServerError>> | Promise<HttpResponse<TResponse_1>>;
};
export default httpClient;
