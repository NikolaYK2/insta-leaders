import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'

const USERS = 'v1/users'
const userService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getUsersMe: builder.query<void, void>({
      query: arg => ({
        url: `${USERS}/me`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetUsersMeQuery } = userService
