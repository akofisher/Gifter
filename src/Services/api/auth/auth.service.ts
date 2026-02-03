import CookieManager from '@react-native-cookies/cookies';
import { request } from '../request';
import { tokenStore } from '../tokenStore';

/** -------------------------
 * Types
 * ------------------------ */
export type RegisterPayload = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;

  preferred_time?: string;
  birthday?: string;

  deviceId: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  deviceId: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  avatar?: { url?: string };
  stats?: any;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
};

export type SessionItem = {
  id: string;
  deviceId: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt: string;
};

/** -------------------------
 * API Responses
 * ------------------------ */
export type RegisterResponse = {
  success: boolean;
  authenticated?: boolean;
  message?: string;
  user: User;
  accessToken: string;
};

export type LoginResponse = {
  success: boolean;
  authenticated?: boolean;
  message?: string;
  accessToken: string;
};

export type MeResponse = {
  success: boolean;
  user: User;
};

export type RefreshResponse = {
  success: boolean;
  accessToken: string;
};

export type SessionsResponse = {
  success: boolean;
  sessions: SessionItem[];
};

export type SimpleResponse = {
  success: boolean;
  message?: string;
};

export const authService = {
  sessions: () => request.get<SessionsResponse>('/api/auth/sessions'),

  revokeSession: (sessionId: string) =>
    request.post<SimpleResponse>(`/api/auth/sessions/${sessionId}/revoke`),

  logoutAll: () => request.post<SimpleResponse>('/api/auth/logout-all'),

  register: async (payload: RegisterPayload) => {
    const data = await request.post<RegisterResponse>('/api/auth/register', payload);
    if (data?.accessToken) tokenStore.set(data.accessToken);
    return data;
  },

  login: async (payload: LoginPayload) => {
    const data = await request.post<LoginResponse>('/api/auth/login', payload);
    if (data?.accessToken) tokenStore.set(data.accessToken);
    return data;
  },

  me: () => request.get<MeResponse>('/api/users/me'),

  refresh: async () => {
    const data = await request.post<RefreshResponse>('/api/auth/refresh');
    if (data?.accessToken) tokenStore.set(data.accessToken);
    return data;
  },

  logout: async () => {
    await request.post('/api/auth/logout');
    tokenStore.clear();
    await CookieManager.clearAll(true);
  },
};
