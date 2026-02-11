import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./Slices/AuthSlice";
import FilterReducer from "./Slices/FilterSlice";
import globalErrorReducer from "./Slices/GlobalErrorSlice";
import uiReducer from "./Slices/UiSlice";

// ✅ Persist config ONLY for auth slice
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  blacklist: ["accessToken", "loading", "error", "isBootstrapped"],
};

// ✅ Root reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  ui: uiReducer,
  filters: FilterReducer,
  globalError: globalErrorReducer,
});

// ✅ Root persist config (do NOT persist auth here again)
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["ui"], // keep ui persisted if you want
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
