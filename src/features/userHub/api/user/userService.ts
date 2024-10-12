import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'

const USERS = 'v1/users'
const userService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({}),
  overrideExisting: true,
})

export const {} = userService
