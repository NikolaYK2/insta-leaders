import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginArgs, LoginResponse } from '@/features/auth/ui/signIn/SignInForm/login.types'

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://main.sociable-people.com/api/' }),
  endpoints: builder => ({
    /* getLogin: builder.query<any, { email: string; password: string }>({
          query: arg => {
            return {
              url: 'v1/auth/login',
              method: 'POST',
              body: { email: arg.email, password: arg.password },
            }
          },
        }),*/
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: arg => {
        return {
          url: 'v1/auth/login',
          method: 'POST',
          body: arg,
        }
      },
    }),
  }),
})

export const { useLoginMutation } = loginApi
