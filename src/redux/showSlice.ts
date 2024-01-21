import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show, ShowGame } from '../types';

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
    selectShowGame: createSelector(
      (state) => state.show?.games,
      (_, gameId) => gameId,
      (games: ShowGame[], gameId) => games?.find((game) => game.gameId === gameId),
    ),
  },
});

export const { setShow } = showSlice.actions;
export const { selectShow, selectShowGame } = showSlice.selectors;

export default showSlice.reducer;
