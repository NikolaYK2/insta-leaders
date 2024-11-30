import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {
  ParamPosts,
  PostItem,
  ResPost,
  ResPostsImage,
} from '@/features/userHub/api/post/postServiceType'

const POSTS = 'v1/posts'
const postService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    createPostsDescription: builder.mutation<PostItem, ParamPosts>({
      invalidatesTags: ['Post'],
      query: body => ({
        url: POSTS,
        method: 'POST',
        body,
      }),
    }),
    createPostsImages: builder.mutation<ResPostsImage, File[]>({
      invalidatesTags: ['Post'],
      query: images => {
        const formData = new FormData()
        images.forEach(image => formData.append('file', image))
        return {
          url: `${POSTS}/image`,
          method: 'POST',
          body: formData,
        }
      },
    }),
    getsPostsByUsername: builder.query<ResPost, string>({
      query: (userName: string) => ({
        url: `${POSTS}/${userName}`,
      }),
    }),
  }),
})

export const {
  useCreatePostsDescriptionMutation,
  useCreatePostsImagesMutation,
  useGetsPostsByUsernameQuery,
} = postService
