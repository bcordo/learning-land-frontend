import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';


const missionsApi = createApi({
  reducerPath: 'missionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllMissions: builder.query({
      query: () =>   `/api/v1/missions`,
    }),
  }),
});

export const { useGetAllMissionsQuery,useLazyGetAllMissionsQuery } = missionsApi;
export default missionsApi