export type Res<T> = {
  status: string
  code: number
  data: T
}
// users----------
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
}

export type Avatar = {
  avatarUrl: string
}

export type DeleteAvatartResponse = {
  status: string
  code: number
  data: null
}