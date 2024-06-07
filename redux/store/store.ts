
import { configureStore } from '@reduxjs/toolkit';
import timmerSlice from '../slices/timmerSlice'
import userSettingsSlice from '../slices/userSetingsSlice'
import missionSlice  from '../slices/missionSlice'
import missionHistorySlice  from '../slices/missionHistory'
import helpfulPharasesApi from '../services/helpfulPharases'
import translateApi from '../services/translate'
import missionsApi from '../services/missions'
import userSettingsApi from '../services/user_settings'
import worldsApi from '../services/worldsApi'
import loginApi from '../services/loginApi'
import signupApi from '../services/signupApi'


export const store = configureStore({
  reducer: {
    timmerSlice,
    missionSlice,
    userSettingsSlice,
    missionHistorySlice,
    
    [helpfulPharasesApi.reducerPath]: helpfulPharasesApi.reducer,
    [translateApi.reducerPath]: translateApi.reducer,
    [missionsApi.reducerPath]: missionsApi.reducer,
    [userSettingsApi.reducerPath]: userSettingsApi.reducer,
    [worldsApi.reducerPath]: worldsApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpfulPharasesApi.middleware,translateApi.middleware,missionsApi.middleware,userSettingsApi.middleware,worldsApi.middleware,loginApi.middleware,signupApi.middleware)
});

