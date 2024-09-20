import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { RegistrationProps, RegistrationResponse } from '@/features/auth/api/authService.types'

const AUTH = 'v1/auth'
const authService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    //Пример
    // auth: builder.query<void, void>({
    //   query: () => ({
    //     url: `${AUTH}/hello`,
    //   }),
    // }),
    registration: builder.mutation<RegistrationResponse, RegistrationProps>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/registration`,
        body,
      }),
    }),
  }),
  overrideExisting: true,
})
//пример
export const { useRegistrationMutation } = authService
