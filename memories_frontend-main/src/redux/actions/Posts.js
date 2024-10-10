import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchPostsData, {
  commentPost,
  fetchPost,
  fetchPostByQuery,
} from "../../api";

export const fetchAllPostsData = createAsyncThunk(
  "posts/fetchPostsData",
  async (page) => {
    const response = await fetchPostsData(page);
    console.log(response);
    return response.data;
  }
);

export const fetchPostsBySearchQuery = createAsyncThunk(
  "posts/querySearch",
  async (searchQuery) => {
    const response = await fetchPostByQuery(searchQuery);
    return response.data;
  }
);

export const fetchPostById = createAsyncThunk("post/idSearch", async (id) => {
  const response = await fetchPost(id);
  return response.data;
});

export const addCommentToPost = createAsyncThunk(
  "post/addComment",
  async ({ comment, id }) => {
    const response = await commentPost(comment, id);
    return response.data;
  }
);
