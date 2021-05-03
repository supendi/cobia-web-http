import { Account, Registrant } from "@cobia/types";
declare const accountHttp: {
    register: (registrant: Registrant) => Promise<object | import("./lib/http.types").HttpNetworkErrorResponse<import("./lib/types").ServerError> | import("./lib/http.types").HttpErrorResponse<import("./lib/types").ServerError> | import("axios").AxiosResponse<import("./lib/types").ServerError>> | Promise<import("./lib/http.types").HttpResponse<Account>>;
};
export default accountHttp;
