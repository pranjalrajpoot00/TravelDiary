import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { Grid } from "@mui/material";
import Shimmer from "../Shimmer/Shimmer";

function Posts({ currentPostId, setCurrentPostId }) {
  const { data, loading, error } = useSelector(({ posts }) => posts);

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const posts = data?.posts;

  return (
    <Grid container spacing={3} alignItems={"stretch"}>
      {posts?.map((post) => {
        return (
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
            <Post
              post={post}
              currentPostId={currentPostId}
              setCurrentPostId={setCurrentPostId}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Posts;
