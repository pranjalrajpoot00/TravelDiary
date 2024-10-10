import React, { useState } from "react";
import {
  Grid,
  Grow,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useMediaQuery } from "@mui/material";
import Paginate from "../Pagination";
import { useLocation } from "react-router-dom";
import AutoFillTextField from "../AutoFillTextField";
import { useNavigate } from "react-router-dom";
import { fetchPostsBySearchQuery } from "../../redux/actions/Posts";
import { useDispatch } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const XS = useMediaQuery("(max-width:600px)"); // Adjust the breakpoint as needed
  const [currentPostId, setCurrentPostId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(fetchPostsBySearchQuery({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={4}
          direction={XS ? "column-reverse" : "row"}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts
              currentPostId={currentPostId}
              setCurrentPostId={setCurrentPostId}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              style={{
                borderRadius: 4,
                display: "flex",
                padding: "16px",
                marginBottom: "1rem",
              }}
            >
              <TextField
                name="Search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <AutoFillTextField tags={tags} setTags={setTags} />
              <Button onClick={searchPost} color="primary" variant="contained">
                Search Memory
              </Button>
            </AppBar>
            <Form
              currentPostId={currentPostId}
              setCurrentPostId={setCurrentPostId}
            />

            {!searchQuery && !tags.length && (
              <Paper
                elevation={6}
                style={{
                  marginTop: "1rem",
                  padding: "8px",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
