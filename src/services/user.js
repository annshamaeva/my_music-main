import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://painassasin.online/user',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: 'signup/',
        method: 'POST',
        body,
      }),
    }),
    logIn: builder.mutation({
      query: (body) => ({
        url: 'login/',
        method: 'POST',
        body,
      }),
    }),
    getToken: builder.mutation({
      query: (body) => ({
        url: 'token/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation, useGetTokenMutation } = userApi;
