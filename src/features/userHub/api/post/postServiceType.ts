import { number } from 'zod'

export type ChildrenMetadata = {
  uploadId: string
}

export type ParamPosts = {
  description: string
  childrenMetadata: ChildrenMetadata[]
}

//RES POSTS ------------------------------------------
export type ResPost = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: PostItem[]
}
export type Images = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type Owner = {
  firstName: string
  lastName: string
}

export type PostItem = {
  id: number
  userName: string
  description: string
  location: string
  images: Images[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: Owner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type ResPostsImage = {
  images: Images[]
}
//PARAM POSTS ------------------------------------------
export type PostsByUsernameParams = {
  username: string
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
