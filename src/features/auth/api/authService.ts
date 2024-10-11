import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  ConfirmEmailResponse,
  LogOutResponse,
  LoginArgs,
  LoginResponse,
  RegistrationProps,
  RegistrationResponse,
  SendLinkResponse,
  SendLinkArgs,
} from '@/features/auth/api/authService.types'
import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'

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
        LocalStorageUtil.setValue<string>('email', data.data.email)
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
    authByGoogle: builder.query<LoginResponse, { provider: 'google'; code: string }>({
      query: params => {
        return {
          url: `${AUTH}/registration/by-provider`,
          params,
        }
      },
    }),
    logOut: builder.mutation<LogOutResponse, void>({
      query: () => ({
        method: 'POST',
        url: `${AUTH}/logout`,
        // credentials: 'include',
      }),
    }),
    createNewPassword: builder.mutation<any, { newPassword: string; recoveryCode: string }>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/new-password`,
        body,
      }),
    }),
    forgotPassword: builder.mutation<SendLinkResponse, SendLinkArgs>({
      query: body => ({
        method: 'POST',
        url: `${AUTH}/password-recovery`,
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
  useLogOutMutation,
  useCreateNewPasswordMutation,
  useLoginMutation,
  useAuthByGithubQuery,
  useForgotPasswordMutation,
  useAuthByGoogleQuery,
} = authService
