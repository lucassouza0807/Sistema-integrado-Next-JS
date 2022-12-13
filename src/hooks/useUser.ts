import { parseCookies } from "nookies";
import { api_helper } from "../helpers/api_helper";

export function useUser() {
    const { token, usuario_id } = parseCookies();

    return token
        ? api_helper.get(`user/${usuario_id}`, {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept-Content": "application/json"
            }
        })
        : Promise.reject("No token provided")
}