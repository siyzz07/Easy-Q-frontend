import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { adminGetAccessToken, adminRemoveAccessToken, adminSetAceesToken } from "../Utils/tokenUtils";


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}


const adminAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/admin`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const adminAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/admin`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


adminAxiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    console.log("requst customer interceptors");
    const token = adminGetAccessToken();

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




adminAxiosInstance.interceptors.response.use(
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
        const response = await adminAxiosInstance.post("/auth/refresh-token");

        const newAccessToken = response.data.accessToken;
        adminRemoveAccessToken()
        adminSetAceesToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        console.log(originalRequest.data);

        return adminAxiosInstance(originalRequest);
      } catch (refreshError) {
        adminRemoveAccessToken()
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default adminAxios