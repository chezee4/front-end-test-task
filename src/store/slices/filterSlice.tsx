import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  name: string;
  origin: string;
}

const initialState: FilterState = {
  name: '',
  origin: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
