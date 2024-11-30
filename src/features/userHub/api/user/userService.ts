import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  Avatar,
  DeleteAvatartResponse,
  Res,
  UserData,
  UserPostsData,
} from '@/features/userHub/api/user/userServiceType'

const USERS = 'v1/users'
const userService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getUsersMe: builder.query<Res<UserData>, void>({
      providesTags: ['User'],
      query: () => ({
        url: `${USERS}/me`,
      }),
    }),

    getAvatar: builder.query<Res<Avatar>, void>({
      providesTags: ['User'],
      query: () => ({
        method: 'GET',
        url: `${USERS}/me/avatar`,
      }),
    }),
    uploadAvatar: builder.mutation<Res<Avatar>, FormData>({
      invalidatesTags: ['User'],
      query: (formData: FormData) => ({
        body: formData,
        method: 'POST',
        url: `${USERS}/me/avatar`,
      }),
    }),
    deleteAvatar: builder.mutation<DeleteAvatartResponse, void>({
      query: () => ({
        method: 'DELETE',
        url: `${USERS}/me/avatar`,
      }),
      invalidatesTags: ['User'],
    }),
    getUsersPosts: builder.query<Res<UserPostsData>, number>({
      query: id => ({
        url: `${USERS}/${id}/posts`,
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

export const {
  useGetUsersMeQuery,
  useDeleteAvatarMutation,
  useGetAvatarQuery,
  useUploadAvatarMutation,
  useGetUsersPostsQuery,
  useUpdateProfileMutation,
} = userService
