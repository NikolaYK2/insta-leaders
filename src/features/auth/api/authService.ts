import {instaLeadersApi} from '@/appRoot/services/instaLeadersApi'
import {
  AuthGoogleRes,
  LoginArgs,
  LoginResponse,
  LogOutResponse,
  MeRes,
  PasswordRecoveryParams,
  RegistrationParams,
  ResendEmailParams,
  ResMessagesAuth,
} from '@/features/auth/api/authService.types'
import {LocalStorageUtil} from '@/common/utils/LocalStorageUtil'
import {showAlert} from '@/appRoot/app.slice'
import Router from 'next/router'
import {ROUTES_APP} from '@/appRoot/routes/routes'

const AUTH = 'v1/auth'
const authService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    registration: builder.mutation<ResMessagesAuth, RegistrationParams>({
      query: body => {
        LocalStorageUtil.setValue('email', body.email)

        return {
          method: 'POST',
          url: `${AUTH}/registration`,
          body,

        }
      },
    }),
    confirmEmail: builder.mutation<ResMessagesAuth, { confirmationCode: string }>({
      query: ({confirmationCode}) => ({
        method: 'POST',
        url: `${AUTH}/registration-confirmation`,
        body: {confirmationCode},
      }),
    }),
    resendEmail: builder.mutation<ResMessagesAuth, ResendEmailParams>({
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
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled

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
      async onQueryStarted(_, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled

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
