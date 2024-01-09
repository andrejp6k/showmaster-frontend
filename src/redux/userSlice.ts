import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
    connectedTeams: null as User[] | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setConnectedTeams: (state, action: PayloadAction<User[] | null>) => {
      state.connectedTeams = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectConnectedTeams: (state) => state.connectedTeams,
  },
});

export const { setUser, setConnectedTeams } = userSlice.actions;
export const { selectUser, selectConnectedTeams } = userSlice.selectors;

export default userSlice.reducer;
