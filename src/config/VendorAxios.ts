// import axios, {
//   AxiosError,
//   type AxiosResponse,
//   type InternalAxiosRequestConfig,
// } from "axios";
// import {
//   vendorGetAccessToken,
//   vendorRemoveAccessToken,
// } from "../Utils/tokenUtils";

// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

// const vendorAxios = axios.create({
//   baseURL: `${import.meta.env.VITE_BASE_URL}/api/vendor`,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// export const vendorAxiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_BASE_URL}/api/vendor`,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// vendorAxiosInstance.interceptors.request.use(
//   (config: CustomAxiosRequestConfig) => {
//     console.log("request vendor interceptorss ");
//     const token = vendorGetAccessToken();

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error: AxiosError) => {
//     console.error("User request error:", error);
//     return Promise.reject(error);
//   }
// );

// vendorAxiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,

//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     if (
//       originalRequest &&
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await vendorAxiosInstance.post("/auth/refresh-token");

//         const newAccessToken = response.data.accessToken;
//         vendorRemoveAccessToken();
//         // vendorSetAceessToken(newAccessToken);
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//         console.log(originalRequest.data);

//         return vendorAxiosInstance(originalRequest);
//       } catch (refreshError) {
//         vendorRemoveAccessToken();
//         window.location.href = "/vendor/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default vendorAxios;
