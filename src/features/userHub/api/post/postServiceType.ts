export type PhotosData = {
  photoId: string
  photoUrl: string
}

export type PostsParams = {
  text: string
  location: string
  photosIds: string[]
}

export type Photos = {
  id: string
  url: string
}

export type PostsData = {
  id: number
  text: string
  location: string
  userId: number
  photos: Photos[]
}
