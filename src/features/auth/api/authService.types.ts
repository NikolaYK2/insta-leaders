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
