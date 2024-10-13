export type Res<T> = {
  status: string
  code: number
  data: T
}
export type UserData = {
  id: number
  email: string
  userName: string
  firstName: string
  lastName: string
  dateOfBirth: string
  countryCode: string
  cityId: number
  aboutMe: string
  avatar: string
}
