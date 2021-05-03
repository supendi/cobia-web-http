"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_client_1 = require("./lib/http.client");
//auth api http client
const authHttp = {
    login: (loginReq) => {
        return http_client_1.default.post('/auth', loginReq);
    }
};
exports.default = authHttp;
