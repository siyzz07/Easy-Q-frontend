import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  removeToken,
  setAccessToken,
} from "../Utils/tokenUtils";
import { toast } from "react-toastify";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = (role: string) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/${role}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          console.log("Access token expired");

          const refreshResponse = await instance.post("/auth/refresh-token");
          const newAccessToken = refreshResponse.data.accessToken;

          removeToken();
          setAccessToken(newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.log("Refresh token error");
          removeToken();
          window.location.href = `/${role}/login`;
          return Promise.reject(refreshError);
        }
      }

      if (
        error.response?.status === 403 &&
        (error.response.data as any)?.message === "Your account is blocked"
      ) {
        toast.error("Your account has been blocked by admin.");
        removeToken();
        window.location.href = `/${role}/login`;
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const adminAxiosInstance = axiosInstance("admin");
export const VendorAxiosInstance = axiosInstance("vendor");
export const CustomerAxiosInstance = axiosInstance("customer");
