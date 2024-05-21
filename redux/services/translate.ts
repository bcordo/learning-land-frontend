import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../src/assets/constant';

const translateApi = createApi({
  reducerPath: 'translateApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTranslatedText: builder.query({
      query: ({ foreign_text, source_lang, target_lang }) => `/api/v1/utils/translate?foreign_text=${foreign_text}&source_lang=${source_lang}&target_lang=${target_lang}`
    }),
  }), 
});

export const { useLazyGetTranslatedTextQuery } = translateApi;
export default translateApi;
