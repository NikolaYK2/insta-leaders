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
