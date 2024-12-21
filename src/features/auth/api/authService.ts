import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  AuthGoogleRes,
  ConfirmEmailResponse,
  LoginArgs,
  LoginResponse,
  LogOutResponse,
  MeRes, PasswordRecoveryParams,
  RegistrationProps,
  RegistrationResponse,
} from '@/features/auth/api/authService.types'
import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'
import { showAlert } from '@/appRoot/app.slice'
import Router from 'next/router'
import { ROUTES_APP } from '@/appRoot/routes/routes'

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
          body: arg,
          url: `${AUTH}/login`,
          method: 'POST',
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (!data || !data.accessToken) return

          const payload = data.accessToken.split('.')[1]
          const id = JSON.parse(atob(payload)).userId
          LocalStorageUtil.setValue('userId', id)
          LocalStorageUtil.setValue('accessToken', data.accessToken)

          await Router.push(ROUTES_APP.PROFILE + `/${id}`)
          //   TODO: add error handling and error types
        } catch (error: any) {
          console.error('Error during query fulfillment:', error)
          if (error?.error?.data?.messages) {
            dispatch(
              showAlert({
                message: `${error.error.data.messages}`,
                variant: 'alertError',
              })
            )
          }
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
    forgotPassword: builder.mutation<void, PasswordRecoveryParams>({
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
