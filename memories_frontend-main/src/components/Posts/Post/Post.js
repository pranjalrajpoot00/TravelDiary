import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ButtonBase from "@mui/material/ButtonBase";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import moment from "moment";
import "../Post/styles.css";
import { deletePostApi, likePost } from "../../../api";
import { useDispatch } from "react-redux";
import {
  deletePost,
  updatePost,
} from "../../../redux/reducers/Slices/PostsSlice";
import { useNavigate } from "react-router-dom";

function Post({ post, currentPostId, setCurrentPostId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const deleteCurrentPost = async (postId) => {
    await deletePostApi(postId);
    dispatch(deletePost(postId));
  };

  const likeCurrentPost = async (postId) => {
    const newPost = await likePost(postId);
    dispatch(updatePost(newPost.data));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Card
      style={{
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        position: "relative",
      }}
      raised
      elevation={6}
    >
      <ButtonBase
        component="span"
        name="test"
        style={{
          display: "block",
          textAlign: "initial",
        }}
        onClick={() => openPost(post._id)}
      >
        <CardMedia
          image={post.selectedFile}
          title={post.title}
          className="post-media"
        />
        <div className="overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {user?.result?._id === post?.creator && (
          <div className="overlay2">
            <Button
              size="small"
              style={{ color: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPostId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className="details">
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5" gutterBottom className="title">
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => likeCurrentPost(post._id)}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => deleteCurrentPost(post._id)}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
