import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show } from '../types';

export const showSlice = createSlice({
  name: 'show',
  initialState: {
    show: null as Show | null,
  },
  reducers: {
    setShow: (state, action: PayloadAction<any>) => {
      state.show = action.payload;
    },
  },
  selectors: {
    selectShow: (state) => state.show,
  },
});

export const { setShow } = showSlice.actions;
export const { selectShow } = showSlice.selectors;

export default showSlice.reducer;
