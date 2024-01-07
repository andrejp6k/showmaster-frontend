import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../types';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: null as Game | null,
    currentActivateQuestionId: null as string | null,
    isAnswering: false,
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
    setIsAnswering: (state, action: PayloadAction<boolean>) => {
      state.isAnswering = action.payload;
    },
  },
  selectors: {
    selectGame: (state) => state.game,
    selectIsAnswering: (state) => state.isAnswering,
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

export const { setGame, setCurrentActiveQuestionId, setIsAnswering } =
  gameSlice.actions;
export const {
  selectGame,
  selectIsAnswering,
  selectCurrentActiveQuestion,
  selectQuestionsCount,
} = gameSlice.selectors;

export default gameSlice.reducer;
