import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../src/assets/constant";

const signupApi = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/users/signup`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignUpUserMutation } = signupApi;
export default signupApi;
