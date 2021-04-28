import httpClient from "./lib/http.notification.client"
import { UpdateViewRequest } from "@cobia/types"

//auth api http client
const notificationHttp = {
    login: (loginReq: UpdateViewRequest) => {
        return httpClient.put<any, UpdateViewRequest>('/auth', loginReq)
    }
}

export default notificationHttp