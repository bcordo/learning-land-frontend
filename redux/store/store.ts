
import { configureStore } from '@reduxjs/toolkit';
import timmerSlice from '../slices/timmerSlice'
import userSettingsSlice from '../slices/userSetingsSlice'
import missionSlice  from '../slices/missionSlice'
import helpfulPharasesApi from '../services/helpfulPharases'
import translateApi from '../services/translate'
import missionsApi from '../services/missions'
import userSettingsApi from '../services/user_settings'
import worldsApi from '../services/worldsApi'


export const store = configureStore({
  reducer: {
    timmerSlice,
    missionSlice,
    userSettingsSlice,
    
    [helpfulPharasesApi.reducerPath]: helpfulPharasesApi.reducer,
    [translateApi.reducerPath]: translateApi.reducer,
    [missionsApi.reducerPath]: missionsApi.reducer,
    [userSettingsApi.reducerPath]: userSettingsApi.reducer,
    [worldsApi.reducerPath]: worldsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpfulPharasesApi.middleware,translateApi.middleware,missionsApi.middleware,userSettingsApi.middleware,worldsApi.middleware)
});

