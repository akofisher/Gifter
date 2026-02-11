import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GlobalErrorPayload = {
  title: string;
  message: string;
  status?: number;
  code?: string;
};

interface GlobalErrorState {
  current: GlobalErrorPayload | null;
}

const initialState: GlobalErrorState = {
  current: null,
};

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    showGlobalError(state, action: PayloadAction<GlobalErrorPayload>) {
      state.current = action.payload;
    },
    clearGlobalError(state) {
      state.current = null;
    },
  },
});

export const { showGlobalError, clearGlobalError } = globalErrorSlice.actions;
export default globalErrorSlice.reducer;
