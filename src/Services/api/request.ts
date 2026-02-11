import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { clearSession, setAccessToken } from "../../Store/Slices/AuthSlice";
import { showGlobalError } from "../../Store/Slices/GlobalErrorSlice";
import { store } from "../../Store/store";
import { API_CONFIG } from "./config";
import { tokenStore } from "./tokenStore";

type RequestConfig = AxiosRequestConfig & {
  skipGlobalError?: boolean;
  skipAuthRefresh?: boolean;
  _retry?: boolean;
};

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: true,
});

type QueuedRequest = {
  resolve: (value: AxiosResponse<any>) => void;
  reject: (reason?: any) => void;
  config: RequestConfig;
};

let isRefreshing = false;
let queue: QueuedRequest[] = [];

const isAuthEndpoint = (url?: string) => {
  if (!url) return false;
  return (
    url.includes("/api/auth/refresh") ||
    url.includes("/api/auth/login") ||
    url.includes("/api/auth/register") ||
    url.includes("/api/auth/logout")
  );
};

const processQueue = (error: any, newToken: string | null) => {
  queue.forEach(async ({ resolve, reject, config }) => {
    if (error) {
      reject(error);
      return;
    }

    if (newToken) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${newToken}`;
    }

    resolve(await axiosInstance.request(config));
  });

  queue = [];
};

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isCanceled =
      axios.isCancel(error) || error?.code === "ERR_CANCELED";
    if (isCanceled) return Promise.reject(error);

    const config = (error?.config || {}) as RequestConfig;
    const status: number | undefined = error?.response?.status;

    const shouldAttemptRefresh =
      status === 401 &&
      !config._retry &&
      !config.skipAuthRefresh &&
      !isAuthEndpoint(config.url);

    if (shouldAttemptRefresh) {
      config._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject, config });
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await refreshClient.post("/api/auth/refresh");
        const newToken = (refreshRes.data as any)?.accessToken as
          | string
          | undefined;

        if (!newToken) {
          throw new Error("Refresh failed: missing access token");
        }

        tokenStore.set(newToken);
        store.dispatch(setAccessToken(newToken));

        processQueue(null, newToken);

        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${newToken}`;
        return axiosInstance.request(config);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        tokenStore.clear();
        store.dispatch(clearSession());

        if (!config.skipGlobalError) {
          const current = store.getState().globalError.current;
          const next = {
            title: "Session expired",
            message: "Please log in again.",
            status: 401,
          };
          if (
            !current ||
            current.title !== next.title ||
            current.message !== next.message ||
            current.status !== next.status
          ) {
            store.dispatch(showGlobalError(next));
          }
        }

        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    if (config.skipGlobalError) return Promise.reject(error);

    const data = error?.response?.data ?? {};

    let message =
      data?.message ||
      data?.error ||
      data?.detail ||
      (Array.isArray(data?.errors)
        ? data.errors
            .map((item: any) => item?.message || item)
            .filter(Boolean)
            .join("\n")
        : undefined) ||
      error?.message ||
      "Something went wrong.";

    if (typeof message !== "string") {
      try {
        message = JSON.stringify(message);
      } catch {
        message = "Something went wrong.";
      }
    }

    if (error?.code === "ECONNABORTED") {
      message = "Request timed out. Please try again.";
    }
    if (error?.message === "Network Error") {
      message = "Network error. Check your connection and try again.";
    }

    let title = "Something went wrong";
    if (status) {
      if (status >= 500) title = "Server error";
      else if (status === 401) title = "Unauthorized";
      else if (status === 403) title = "Forbidden";
      else if (status === 404) title = "Not found";
      else if (status === 422) title = "Validation error";
      else title = `Error ${status}`;
    }

    const current = store.getState().globalError.current;
    const next = { title, message, status };
    if (
      !current ||
      current.title !== next.title ||
      current.message !== next.message ||
      current.status !== next.status
    ) {
      store.dispatch(showGlobalError(next));
    }

    return Promise.reject(error);
  }
);

/**
 * ✅ request wrapper:
 * - returns JSON body (res.data)
 * - provides all HTTP verbs
 * - fully typed with generics
 */
export const request = {
  get: async <T>(url: string, config?: RequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.get(url, config);
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.post(url, data, config);
    return res.data;
  },

  put: async <T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.put(url, data, config);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.patch(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: RequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return res.data;
  },

  // optional: exposed if you ever need direct axios config
  raw: axiosInstance,
};

