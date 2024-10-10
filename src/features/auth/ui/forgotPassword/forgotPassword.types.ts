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
