import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../types';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: null as Game | null,
    currentActivateQuestionId: null as string | null,
  },
  reducers: {
    setGame: (state, action: PayloadAction<any>) => {
      state.game = action.payload;
    },
    setCurrentActiveQuestionId: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.currentActivateQuestionId = action.payload;
    },
  },
  selectors: {
    selectGame: (state) => state.game,
    selectCurrentActiveQuestion: (state) => {
      if (state.currentActivateQuestionId) {
        return state.game?.questions.find(
          (x) => x.id === state.currentActivateQuestionId,
        );
      }
      return null;
    },
    selectQuestionsCount: (state) => state.game?.questions?.length || 0,
  },
});

export const { setGame, setCurrentActiveQuestionId } = gameSlice.actions;
export const { selectGame, selectCurrentActiveQuestion, selectQuestionsCount } =
  gameSlice.selectors;

export default gameSlice.reducer;
