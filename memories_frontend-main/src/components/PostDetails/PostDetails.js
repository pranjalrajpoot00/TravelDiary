import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import {
  fetchPostById,
  fetchPostsBySearchQuery,
} from "../../redux/actions/Posts";
import CommentSection from "./CommentSection";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, data, loading, error } = useSelector(({ posts }) => posts);

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        fetchPostsBySearchQuery({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post, dispatch]);

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  if (loading && !post) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <Typography variant="h6"> Error: {error}</Typography>
      </Paper>
    );
  }

  const recommendedPosts = data?.posts?.filter(({ _id }) => _id !== post?._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={"post-card"}>
        <div className={"post-section"}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">Created by: {post?.name}</Typography>
          <Typography variant="body1">
            {moment(post?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={"imageSection"}>
          <img className={"media"} src={post?.selectedFile} alt={post?.title} />
        </div>
      </div>
      {recommendedPosts?.length > 0 && (
        <div className="post-section">
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts.map(
              ({ title, likes, message, name, selectedFile, _id }) => (
                <div
                  key={_id}
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message.split(" ").splice(0, 20).join(" ")}...
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img
                    src={selectedFile}
                    width="200px"
                    height="150px"
                    alt={title}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
}

export default PostDetails;
