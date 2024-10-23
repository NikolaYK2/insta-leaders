import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { Avatar, Res, UserData, DeleteAvatartResponse } from './userServiceType'

const USERS = 'v1/users'
const userService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getUsersMe: builder.query<Res<UserData>, void>({
      query: () => ({
        url: `${USERS}/me`,
      }),
    }),

    getAvatar: builder.query<Res<Avatar>, void>({
      query: () => ({
        method: 'GET',
        url: `${USERS}/me/avatar`,
      }),
    }),
    uploadAvatar: builder.mutation<Res<Avatar>, FormData>({
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
    }),
  }),
})

export const {
  useGetUsersMeQuery,
  useDeleteAvatarMutation,
  useGetAvatarQuery,
  useUploadAvatarMutation,
} = userService
