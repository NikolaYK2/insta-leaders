import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  AuthGoogleRes,
  ConfirmEmailResponse,
  LoginArgs,
  LoginResponse,
  LogOutResponse,
  MeRes,
  RegistrationProps,
  RegistrationResponse,
  SendLinkArgs,
  SendLinkResponse,
} from '@/features/auth/api/authService.types'
import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import Router from 'next/router'
import { showAlert } from '@/appRoot/app.slice'

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
    signIn: builder.mutation<LoginResponse, LoginArgs>({
      query: arg => {
        return {
          url: `${AUTH}/login`,
          method: 'POST',
          body: arg,
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (!data || !data.data.accessToken) return

          LocalStorageUtil.setValue('accessToken', data.data.accessToken)
          LocalStorageUtil.setValue('userId', data.data.user.id)
          const payload = data.data.accessToken.split('.')[1]
          const id = JSON.parse(atob(payload)).userId

          await Router.push(ROUTES_APP.PROFILE + `/${id}`)
        } catch (error) {
          console.error('Error during query fulfillment:', error)
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
    me: builder.query<MeRes, void>({
      query: () => {
        return {
          url: `${AUTH}/me`,
        }
      },
    }),
    authGoogle: builder.mutation<AuthGoogleRes, { code: string }>({
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled

          LocalStorageUtil.setValue('accessToken', data.accessToken)
        } catch (error) {
          console.error('Error during query fulfillment:', error)
          dispatch(
            showAlert({
              message: `Error during query fulfillment: ${error}`,
              variant: 'alertError',
            })
          )
        }
      },

      query: code => ({
        method: 'POST',
        url: `${AUTH}/google/login`,
        body: code,
      }),
    }),
    logOut: builder.mutation<LogOutResponse, void>({
      query: () => ({
        method: 'POST',
        url: `${AUTH}/logout`,
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
  useMeQuery,
  useRegistrationMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useLogOutMutation,
  useCreateNewPasswordMutation,
  useSignInMutation,
  useAuthByGithubQuery,
  useForgotPasswordMutation,
  useAuthGoogleMutation,
} = authService
