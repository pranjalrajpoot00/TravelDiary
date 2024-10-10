import { createSlice } from "@reduxjs/toolkit";
import { setUserProfile } from "../../actions/Users";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    logOutUser: (state, action) => {
      localStorage.clear();
      state.data = null;
    },
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setUserProfile.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error);
        state.error = action.error.message;
      });
  },
});
export const { logOutUser, setUser } = UserSlice.actions;
export default UserSlice.reducer;
