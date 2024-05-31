
import { configureStore } from '@reduxjs/toolkit';
import timmerSlice from '../slices/timmerSlice'
import missionSlice from '../slices/missionSlice'
import helpfulPharasesApi from '../services/helpfulPharases'
import translateApi from '../services/translate'
import missionsApi from '../services/missions'
import userSettingsApi from '../services/user_settings'


export const store = configureStore({
  reducer: {
    timmerSlice,
    missionSlice,
    [helpfulPharasesApi.reducerPath]: helpfulPharasesApi.reducer,
    [translateApi.reducerPath]: translateApi.reducer,
    [missionsApi.reducerPath]: missionsApi.reducer,
    [userSettingsApi.reducerPath]: userSettingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpfulPharasesApi.middleware,translateApi.middleware,missionsApi.middleware,userSettingsApi.middleware),
});

