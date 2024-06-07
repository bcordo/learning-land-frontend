import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';


const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl:BASE_URL,
    prepareHeaders: async(headers) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ body}) => ({
        url: `/api/v1/auth/login/access-token`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginApi;
export default loginApi