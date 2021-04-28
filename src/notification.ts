import httpClient from "./lib/http.notification.client"
import { UpdateViewRequest } from "@cobia/types"

//auth api http client
const notificationHttp = {
    put: (updateReq: UpdateViewRequest) => {
        return httpClient.put<any, UpdateViewRequest>('/notifications/view', updateReq)
    }
}

export default notificationHttp