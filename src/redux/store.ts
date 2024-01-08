import { configureStore } from '@reduxjs/toolkit';
import websocketReducer from './websocketSlice';
import userReducer from './userSlice';
import showReducer from './showSlice';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
    user: userReducer,
    show: showReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
