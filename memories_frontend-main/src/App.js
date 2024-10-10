import React from "react";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(({ user }) => user?.data);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
