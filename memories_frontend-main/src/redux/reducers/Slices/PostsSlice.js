import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentToPost,
  fetchAllPostsData,
  fetchPostById,
  fetchPostsBySearchQuery,
} from "../../actions/Posts";

const PostsSlice = createSlice({
  name: "Posts",
  initialState: {
    data: null,
    post: null,
    loading: false,
    error: null,
  },
  reducers: {
    addNewPost: (state, action) => {
      if (state.data === null) state.data = { posts: action.payload };
      else state.data.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const posts = state.data.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.data = { ...state.data, posts: posts };
    },
    deletePost: (state, action) => {
      const posts = state.data.posts.filter(
        (post) => post._id !== action.payload
      );
      state.data = { ...state.data, posts: posts };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPostsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllPostsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostsBySearchQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsBySearchQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, posts: action.payload };
      })
      .addCase(fetchPostsBySearchQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCommentToPost.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(addCommentToPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addNewPost, updatePost, deletePost } = PostsSlice.actions;
export default PostsSlice.reducer;
