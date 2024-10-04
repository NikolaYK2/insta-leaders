import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {SendLinkArgs, SendLinkResponse} from "@/features/auth/ui/forgotPassword/forgotPassword.types";

const AUTH = 'v1/auth'

export const forgotPasswordApi = createApi({
  reducerPath: 'forgotPasswordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://main.sociable-people.com/api' }),
  endpoints: builder => ({
    forgotPassword: builder.mutation<SendLinkResponse, SendLinkArgs>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/password-recovery`,
        body,
      }),
    }),
  }),
})

export const { useForgotPasswordMutation } = forgotPasswordApi
