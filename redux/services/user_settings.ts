import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';


const userSettingsApi = createApi({
  reducerPath: 'userSettingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUserSettings: builder.query({
      query: (user_id) =>   `/api/v1/user_settings/${user_id}`,
    }),
  }),
});

export const { useLazyGetUserSettingsQuery } = userSettingsApi;
export default userSettingsApi