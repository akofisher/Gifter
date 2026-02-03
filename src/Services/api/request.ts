import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG } from "./config";
import { tokenStore } from "./tokenStore";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = tokenStore.get();

  config.headers = config.headers ?? {};
  config.headers.Accept = "application/json";

  if (token) {
    // axios v1 types can complain if headers is not a plain object — we ensured it above.
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * ✅ request wrapper:
 * - returns JSON body (res.data)
 * - provides all HTTP verbs
 * - fully typed with generics
 */
export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.get(url, config);
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.post(url, data, config);
    return res.data;
  },

  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.put(url, data, config);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.patch(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return res.data;
  },

  // optional: exposed if you ever need direct axios config
  raw: axiosInstance,
};

// import axios, { AxiosRequestConfig } from 'axios';
// import { API_CONFIG } from './config';
// import { tokenStore } from './tokenStore';

// export const http = axios.create({
//   baseURL: API_CONFIG.baseURL,
//   timeout: API_CONFIG.timeout,
//   withCredentials: true, // ✅ cookies for refresh
// });

// // ✅ attach access token
// http.interceptors.request.use(config => {
//   const token = tokenStore.get();
//   if (token) {
//     config.headers = config.headers ?? {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   config.headers = config.headers ?? {};
//   config.headers.Accept = 'application/json';
//   return config;
// });

// // ✅ strongly typed helpers that return response.data
// export const request = {
//   get: async <T>(url: string, config?: AxiosRequestConfig) => {
//     const res = await http.get<T>(url, config);
//     return res.data;
//   },

//   post: async <T>(url: string, body?: any, config?: AxiosRequestConfig) => {
//     const res = await http.post<T>(url, body, config);
//     return res.data;
//   },

//   patch: async <T>(url: string, body?: any, config?: AxiosRequestConfig) => {
//     const res = await http.patch<T>(url, body, config);
//     return res.data;
//   },

//   delete: async <T>(url: string, config?: AxiosRequestConfig) => {
//     const res = await http.delete<T>(url, config);
//     return res.data;
//   },
// };

