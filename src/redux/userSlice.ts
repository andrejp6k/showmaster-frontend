import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
    connectedTeams: null as User[] | null,
    currentShowId: null as string | null,
    currentGameId: null as string | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setConnectedTeams: (state, action: PayloadAction<User[] | null>) => {
      state.connectedTeams = action.payload;
    },
    setCurrentShowId: (state, action: PayloadAction<string>) => {
      state.currentShowId = action.payload;
    },
    setCurrentGameId: (state, action: PayloadAction<string>) => {
      state.currentGameId = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectConnectedTeams: (state) => state.connectedTeams,
    selectCurrentShowId: (state) => state.currentShowId,
    selectCurrentGameId: (state) => state.currentGameId,
  },
});

export const { setUser, setConnectedTeams, setCurrentShowId, setCurrentGameId } = userSlice.actions;
export const { selectUser, selectConnectedTeams, selectCurrentShowId, selectCurrentGameId } = userSlice.selectors;

export default userSlice.reducer;
