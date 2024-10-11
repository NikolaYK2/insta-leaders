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
export interface LoginArgs {
  email: string
  password: string
}
export interface LoginResponse {
  status: string
  code: number
  data: Data
}

interface Data {
  accessToken: string
  user: User
}

interface User {
  id: number
  email: string
  name: string
}

export type LogOutResponse = {
  status: string
  code: number
  data: null
}


export type SendLinkArgs = {
  email: string
  recaptchaValue: string
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

export type AuthRes<T = {}> = {
  status: string
  code: number
  data: T
}
