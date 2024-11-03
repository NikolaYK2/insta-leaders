//common-----------
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
  avatar: string
}
// posts----------------
export type PostsData = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  posts: Post[]
}
export interface Post {
  id: number
  text: string
  location: string
  userId: number
  photos: string[]
}

export type Avatar = {
  avatarUrl: string
}
export type DeleteAvatartResponse = {
  status: string
  code: number
  data: null
}
