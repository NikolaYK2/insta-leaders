export type RegistrationProps = {
  name: string
  password: string
  email: string
}

export type Data = {
  accessToken: string
  user: DataUser
}

export type DataUser = {
  id: number
  email: string
  name: string
}

export type RegistrationResponse = {
  status: string
  code: number
  data: DataUser
}

export type ConfirmEmailResponse = {
  status: string
  code: number
  data: string
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
