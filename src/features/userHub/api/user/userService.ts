import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { PostsData, Res, UserData } from '@/features/userHub/api/user/userServiceType'

const USERS = 'v1/users'
const userService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getUsersMe: builder.query<Res<UserData>, void>({
      query: () => ({
        url: `${USERS}/me`,
      }),
    }),
    getUsersPosts: builder.query<Res<PostsData>, void>({
      query: () => ({
        url: `${USERS}/posts`,
      }),
    }),
  }),
})

export const { useGetUsersMeQuery, useGetUsersPostsQuery } = userService
