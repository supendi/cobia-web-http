import httpClient from "./http.client"
import { LoginRequest } from "@cobia/types"

//auth api http client
const authHttp = {
    login: (loginReq: LoginRequest) => {
        return httpClient.post<any, LoginRequest>('/auth', loginReq)
    }
}

export default authHttp