import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Score, Show, ShowGame } from '../types';

export const showSlice = createSlice({
  name: 'show',
  initialState: {
    show: null as Show | null,
  },
  reducers: {
    setShow: (state, action: PayloadAction<any>) => {
      state.show = action.payload;
    },
    setTeamScores: (state, action: PayloadAction<{ gameId: string; teamScores: Score[] }>) => {
      const showGame = state.show?.games.find((x) => x.gameId === action.payload.gameId);
      if (showGame) {
        showGame.teamScores = action.payload.teamScores;
      }
    },
    setFinished: (state, action: PayloadAction<{ gameId: string; finished: boolean }>) => {
      const showGame = state.show?.games.find((x) => x.gameId === action.payload.gameId);
      if (showGame) {
        showGame.finished = action.payload.finished;
      }
    },
    setScoreToWin: (state, action: PayloadAction<{ gameId: string; scoreToWin: number }>) => {
      const showGame = state.show?.games.find((x) => x.gameId === action.payload.gameId);
      if (showGame) {
        showGame.scoreToWin = action.payload.scoreToWin;
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

export const { setShow, setTeamScores, setFinished, setScoreToWin } = showSlice.actions;
export const { selectShow, selectShowGame } = showSlice.selectors;

export default showSlice.reducer;
