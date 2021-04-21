import { AxiosError, AxiosResponse } from "axios"
import { HttpErrorResponse, HttpNetworkErrorResponse, HttpResponse } from "./http.types"
import { ServerError } from "../lib/validator"
import globalDictionary from "./dictionary"

//so far I can only detect a network error from the message property of an axios error
const isNetworkError = (error: any): boolean => {
    return error && error.message === "Network Error"
}

//Returns response from axios response with no errors.
function createResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
    return {
        request: {
            method: response?.config?.method,
            payload: response?.config?.data,
            url: response?.config?.baseURL ?? "" + response?.config?.url ?? "",
            headers: response?.config?.headers
        },
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        hasError: false,
    }
}

//transform axios's network error to a simpler error object: HttpNetworkErrorResponse
function createNetworkError(axiosErrorResponse: any): HttpNetworkErrorResponse<ServerError> {
    return {
        request: {
            method: axiosErrorResponse.config.method,
            payload: axiosErrorResponse.config.data,
            url: axiosErrorResponse?.config?.baseURL + axiosErrorResponse?.config?.url,
            headers: axiosErrorResponse.config.headers
        },
        data: {
            message: globalDictionary.networkError,
            errors: []
        },
        status: 0,
        statusText: globalDictionary.networkError,
        isNetworkError: true,
        isHttpError: true,
        hasError: false
    }
}

//transform an axios http error response (not a 2xx server response) to a simpler error object
function createFormattedError(axiosErrorResponse: AxiosResponse<ServerError>): HttpErrorResponse<ServerError> {
    return {
        request: {
            method: axiosErrorResponse.config.method,
            payload: axiosErrorResponse.config.data,
            url: axiosErrorResponse?.config?.baseURL ?? "" + axiosErrorResponse?.config?.url ?? "",
            headers: axiosErrorResponse.config.headers
        },
        data: axiosErrorResponse.data,
        status: axiosErrorResponse.status,
        statusText: axiosErrorResponse.statusText,
        hasError: axiosErrorResponse.data.errors && axiosErrorResponse.data.errors.length > 0,
        isHttpError: true
    }
}

//trasform an axios error to a simpler error object
const createError = <T>(e: AxiosError<T>): HttpErrorResponse<T> | HttpNetworkErrorResponse<T> | AxiosResponse<T> | object => {
    var error = getAxiosErrorObj<T>(e);

    if (error && (error as AxiosResponse)?.status) {
        const formattedError = createFormattedError(error as AxiosResponse)
        //console.log(formattedError)
        return formattedError
    }
    if (isNetworkError(error)) {
        const networkError = createNetworkError(error)
        //console.log(networkError)
        return networkError
    }
    //console.log(error)
    return error
}

//get error object from axios error
const getAxiosErrorObj = <T>(e: AxiosError<T>): AxiosResponse | object => {
    //if axios error does have the response property. it's usually server who returns the response 
    if (e.response) {
        // console.log(e.response)
        return e.response
    } else {
        //Otherwhise, it is either a network or a cors error
        if (e.toJSON) {
            // console.log(e.toJSON())
            return e.toJSON()
        }
    }
    return e
}

//Returns errors from http response as object
const getFieldErrorsAsObject = <T>(error: HttpResponse<ServerError>): T | null => {
    if (error.data.errors) {
        const errObj: any = {}
        error.data.errors.forEach((e: any, idx: number) => {
            errObj[e.field] = e.message
        })
        return errObj as T
    }
    return null
}

//Axios http helper for transforming the error and the response object
const axiosHttpHelper = {
    //trasform an axios error to a simpler error object
    createError: (e: AxiosError<any>): HttpErrorResponse<ServerError> | HttpNetworkErrorResponse<ServerError> | AxiosResponse<ServerError> | object => {
        return createError<ServerError>(e)
    },
    //returns the response data as the same object model as error
    createResponse: <T>(response: AxiosResponse<T>): HttpResponse<T> => {
        return createResponse(response)
    },
    getFieldErrorsAsObject: <T>(error: HttpResponse<ServerError>): T | null => {
        return getFieldErrorsAsObject(error)
    }
}

export default axiosHttpHelper