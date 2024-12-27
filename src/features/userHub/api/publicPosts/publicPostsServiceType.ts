export type ImagesPublicPosts = {
  url: string;
  width?: number;
  height?: number;
  fileSize?: number;
  createdAt?: string;
  uploadId: string;
};

export type Owner = {
  firstName: string;
  lastName: string;
};

export type ItemsPublicPosts = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: ImagesPublicPosts[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: Owner;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type ResAllPublicPosts = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: ItemsPublicPosts[];
};

//params -----------------------------------------------
export type PublicPostsParams = {
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};
