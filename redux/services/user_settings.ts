import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';


const userSettingsApi = createApi({
  reducerPath: 'userSettingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,
    prepareHeaders: async(headers) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
   }),
  endpoints: (builder) => ({
    getUserSettings: builder.query({
      query: ({user_id}) =>   `/api/v1/user_settings/${user_id}`,
    }),
    updateUserSettings: builder.mutation({
      query: ({user_id, body}) => ({
        
        url: `/api/v1/user_settings/${user_id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useLazyGetUserSettingsQuery,useUpdateUserSettingsMutation } = userSettingsApi;
export default userSettingsApi