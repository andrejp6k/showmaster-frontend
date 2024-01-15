import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isQuitGameDialogOpen: false,
    quitGameActionType: null as 'back' | 'home' | null,
  },
  reducers: {
    setIsQuitGameDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isQuitGameDialogOpen = action.payload;
    },
    setQuitGameActionType: (state, action: PayloadAction<'back' | 'home' | null>) => {
      state.quitGameActionType = action.payload;
    },
  },
  selectors: {
    selectIsQuitGameDialogOpen: (state) => state.isQuitGameDialogOpen,
    selectQuitGameActionType: (state) => state.quitGameActionType,
  },
});

export const { setIsQuitGameDialogOpen, setQuitGameActionType } = uiSlice.actions;
export const { selectIsQuitGameDialogOpen, selectQuitGameActionType } = uiSlice.selectors;

export default uiSlice.reducer;
