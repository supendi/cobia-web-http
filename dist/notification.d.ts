import { UpdateViewRequest } from "@cobia/types";
declare const notificationHttp: {
    put: (updateReq: UpdateViewRequest) => Promise<object | import("./lib/http.types").HttpNetworkErrorResponse<import("./lib/types").ServerError> | import("./lib/http.types").HttpErrorResponse<import("./lib/types").ServerError> | import("axios").AxiosResponse<import("./lib/types").ServerError>> | Promise<import("./lib/http.types").HttpResponse<any>>;
};
export default notificationHttp;
