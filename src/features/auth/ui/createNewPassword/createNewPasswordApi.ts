import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const createNewPasswordApi = createApi({
  reducerPath: 'createNewPasswordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://main.sociable-people.com/api' }),
  endpoints: builder => ({
    createNewPassword: builder.mutation<any, { newPassword: string; recoveryCode: string }>({
      query: body => ({
        method: 'POST',
        url: `/v1/auth/new-password`,
        body,
      }),
    }),
  }),
}) 

export const { useCreateNewPasswordMutation } = createNewPasswordApi
