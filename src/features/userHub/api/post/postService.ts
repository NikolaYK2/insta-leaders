import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { Res } from '@/features/userHub/api/user/userServiceType'
import { PostData } from '@/features/userHub/api/post/postServiceType'

const POSTS = 'v1/posts'
const postService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getUsersMe: builder.query<Res<PostData>, { postId: string }>({
      query: ({ postId }) => ({
        url: `${POSTS}/posts${postId}`,
      }),
    }),
  }),
})

export const {} = postService
