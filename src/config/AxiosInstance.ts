import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  decodeToken,
  getAccessToken,
  removeToken,
  setAccessToken,
} from "../utils/tokenUtils";
import { toast } from "react-toastify";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
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

          const tokenDecode = decodeToken()
        
          const refreshResponse = await instance.post("/auth/refresh-token",{role:tokenDecode?.role});
          const newAccessToken = refreshResponse.data.accessToken;

          removeToken();
          setAccessToken(newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.log("Refresh token error");
          removeToken();
          window.location.href = `/customer/login`;
          return Promise.reject(refreshError);
        }
      }

      if (
        error.response?.status === 403 &&
        (error.response.data as any)?.message === "Your account is blocked"
      ) {
        toast.error("Your account has been blocked by admin.");
        removeToken();
        window.location.href = `/customer/login`;
      }

      return Promise.reject(error);
    }
  );

  return instance;
};


// ""'contract

export const adminAxiosInstance = axiosInstance();
export const VendorAxiosInstance = axiosInstance();
export const CustomerAxiosInstance = axiosInstance();
export const BookingAxiosInstance =axiosInstance()
// ----------- contract
export const ContractAxiosInstance = axiosInstance()

export const authAxiosInstance = axiosInstance()
