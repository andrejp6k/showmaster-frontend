import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
    connectedTeams: null as User[] | null,
    currentAnsweringTeamId: null as string | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setConnectedTeams: (state, action: PayloadAction<User[] | null>) => {
      state.connectedTeams = action.payload;
    },
    setCurrentAnsweringTeamId: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.currentAnsweringTeamId = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectConnectedTeams: (state) => state.connectedTeams,
    selectCurrentAnsweringTeamId: (state) => state.currentAnsweringTeamId,
    selectIsAnswering: (state) => {
      if (state.currentAnsweringTeamId && state.user) {
        return state.user.id === state.currentAnsweringTeamId;
      }
      return null;
    },
  },
});

export const { setUser, setConnectedTeams, setCurrentAnsweringTeamId } =
  userSlice.actions;
export const {
  selectUser,
  selectConnectedTeams,
  selectCurrentAnsweringTeamId,
  selectIsAnswering,
} = userSlice.selectors;

export default userSlice.reducer;
