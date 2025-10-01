import axios, { type InternalAxiosRequestConfig } from "axios";
import { Meta } from "react-router-dom";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}



const customerAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/customer`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});



export default customerAxios