import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';


const helpfulPharasesApi = createApi({
  reducerPath: 'helpfulPharasesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPharases: builder.query({
      query: (id) =>   `/api/v1/missions/${id}/helpful_phrases`,
    }),
  }),
});

export const { useLazyGetPharasesQuery } = helpfulPharasesApi;
export default helpfulPharasesApi