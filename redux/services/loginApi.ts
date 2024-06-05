import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';


const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUserSettings: builder.query({
      query: (user_id) =>   `/api/v1/user_settings/${user_id}`,
    }),
    updateUserSettings: builder.mutation({
      query: ({user_id, body}) => ({
        
        url: `/auth/login`,
        method: 'POST',
        body,
        
        
      }),
    }),
  }),
});

export const { useLazyGetUserSettingsQuery,useUpdateUserSettingsMutation } = loginApi;
export default loginApi