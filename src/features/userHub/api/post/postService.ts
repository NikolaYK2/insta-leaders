import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { PostData } from '@/features/userHub/api/post/postServiceType'
import { Res } from '@/features/userHub/api/profile/profileServiceType'

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
