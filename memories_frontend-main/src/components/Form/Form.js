import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../Form/styles.css";
import Typography from "@mui/material/Typography";
import FileBase from "react-file-base64";
import Box from "@mui/material/Box";
import { sendPostData, updatePostData } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, updatePost } from "../../redux/reducers/Slices/PostsSlice";
import { useNavigate } from "react-router-dom";

function Form({ currentPostId, setCurrentPostId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const data = useSelector(({ posts }) => posts?.data?.posts);
  const userData = useSelector(({ user }) => user.data);
  const user = userData;

  useEffect(() => {
    if (data && currentPostId != null && currentPostId !== postData._id) {
      const temp = data.find((post) => post._id === currentPostId);
      setPostData(temp);
      console.log(temp);
    }
  }, [currentPostId, setPostData, data, postData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPostId) {
      const updatedPost = await updatePostData(currentPostId, {
        ...postData,
        name: user?.result?.name,
      });
      console.log(updatedPost);
      dispatch(updatePost(updatedPost));
      navigate(`/posts/${currentPostId}`);
    } else {
      const newPost = await sendPostData({
        ...postData,
        name: user?.result?.name,
      });
      console.log(newPost);
      dispatch(addNewPost(newPost.data));
      navigate(`/posts/${newPost.data._id}`);
    }
    clearForm();
  };

  const clearForm = () => {
    setCurrentPostId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className="paper" elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="paper" elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Box display="flex" justifyContent={"center"} width={"100%"} mb={2}>
          <Typography variant="h6">
            {currentPostId ? "Editing" : "Creating"} a Memory
          </Typography>
        </Box>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          style={{ margin: "10px", marginTop: 0 }}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          minRows={3}
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          style={{ margin: "10px", marginTop: 0 }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags(commas separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          style={{ margin: "10px", marginTop: 0 }}
        />
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          type="submit"
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          style={{ margin: "10px", marginTop: "16px" }}
        >
          Submit
        </Button>
        <Button
          color="success"
          fullWidth
          size="small"
          variant="contained"
          style={{ margin: "10px", marginTop: 0 }}
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
