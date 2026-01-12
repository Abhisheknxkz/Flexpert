import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice.js';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
