import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Role, User } from '../types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
  },
  reducers: {
    changeUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<{ role: Role; studioId: string; name: string }>,
    ) => {
      if (!state.user)
        throw new Error(
          'Cannot update users role and studioId, because user does not exists!',
        );

      state.user.role = action.payload.role;
      state.user.studioId = action.payload.studioId;
      state.user.name = action.payload.name;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
  },
});

export const { changeUser, updateUser } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;
