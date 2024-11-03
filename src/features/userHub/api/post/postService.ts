import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'

const POSTS = 'v1/posts'
const postService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    // getUsersMe: builder.query<Res<PostData>, { postId: string }>({
    //   query: ({ postId }) => ({
    //     url: `${POSTS}/posts${postId}`,
    //   }),
    // }),
    addPost: builder.mutation<{ test: string }, {}>({
      query: () => ({
        body: {
          text: 'test',
          location: 'test',
          photosIds: [
            'data:image/jpeg;base64,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',
            'data:image/jpeg;base64,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',
          ],
        },
        method: 'POST',
        url: `${POSTS}`,
      }),
    }),
  }),
})

export const { useAddPostMutation } = postService
