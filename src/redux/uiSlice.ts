import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    quitGameDialogOpen: false,
    finishGameDialogOpen: false,
    quitGameActionType: null as 'back' | 'home' | null,
  },
  reducers: {
    setQuitGameDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.quitGameDialogOpen = action.payload;
    },
    setFinishGameDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.finishGameDialogOpen = action.payload;
    },
    setQuitGameActionType: (state, action: PayloadAction<'back' | 'home' | null>) => {
      state.quitGameActionType = action.payload;
    },
  },
  selectors: {
    selectQuitGameDialogOpen: (state) => state.quitGameDialogOpen,
    selectFinishGameDialogOpen: (state) => state.finishGameDialogOpen,
    selectQuitGameActionType: (state) => state.quitGameActionType,
  },
});

export const { setQuitGameDialogOpen, setFinishGameDialogOpen, setQuitGameActionType } = uiSlice.actions;
export const { selectQuitGameDialogOpen, selectFinishGameDialogOpen, selectQuitGameActionType } = uiSlice.selectors;

export default uiSlice.reducer;
