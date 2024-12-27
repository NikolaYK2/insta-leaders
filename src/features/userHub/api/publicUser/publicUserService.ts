import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'

const PUBLIC_USER = 'v1/public-user'
const profileService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getPublicUsers: builder.query<{ totalCount: string }, void>({
      query: () => ({
        url: PUBLIC_USER,
      }),
    }),
  }),
})

export const { useGetPublicUsersQuery } = profileService
