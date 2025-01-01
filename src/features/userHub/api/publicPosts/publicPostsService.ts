import { instaLeadersApi } from "@/appRoot/services/instaLeadersApi";
import {
  PublicPostsParams,
  ResAllPublicPosts,
} from "@/features/userHub/api/publicPosts/publicPostsServiceType";

const PUBLIC_POSTS = "api/v1/public-posts";
const publicPostsService = instaLeadersApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicPosts: builder.query<ResAllPublicPosts, PublicPostsParams>({
      query: (params) => ({
        url: `${PUBLIC_POSTS}/all`,
        params: params,
      }),
    }),
  }),
});

export const { useGetPublicPostsQuery } = publicPostsService;
