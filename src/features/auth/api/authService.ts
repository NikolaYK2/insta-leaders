import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  ConfirmEmailResponse,
  LoginArgs,
  LoginResponse,
  RegistrationProps,
  RegistrationResponse,
} from '@/features/auth/api/authService.types'
import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'

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
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled
        const email = data.data.email
        if (!email) return
        LocalStorageUtil.setEmail(data.data.email)
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
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: arg => {
        return {
          url: `${AUTH}/login`,
          method: 'POST',
          body: arg,
        }
      },
    }),
    authByGithub: builder.query<LoginResponse, { code: string }>({
      query: arg => {
        return {
          url: `${AUTH}/registration/by-github?code=${arg.code}`,
        }
      },
    }),
  }),
  overrideExisting: true,
})
//пример
export const {
  useRegistrationMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useLoginMutation,
  useAuthByGithubQuery,
} = authService
