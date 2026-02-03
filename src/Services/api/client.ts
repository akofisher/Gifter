import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { API_CONFIG } from "./config";

// ✅ Import your redux store + actions

import { clearSession, setAccessToken } from "../../Store/Slices/AuthSlice";
import { store } from "../../Store/store";



// Optional: only if you installed @react-native-cookies/cookies properly
let CookieManager: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  CookieManager = require("@react-native-cookies/cookies").default;
} catch {
  CookieManager = null;
}

type FailedRequest = {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
};

let isRefreshing = false;
let queue: FailedRequest[] = [];

const processQueue = (error: any, newToken: string | null) => {
  queue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
      return;
    }

    if (newToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${newToken}`;
    }

    resolve(api.request(config));
  });

  queue = [];
};

export const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: true, // ✅ required for HttpOnly refresh cookie
});

// ✅ Attach Authorization header dynamically from Redux
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  config.headers = config.headers ?? {};
  config.headers.Accept = "application/json";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Auto-refresh on 401 + queue
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalConfig = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const status = error.response?.status;

    // If no config, just throw
    if (!originalConfig) throw error;

    // Avoid refresh loop: never try to refresh if the failing request is refresh/logout/login/register
    const url = originalConfig.url || "";
    const isAuthEndpoint =
      url.includes("/api/auth/refresh") ||
      url.includes("/api/auth/login") ||
      url.includes("/api/auth/register") ||
      url.includes("/api/auth/logout");

    // If not 401, or already retried, or auth endpoint -> fail fast
    if (status !== 401 || originalConfig._retry || isAuthEndpoint) {
      throw error;
    }

    originalConfig._retry = true;

    // If refresh already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject, config: originalConfig });
      });
    }

    isRefreshing = true;

    try {
      // Optional cookie debug/sync for RN (only if installed properly)
      // This is not strictly required, but can help in some RN setups.
      if (CookieManager) {
        // eslint-disable-next-line no-unused-vars
        const cookies = await CookieManager.get(API_CONFIG.baseURL);
      }

      // Refresh using cookie
      const refreshRes = await api.post("/api/auth/refresh");
      const newAccessToken = (refreshRes.data as any)?.accessToken as
        | string
        | undefined;

      if (!newAccessToken) {
        // no token => session dead
        store.dispatch(clearSession());
        processQueue(new Error("Refresh failed: no accessToken"), null);
        throw error;
      }

      // ✅ Update Redux token (single source of truth)
      store.dispatch(setAccessToken(newAccessToken));

      // Retry queued requests
      processQueue(null, newAccessToken);

      // Retry original request
      originalConfig.headers = originalConfig.headers ?? {};
      originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
      return api.request(originalConfig);
    } catch (refreshErr) {
      // Refresh failed -> clear session
      store.dispatch(clearSession());
      processQueue(refreshErr, null);
      throw refreshErr;
    } finally {
      isRefreshing = false;
    }
  }
);
