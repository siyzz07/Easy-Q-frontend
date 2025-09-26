import axios, { type InternalAxiosRequestConfig } from "axios";
import { Meta } from "react-router-dom";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}



const customerAxios = axios.create({
    baseURL :import.meta.env.BASE_URL,
     headers: { "Content-Type": "application/json" },
})