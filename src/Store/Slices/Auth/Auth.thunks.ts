import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../../Services/api/auth/auth.service";
import { authService } from "../../../Services/api/auth/auth.service";
import {
  clearSession,
  setAccessToken,
  setBootstrapped,
  setError,
  setLoading,
  setUser,
} from "../AuthSlice";

export type LoginPayload = {
  email: string;
  password: string;
  deviceId: string;
};

type AuthSuccess = {
  accessToken: string;
  user: User;
};

/**
 * ✅ LOGIN
 */
export const loginThunk = createAsyncThunk<
  AuthSuccess,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const loginRes = await authService.login({
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      deviceId: payload.deviceId,
    });

    if (!loginRes?.accessToken) {
      throw new Error("Missing accessToken from login");
    }

    dispatch(setAccessToken(loginRes.accessToken));

    const meRes = await authService.me();
    dispatch(setUser(meRes.user));

    return { accessToken: loginRes.accessToken, user: meRes.user };
  } catch (err: any) {
    dispatch(clearSession());

    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Login failed";

    dispatch(setError(msg));
    return rejectWithValue(msg);
  } finally {
    dispatch(setLoading(false));
  }
});

/**
 * ✅ BOOTSTRAP (app start)
 */
export const bootstrapThunk = createAsyncThunk<void, void>(
  "auth/bootstrap",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const refreshRes = await authService.refresh();
      if (!refreshRes?.accessToken) throw new Error("No access token from refresh");

      dispatch(setAccessToken(refreshRes.accessToken));

      const meRes = await authService.me();
      dispatch(setUser(meRes.user));
    } catch {
      dispatch(clearSession());
    } finally {
      dispatch(setLoading(false));
      dispatch(setBootstrapped(true));
    }
  }
);

/**
 * ✅ LOGOUT (current device session)
 */
export const logoutThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      await authService.logout();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Logout failed";
      dispatch(setError(msg));
    } finally {
      dispatch(clearSession());
      dispatch(setLoading(false));
    }
  }
);
