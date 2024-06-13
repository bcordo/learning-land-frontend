import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ username, password }) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        
        return {
          url: `api/v1/users/login`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = loginApi;
export default loginApi;
