import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryInterface } from '../../Services/NewsData';

interface FiltersState {
  category?: CategoryInterface; 
}

const initialState: FiltersState = {
  category: undefined, 
};

const FiltersSlice = createSlice({
  name: 'filters',
  initialState,
   reducers: {
    setCategory(state, action: PayloadAction<CategoryInterface | undefined>) {
      const current = state.category;
      const next = action.payload;

      if (
        current?.id === next?.id &&
        current?.name === next?.name
      ) {
        return state.category = undefined; 
      }

      state.category = next;
    },
  },
});

export const { setCategory } = FiltersSlice.actions;
export default FiltersSlice.reducer;
