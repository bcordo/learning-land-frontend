// store.ts
import { configureStore } from '@reduxjs/toolkit';
import timmerSlice from '../slices/timmerSlice'


export const store = configureStore({
  reducer: {
    timmerSlice
    // [api.reducerPath]: api.reducer,
  }
});

