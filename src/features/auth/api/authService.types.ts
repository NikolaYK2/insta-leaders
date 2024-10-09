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

export type LogOutResponse = {
  status: string
  code: number
  data: null
}
