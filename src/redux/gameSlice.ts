import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Question, User } from '../types';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    user: null as User | null,
    game: null as Game | null,
    currentQuestion: {
      question: null as Question | null,
      questionPickedByTeam: false,
      teamShouldAnswerQuestion: false,
    }
  },
  reducers: {
    setGameUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setGame: (state, action: PayloadAction<Game>) => {
      state.game = action.payload;
    },
    changeCurrentQuestion: (state, action: PayloadAction<string | null>) => {
      if (!state.game) return;

      state.currentQuestion = {
        questionPickedByTeam: false,
        teamShouldAnswerQuestion: false,
        question: state.game.questions.find((x) => x.id === action.payload) || null
      }
    },
    pickQuestion: (state, action: PayloadAction<string | null>) => {
      if (!state.user) return;

      state.currentQuestion = {
        ...state.currentQuestion,
        questionPickedByTeam: true,
        teamShouldAnswerQuestion: state.user.id === action.payload
      }
    },
  },
  selectors: {
    selectGame: (state) => state.game,
    selectQuestionsCount: (state) => state.game?.questions?.length || 0,
    selectCurrentQuestion: (state) => state.currentQuestion
  },
});

export const { setGame, changeCurrentQuestion, pickQuestion, setGameUser } = gameSlice.actions;
export const { selectGame, selectQuestionsCount, selectCurrentQuestion } = gameSlice.selectors;

export default gameSlice.reducer;
