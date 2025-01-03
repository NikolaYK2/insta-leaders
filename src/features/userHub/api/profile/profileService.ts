import { instaLeadersApi } from "@/appRoot/services/instaLeadersApi";
import {
  Avatar,
  DeleteAvatartResponse,
  ParamsProfile,
  PostsData,
  Res,
  ResProfile,
} from "@/features/userHub/api/profile/profileServiceType";

const PROFILE = "api/v1/users";
const profileService = instaLeadersApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ResProfile, void>({
      providesTags: ["Profile"],
      query: () => ({
        url: `${PROFILE}/profile`,
      }),
    }),
    updateProfile: builder.mutation<void, ParamsProfile>({
      query: (body) => ({
        url: `${PROFILE}/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    getAvatar: builder.query<Res<Avatar>, void>({
      providesTags: ["Profile"],
      query: () => ({
        method: "GET",
        url: `${PROFILE}/me/avatar`,
      }),
    }),
    uploadAvatar: builder.mutation<Res<Avatar>, FormData>({
      invalidatesTags: ["Profile"],
      query: (formData: FormData) => ({
        body: formData,
        method: "POST",
        url: `${PROFILE}/me/avatar`,
      }),
    }),
    deleteAvatar: builder.mutation<DeleteAvatartResponse, void>({
      query: () => ({
        method: "DELETE",
        url: `${PROFILE}/me/avatar`,
      }),
      invalidatesTags: ["Profile"],
    }),
    getUsersPosts: builder.query<Res<PostsData>, void>({
      query: () => ({
        url: `${PROFILE}/posts`,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useDeleteAvatarMutation,
  useGetAvatarQuery,
  useUploadAvatarMutation,
  useUpdateProfileMutation,
} = profileService;
