import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GameHost from '../renderer/components/GameHost/GameHost';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: null as GameHost | null,
  },
  reducers: {
    setGame: (state, action: PayloadAction<any>) => {
      state.game = action.payload;
    },
  },
  selectors: {
    selectGame: (state) => state.game,
  },
});

export const { setGame } = gameSlice.actions;
export const { selectGame } = gameSlice.selectors;

export default gameSlice.reducer;
