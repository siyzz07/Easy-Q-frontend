import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { Meta } from "react-router-dom";
import {
  customerGetAccessToken,
  customerRemoveAccessToken,
  customerSetAceesToken,
} from "../Utils/tokenUtils";
import { vendorAxiosInstance } from "./VendorAxios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const customerAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/customer`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const customerAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/customer`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

customerAxiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    console.log("requst customer interceptors");
    const token = customerGetAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("User request error:", error);
    return Promise.reject(error);
  }
);

vendorAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await vendorAxiosInstance.post("/auth/refresh-token");

        const newAccessToken = response.data.accessToken;
        customerRemoveAccessToken();
        customerSetAceesToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        console.log(originalRequest.data);

        return customerAxiosInstance(originalRequest);
      } catch (refreshError) {
        customerRemoveAccessToken();
        window.location.href = "/vendor/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default customerAxios;
