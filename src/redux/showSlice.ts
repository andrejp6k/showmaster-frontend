import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show, ShowGame, UpdateScorePointsPayload } from '../types';

export const showSlice = createSlice({
  name: 'show',
  initialState: {
    show: null as Show | null,
  },
  reducers: {
    setShow: (state, action: PayloadAction<any>) => {
      state.show = action.payload;
    },
    setTeamScores: (state, action: PayloadAction<UpdateScorePointsPayload>) => {
      const showGame = state.show?.games.find((x) => x.gameId === action.payload.gameId);
      if (showGame) {
        showGame.teamScores = action.payload.teamScores;
      }
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

export const { setShow, setTeamScores } = showSlice.actions;
export const { selectShow, selectShowGame } = showSlice.selectors;

export default showSlice.reducer;
