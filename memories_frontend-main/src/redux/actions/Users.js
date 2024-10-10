import { createAsyncThunk } from "@reduxjs/toolkit";
import { signup, signin } from "../../api";

export const setUserProfile = createAsyncThunk(
  "users/Profile",
  async ({ isSignUp, formData, navigate }) => {
    console.log(isSignUp);
    console.log(formData);
    let response;
    if (isSignUp) {
      response = await signup(formData);
    } else {
      response = await signin(formData);
    }
    localStorage.setItem("profile", JSON.stringify({ ...response.data }));
    navigate("/");
    return response.data;
  }
);
