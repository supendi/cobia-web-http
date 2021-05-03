"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const http_helper_1 = require("./http.helper");
//axios instance
const http = axios_1.default.create({
    baseURL: process.env.REACT_APP_API_URL
});
var accessToken;
//returns default axios config
function getAxiosConfig() {
    const defaultConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const secureConfig = {
        headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const config = (accessToken && accessToken !== "") ? secureConfig : defaultConfig;
    return config;
}
const httpClient = {
    //http get method
    get: (endPoint, params, config = getAxiosConfig()) => {
        config.params = params;
        return http.get(endPoint, config);
    },
    //http post method
    post: (endPoint, payload, config = getAxiosConfig()) => {
        return http.post(endPoint, payload, config)
            .then(response => {
            return http_helper_1.default.createResponse(response);
        })
            .catch(e => {
            return Promise.reject(http_helper_1.default.createError(e));
        });
    }
};
exports.default = httpClient;
