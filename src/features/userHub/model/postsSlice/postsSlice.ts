import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostItem } from "@/features/userHub/api/post/postServiceType";

export type PostsState = {
  posts: PostItem[];
};

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<PostItem[]>) => {
      state.posts.push(...action.payload);
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});
export const postsReducer = postsSlice.reducer;
export const { addPosts, clearPosts } = postsSlice.actions;
