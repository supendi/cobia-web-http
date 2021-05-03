import { AxiosError, AxiosResponse } from "axios";
import { HttpErrorResponse, HttpNetworkErrorResponse, HttpResponse } from "./http.types";
import { ServerError } from "./types";
declare const axiosHttpHelper: {
    createError: (e: AxiosError<any>) => object | HttpNetworkErrorResponse<ServerError> | HttpErrorResponse<ServerError> | AxiosResponse<ServerError>;
    createResponse: <T>(response: AxiosResponse<T>) => HttpResponse<T>;
    getFieldErrorsAsObject: <T_1>(error: HttpResponse<ServerError>) => T_1;
};
export default axiosHttpHelper;
