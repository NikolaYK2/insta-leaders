import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  Avatar,
  DeleteAvatartResponse,
  PostsData,
  Res,
  ResProfile,
  UserData,
} from '@/features/userHub/api/profile/profileServiceType'

const PROFILE = 'v1/users'
const profileService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<ResProfile, void>({
      providesTags: ['Profile'],
      query: () => ({
        url: `${PROFILE}/profile`,
      }),
    }),

    getAvatar: builder.query<Res<Avatar>, void>({
      providesTags: ['Profile'],
      query: () => ({
        method: 'GET',
        url: `${PROFILE}/me/avatar`,
      }),
    }),
    uploadAvatar: builder.mutation<Res<Avatar>, FormData>({
      invalidatesTags: ['Profile'],
      query: (formData: FormData) => ({
        body: formData,
        method: 'POST',
        url: `${PROFILE}/me/avatar`,
      }),
    }),
    deleteAvatar: builder.mutation<DeleteAvatartResponse, void>({
      query: () => ({
        method: 'DELETE',
        url: `${PROFILE}/me/avatar`,
      }),
      invalidatesTags: ['Profile'],
    }),
    getUsersPosts: builder.query<Res<PostsData>, void>({
      query: () => ({
        url: `${PROFILE}/posts`,
      }),
    }),
    updateProfile: builder.mutation<Res<UserData>, Omit<UserData, 'id' | 'email' | 'avatar'>>({
      query: data => ({
        url: `${PROFILE}/me`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useDeleteAvatarMutation,
  useGetAvatarQuery,
  useUploadAvatarMutation,
  useGetUsersPostsQuery,
  useUpdateProfileMutation,
} = profileService
