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
    },
    teamToAnswerId: null as string | null,
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
        question: state.game.questions.find((x) => x.id === action.payload) || null,
      };
      state.teamToAnswerId = null;
    },
    pickQuestion: (state, action: PayloadAction<string | null>) => {
      if (!state.user) return;

      state.currentQuestion = {
        ...state.currentQuestion,
        questionPickedByTeam: true,
        teamShouldAnswerQuestion: state.user.id === action.payload,
      };

      state.teamToAnswerId = action.payload;
    },
    setTeamToAnswerId: (state, action: PayloadAction<string | null>) => {
      state.teamToAnswerId = action.payload;
    },
  },
  selectors: {
    selectGame: (state) => state.game,
    selectCurrentQuestion: (state) => state.currentQuestion,
    selectTeamToAnswerId: (state) => state.teamToAnswerId,
  },
});

export const { setGame, changeCurrentQuestion, pickQuestion, setGameUser, setTeamToAnswerId } = gameSlice.actions;
export const { selectGame, selectCurrentQuestion, selectTeamToAnswerId } = gameSlice.selectors;

export default gameSlice.reducer;
