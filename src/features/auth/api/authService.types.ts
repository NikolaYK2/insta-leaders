export type RegistrationProps = {
  userName: string
  password: string
  email: string
}
export type RegistrationResponse = {
  status: string
  code: number
  data: {
    id: number
    email: string
    userName: string
  }
}

export type ConfirmEmailResponse = {
  status: string
  code: number
  data: string
}
export type LoginArgs = {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string
}

export interface Data {
  accessToken: string
  user: Profile
}

interface Profile {
  id: number
  email: string
  name: string
}

export type LogOutResponse = {
  status: string
  code: number
  data: null
}

export interface PasswordRecoveryParams {
  email: string;
  recaptcha: string;
  baseUrl: string;
}
export type SendLinkResponse = SendLinkResponseSuccess | SendLinkResponseError

export type SendLinkResponseSuccess = {
  code: number
  status: string
  data: {
    recoveryCode: string // !!! Should be revised by Backend
  }
}

export type SendLinkResponseError = {
  status: number
  data: {
    status: string
    code: number
    message: string
  }
}

export type ProviderRes = {
  status: string
  code: number
  data: Data
}

export type AuthRes<T> = {
  status: string
  code: number
  data: T
}

export type AuthGoogleRes = {
  accessToken: string
  email: string
}
export type MeRes = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}
