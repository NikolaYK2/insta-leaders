import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  ConfirmEmailResponse,
  RegistrationProps,
  RegistrationResponse,
} from '@/features/auth/api/authService.types'

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
    confirmEmail: builder.mutation<ConfirmEmailResponse, string>({
      query: code => ({
        method: 'GET',
        url: `${AUTH}/email-confirmation`,
        params: { code },
      }),
    }),
    resendEmailConfirmation: builder.mutation<ConfirmEmailResponse, string>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/registration-email-resending`,
        body,
      }),
    }),
  }),
})
//пример
export const { useRegistrationMutation, useConfirmEmailMutation } = authService
