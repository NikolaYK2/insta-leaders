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
export type PostsDataPhotos = {
  id: number
  url: string
}
export type PostsData = {
  id: number
  text: string
  location: string
  userId: number
  photos: PostsDataPhotos[]
}

export type Avatar = {
  avatarUrl: string
}
export type DeleteAvatartResponse = {
  status: string
  code: number
  data: null
}

// - NEW БЭКЭНД ----------------------------------------------------------------------------
export type Avatars = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type ResProfile = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  avatars: Avatars[]
  createdAt: string
}

export type ParamsProfile = Omit<ResProfile, 'avatars' | 'id' | 'createdAt'>
