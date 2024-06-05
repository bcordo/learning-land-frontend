import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const worldsApi = createApi({
  reducerPath: 'worldsApi',
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
    getAllWorlds: builder.query({
      query: () => `/api/v1/worlds/`
    }),
  }), 
});

export const { useLazyGetAllWorldsQuery } = worldsApi;
export default worldsApi;
