"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_notification_client_1 = require("./lib/http.notification.client");
//auth api http client
const notificationHttp = {
    put: (updateReq) => {
        return http_notification_client_1.default.put('/notifications/view', updateReq);
    }
};
exports.default = notificationHttp;
