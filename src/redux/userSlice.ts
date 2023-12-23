import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Role, User } from '../types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
  },
});

export const { setUser } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;
