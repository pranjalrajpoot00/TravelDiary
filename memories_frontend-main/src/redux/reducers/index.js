import { combineReducers } from "@reduxjs/toolkit";
import PostsSlice from "./Slices/PostsSlice";
import UserSlice from "./Slices/UserSlice";

const rootReducer = combineReducers({
  posts: PostsSlice,
  user: UserSlice,
  // Add other reducers here
});

export default rootReducer;
