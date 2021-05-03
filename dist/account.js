"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_client_1 = require("./lib/http.client");
//account api http client
const accountHttp = {
    register: (registrant) => {
        return http_client_1.default.post('/accounts', registrant);
    }
};
exports.default = accountHttp;
