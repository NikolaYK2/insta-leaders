export type RegistrationProps = {
  name: string
  password: string
  email: string
}
export type RegistrationResponse = {
  status: string
  code: number
  data: {
    id: number
    email: string
    name: string
  }
}

export type ConfirmEmailResponse = {
  status: string
  code: number
  data: string
}
