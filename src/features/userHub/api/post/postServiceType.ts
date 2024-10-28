export type PostData = {
  id: number
  text: string
  location: string
  userId: number
  photos: Photos[]
}
export type Photos = {
  id: number
  url: string
}
