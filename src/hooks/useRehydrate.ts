import axios from "axios";
import { parseCookies } from "nookies";

export const api_util = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
        api_secret: process.env.NEXT_PUBLIC_API_SECRET,
    }

})
export function useUser() {
    const { token, usuario_id } = parseCookies();

    return api_util.get(`user/${usuario_id}`, {
        headers: {
            "Authorization": "Bearer " + token,
            "Accept-Content": "application/json"
        }
    });
}