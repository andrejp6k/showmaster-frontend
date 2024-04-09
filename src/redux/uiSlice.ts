import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SnackbarMessage } from '../types';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    quitGameDialogOpen: false,
    finishGameDialogOpen: false,
    quitGameActionType: null as 'back' | 'home' | null,
    showSnackbar: null as SnackbarMessage | null,
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
    setShowSnackbar: (state, action: PayloadAction<SnackbarMessage | null>) => {
      state.showSnackbar = action.payload;
    },
  },
  selectors: {
    selectQuitGameDialogOpen: (state) => state.quitGameDialogOpen,
    selectFinishGameDialogOpen: (state) => state.finishGameDialogOpen,
    selectQuitGameActionType: (state) => state.quitGameActionType,
    selectShowSnackbar: (state) => state.showSnackbar,
  },
});

export const { setQuitGameDialogOpen, setFinishGameDialogOpen, setQuitGameActionType, setShowSnackbar } = uiSlice.actions;
export const { selectQuitGameDialogOpen, selectFinishGameDialogOpen, selectQuitGameActionType, selectShowSnackbar } = uiSlice.selectors;

export default uiSlice.reducer;
