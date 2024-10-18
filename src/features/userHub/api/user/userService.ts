import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { PostsData, Res, UserData } from '@/features/userHub/api/user/userServiceType'

const USERS = 'v1/users'
const userService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getUsersMe: builder.query<Res<UserData>, void>({
      query: () => ({
        url: `${USERS}/me`,
      }),
      providesTags: ['User'],
    }),
    getUsersPosts: builder.query<Res<PostsData>, void>({
      query: () => ({
        url: `${USERS}/posts`,
      }),
    }),
    updateProfile: builder.mutation<Res<UserData>, Omit<UserData, 'id' | 'email' | 'avatar'>>({
      query: data => ({
        url: `${USERS}/me`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetUsersMeQuery, useGetUsersPostsQuery, useUpdateProfileMutation } = userService
