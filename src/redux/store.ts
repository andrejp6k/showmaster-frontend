import { configureStore } from '@reduxjs/toolkit';
import websocketReducer from './websocketSlice';
import userReducer from './userSlice';
import showReducer from './showSlice';
import gameReducer from './gameSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
    user: userReducer,
    show: showReducer,
    game: gameReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
