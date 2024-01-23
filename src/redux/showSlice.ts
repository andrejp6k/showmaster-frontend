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
    setShowGame: (state, action: PayloadAction<ShowGame>) => {
      const gameIndex = state.show?.games.findIndex((x) => x.gameId === action.payload.gameId);

      if (state.show && state.show.games && state.show.games.length > 0 && gameIndex !== undefined && gameIndex >= 0) {
        const showGames = state.show?.games as ShowGame[];
        showGames[gameIndex] = action.payload;
        state.show = { ...state.show, games: showGames } as Show;
        console.log('showGame replaced', state.show);
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

export const { setShow, setTeamScores, setShowGame } = showSlice.actions;
export const { selectShow, selectShowGame } = showSlice.selectors;

export default showSlice.reducer;
