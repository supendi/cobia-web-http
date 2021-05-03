import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpErrorResponse, HttpNetworkErrorResponse, HttpResponse } from './http.types';
import { ServerError } from './types';
declare const httpClient: {
    get: <T>(endPoint: string, params: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    post: <TResponse, TPayload>(endPoint: string, payload: TPayload, config?: AxiosRequestConfig) => Promise<HttpResponse<TResponse>> | Promise<object | HttpNetworkErrorResponse<ServerError> | HttpErrorResponse<ServerError> | AxiosResponse<ServerError>>;
};
export default httpClient;
