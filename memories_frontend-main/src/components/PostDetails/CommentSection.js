import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import "./styles.css";
import { addCommentToPost } from "../../redux/actions/Posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const handleClick = async () => {
    const finalComment = `${user.result.name} : ${comment}`;
    dispatch(addCommentToPost({ comment: finalComment, id: post._id }));
    setComment("");
    commentsRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div className="commentsOuterContainer">
      <div className="commentsInnerContainer">
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments?.map((comment, index) => (
          <Typography key={index} gutterBottom variant="subtitle1">
            <strong>{comment.split(": ")[0]}</strong>
            {comment.split(":")[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result && (
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment}
            variant="contained"
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
