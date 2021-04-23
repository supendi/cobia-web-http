import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpErrorResponse, HttpNetworkErrorResponse, HttpResponse } from './http.types';
import axiosHttpHelper from './http.helper'
import { ServerError } from './types';

//axios instance
const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

var accessToken: string;

//returns default axios config
function getAxiosConfig(): AxiosRequestConfig {
    const defaultConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    const secureConfig = {
        headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    const config = (accessToken && accessToken !== "") ? secureConfig : defaultConfig
    return config
}

const httpClient = {
    //http get method
    get: <T>(endPoint: string, params: any, config = getAxiosConfig()) => {
        config.params = params
        return http.get<T>(endPoint, config)
    },

    //http post method
    post: <TResponse, TPayload>(endPoint: string, payload: TPayload, config = getAxiosConfig()): Promise<HttpResponse<TResponse>> | Promise<HttpErrorResponse<ServerError> | HttpNetworkErrorResponse<ServerError> | AxiosResponse<ServerError> | object> => {
        return http.post<TResponse>(endPoint, payload, config)
            .then(response => {
                return axiosHttpHelper.createResponse<TResponse>(response)
            })
            .catch(e => {
                return Promise.reject(axiosHttpHelper.createError(e))
            })
    }
}

export default httpClient
