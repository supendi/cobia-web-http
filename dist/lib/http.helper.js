"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//so far I can only detect a network error from the message property of an axios error
const isNetworkError = (error) => {
    return error && error.message === "Network Error";
};
//Returns response from axios response with no errors.
function createResponse(response) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
        request: {
            method: (_a = response === null || response === void 0 ? void 0 : response.config) === null || _a === void 0 ? void 0 : _a.method,
            payload: (_b = response === null || response === void 0 ? void 0 : response.config) === null || _b === void 0 ? void 0 : _b.data,
            url: (_f = (_d = (_c = response === null || response === void 0 ? void 0 : response.config) === null || _c === void 0 ? void 0 : _c.baseURL) !== null && _d !== void 0 ? _d : "" + ((_e = response === null || response === void 0 ? void 0 : response.config) === null || _e === void 0 ? void 0 : _e.url)) !== null && _f !== void 0 ? _f : "",
            headers: (_g = response === null || response === void 0 ? void 0 : response.config) === null || _g === void 0 ? void 0 : _g.headers
        },
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        hasError: false,
    };
}
//transform axios's network error to a simpler error object: HttpNetworkErrorResponse
function createNetworkError(axiosErrorResponse) {
    var _a, _b;
    return {
        request: {
            method: axiosErrorResponse.config.method,
            payload: axiosErrorResponse.config.data,
            url: ((_a = axiosErrorResponse === null || axiosErrorResponse === void 0 ? void 0 : axiosErrorResponse.config) === null || _a === void 0 ? void 0 : _a.baseURL) + ((_b = axiosErrorResponse === null || axiosErrorResponse === void 0 ? void 0 : axiosErrorResponse.config) === null || _b === void 0 ? void 0 : _b.url),
            headers: axiosErrorResponse.config.headers
        },
        data: {
            message: "Network Error",
            errors: []
        },
        status: 0,
        statusText: "Network Error",
        isNetworkError: true,
        isHttpError: true,
        hasError: false
    };
}
//transform an axios http error response (not a 2xx server response) to a simpler error object
function createFormattedError(axiosErrorResponse) {
    var _a, _b, _c, _d;
    return {
        request: {
            method: axiosErrorResponse.config.method,
            payload: axiosErrorResponse.config.data,
            url: (_d = (_b = (_a = axiosErrorResponse === null || axiosErrorResponse === void 0 ? void 0 : axiosErrorResponse.config) === null || _a === void 0 ? void 0 : _a.baseURL) !== null && _b !== void 0 ? _b : "" + ((_c = axiosErrorResponse === null || axiosErrorResponse === void 0 ? void 0 : axiosErrorResponse.config) === null || _c === void 0 ? void 0 : _c.url)) !== null && _d !== void 0 ? _d : "",
            headers: axiosErrorResponse.config.headers
        },
        data: axiosErrorResponse.data,
        status: axiosErrorResponse.status,
        statusText: axiosErrorResponse.statusText,
        hasError: axiosErrorResponse.data.errors && axiosErrorResponse.data.errors.length > 0,
        isHttpError: true
    };
}
//trasform an axios error to a simpler error object
const createError = (e) => {
    var _a;
    var error = getAxiosErrorObj(e);
    if (error && ((_a = error) === null || _a === void 0 ? void 0 : _a.status)) {
        const formattedError = createFormattedError(error);
        //console.log(formattedError)
        return formattedError;
    }
    if (isNetworkError(error)) {
        const networkError = createNetworkError(error);
        //console.log(networkError)
        return networkError;
    }
    //console.log(error)
    return error;
};
//get error object from axios error
const getAxiosErrorObj = (e) => {
    //if axios error does have the response property. it's usually server who returns the response 
    if (e.response) {
        // console.log(e.response)
        return e.response;
    }
    else {
        //Otherwhise, it is either a network or a cors error
        if (e.toJSON) {
            // console.log(e.toJSON())
            return e.toJSON();
        }
    }
    return e;
};
//Returns errors from http response as object
const getFieldErrorsAsObject = (error) => {
    if (error.data.errors) {
        const errObj = {};
        error.data.errors.forEach((e, idx) => {
            errObj[e.field] = e.message;
        });
        return errObj;
    }
    return null;
};
//Axios http helper for transforming the error and the response object
const axiosHttpHelper = {
    //trasform an axios error to a simpler error object
    createError: (e) => {
        return createError(e);
    },
    //returns the response data as the same object model as error
    createResponse: (response) => {
        return createResponse(response);
    },
    getFieldErrorsAsObject: (error) => {
        return getFieldErrorsAsObject(error);
    }
};
exports.default = axiosHttpHelper;
