import httpClient from "./lib/http.client"
import { Account, Registrant } from "@cobia/types"

//account api http client
const accountHttp = {
    register: (registrant: Registrant) => {
        return httpClient.post<Account, Registrant>('/accounts', registrant)
    }
}

export default accountHttp