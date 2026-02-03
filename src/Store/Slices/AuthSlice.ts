import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * ✅ Auth user type (matches your backend user object)
 * Keep this in auth domain, not in NewsData.
 */
export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  role: "user" | "admin";
  isActive: boolean;

  avatar?: {
    url?: string;
    // later if you want:
    // base64?: string;
  };

  stats?: {
    giving: number;
    exchanging: number;
    exchanged: number;
    given: number;
  };

  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isLoggedIn: boolean;

  isBootstrapped: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,

  isBootstrapped: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * ✅ Used after login/register success
     */
    setSession(
      state,
      action: PayloadAction<{ accessToken: string; user: AuthUser }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.error = null;
    },

    /**
     * ✅ Used after /refresh success
     */
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },

    /**
     * ✅ Used after /me success
     */
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },

    /**
     * ✅ Logout / session invalid
     */
    clearSession(state) {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
      // keep bootstrapped true if app already booted
      // state.isBootstrapped = true;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setBootstrapped(state, action: PayloadAction<boolean>) {
      state.isBootstrapped = action.payload;
    },
  },
});

export const {
  setSession,
  setAccessToken,
  setUser,
  clearSession,
  setLoading,
  setError,
  setBootstrapped,
} = authSlice.actions;

export default authSlice.reducer;
