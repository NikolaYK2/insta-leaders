import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { Res } from '@/features/userHub/api/user/userServiceType'
import { PhotosData, PostsData, PostsParams } from '@/features/userHub/api/post/postServiceType'

const POSTS = 'v1/posts'
const postService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    createPostsPhotos: builder.mutation<Res<PhotosData>, File[]>({
      query: filePhotos => {
        const formData = new FormData()

        filePhotos.forEach(photo => {
          formData.append('postPhotoFile', photo)
        })

        return {
          body: formData,
          method: 'POST',
          url: `${POSTS}/photos`,
        }
      },
    }),
    createPosts: builder.mutation<Res<PostsData>, PostsParams>({
      query: posts => {
        return {
          body: posts,
          method: 'POST',
          url: `${POSTS}`,
        }
      },
    }),
  }),
})

export const { useCreatePostsPhotosMutation, useCreatePostsMutation } = postService
