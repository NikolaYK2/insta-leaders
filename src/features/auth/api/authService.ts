import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  AuthRes,
  ConfirmEmailResponse,
  ProviderRes,
  RegistrationProps,
  RegistrationResponse,
} from '@/features/auth/api/authService.types'
import { LocalStorageUtil, LocalStorageUtils } from '@/utils/LocalStorageUtil'

const AUTH = 'v1/auth'
const authService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    registration: builder.mutation<RegistrationResponse, RegistrationProps>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/registration`,
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled
        const email = data.data.email
        if (!email) return
        LocalStorageUtil.setEmail(data.data.email)
      },
    }),
    registrationGoogle: builder.query<AuthRes<ProviderRes>, { code: string }>({
      query: params => ({
        params,
        url: `${AUTH}/registration/by-google`,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          debugger
          const userData = data.data.data.user

          if (!userData) return
          LocalStorageUtils.setValue('userData', userData)
        } catch (e) {
          debugger
          console.error('Error during registration via Google Google', e)
        }
      },
    }),
    confirmEmail: builder.mutation<ConfirmEmailResponse, string>({
      query: code => ({
        method: 'GET',
        url: `${AUTH}/email-confirmation`,
        params: { code },
      }),
    }),
    resendEmail: builder.mutation<ConfirmEmailResponse, { email: string }>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/registration-email-resending`,
        body,
      }),
    }),
  }),
  overrideExisting: true,
})
//пример
export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useRegistrationGoogleQuery,
} = authService
