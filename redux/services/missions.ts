import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';


const missionsApi = createApi({
  reducerPath: 'missionsApi',
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
    getAllMissions: builder.query({
      query: () =>   `/api/v1/missions`,
    }),
    getMissionById: builder.query({
      query: ({id}) =>   `/api/v1/missions/${id}`,
    }),
    getMissionByWorldId: builder.query({
      query: ({id}) =>   `/api/v1/worlds/${id}/missions`,
    }), 
    getUserMissionByMissionId: builder.query({
      query: ({id}) =>   `/api/v1/user_missions/${id}`,
    }), 
  }),
});

export const { useGetAllMissionsQuery,useLazyGetAllMissionsQuery,useLazyGetMissionByIdQuery,useLazyGetMissionByWorldIdQuery,useLazyGetUserMissionByMissionIdQuery } = missionsApi;
export default missionsApi