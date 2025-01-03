import { instaLeadersApi } from "@/appRoot/services/instaLeadersApi";
import { ResPublicProfile } from "@/features/userHub/api/publicUsers/publicUserServiceType";

const PUBLIC_USER = "api/v1/public-user";
const publicUserService = instaLeadersApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicUsers: builder.query<{ totalCount: string }, void>({
      query: () => ({
        url: PUBLIC_USER,
      }),
    }),
    getPublicUserProfile: builder.query<
      ResPublicProfile,
      { profileId: string }
    >({
      query: ({ profileId }) => ({
        url: `${PUBLIC_USER}/profile/${profileId}`,
      }),
    }),
  }),
});

export const { useGetPublicUsersQuery, useGetPublicUserProfileQuery } =
  publicUserService;
