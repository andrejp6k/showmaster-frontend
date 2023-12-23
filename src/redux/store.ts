import { configureStore } from '@reduxjs/toolkit';
import websocketReducer from './websocketSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
