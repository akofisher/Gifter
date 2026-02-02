import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  language: string;
}

const initialState: UiState = {
  language: 'ka',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
