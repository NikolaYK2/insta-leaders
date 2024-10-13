import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { Res, UserData } from '@/features/userHub/api/user/userServiceType'

const USERS = 'v1/users'
const userService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getUsersMe: builder.query<Res<UserData>, void>({
      query: arg => ({
        url: `${USERS}/me`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetUsersMeQuery } = userService
