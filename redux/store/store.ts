
import { configureStore } from '@reduxjs/toolkit';
import timmerSlice from '../slices/timmerSlice'
import helpfulPharasesApi from '../services/helpfulPharases'
import translateApi from '../services/translate'
import missionsApi from '../services/missions'


export const store = configureStore({
  reducer: {
    timmerSlice,
    [helpfulPharasesApi.reducerPath]: helpfulPharasesApi.reducer,
    [translateApi.reducerPath]: translateApi.reducer,
    [missionsApi.reducerPath]: missionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpfulPharasesApi.middleware,translateApi.middleware,missionsApi.middleware),
});

