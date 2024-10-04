import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const AUTH = 'v1/auth'

export const forgotPasswordApi = createApi({
  reducerPath: 'forgotPasswordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://main.sociable-people.com/api' }),
  endpoints: builder => ({
    forgotPassword: builder.mutation<any, { email: string; recaptchaValue: string }>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/password-recovery`,
        body,
      }),
    }),
  }),
})

export const { useForgotPasswordMutation } = forgotPasswordApi
