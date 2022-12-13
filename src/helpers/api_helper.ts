import axios from "axios";

export const api_helper = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
        api_secret: process.env.NEXT_PUBLIC_API_SECRET,
    }

})