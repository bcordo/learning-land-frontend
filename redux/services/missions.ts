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
    // getUserMissionByMissionIds: builder.query({
    //   query: ({ missionsIds }) => `api/v1/user_missions/?mission_ids=${missionsIds.join('&mission_ids=')}`,
    // }), 
    getUserMissionByMissionIds: builder.query({
      query: ({ missionsIds }) => {
        const queryString = missionsIds.map((id:any) => `mission_ids=${id}`).join('&');
        return `/api/v1/user_missions/?${queryString}`;
      },
    }),
    getUserMissionHistory: builder.query({
      query: ({user_mission_id}) =>   `/api/v1/mission/${user_mission_id}/history`,
    }), 
    getUserMissionByUserMissionId: builder.query({
      query: ({user_mission_id}) =>   `/api/v1/user_missions/${user_mission_id}`,
    }), 
  }),
});

export const { useGetAllMissionsQuery,useLazyGetAllMissionsQuery,useLazyGetMissionByIdQuery,useLazyGetMissionByWorldIdQuery,useLazyGetUserMissionByMissionIdsQuery ,useGetUserMissionHistoryQuery,useLazyGetUserMissionByUserMissionIdQuery} = missionsApi;
export default missionsApi