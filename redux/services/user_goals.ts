
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const user_goals = createApi({
  reducerPath: 'user_goals',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async(headers) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      }
  }),
  endpoints: (builder) => ({
    getUserGoalsByUserMissionId: builder.query({
      query: () => `api/v1/user_missions/119/user_goals`,
          
      
    }),
    getGoalsByMissionId:builder.query({
      query:({mission_id})=>`/api/v1/missions/${mission_id}/goals`
    })
  }),
});

export const { useGetUserGoalsByUserMissionIdQuery ,useLazyGetGoalsByMissionIdQuery} = user_goals;
export default user_goals;
