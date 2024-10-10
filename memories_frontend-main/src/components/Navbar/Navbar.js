import {
  AppBar,
  Typography,
  Grid,
  Avatar,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import memories2 from "../../images/memories-Logo.png";
import memories1 from "../../images/memories-Text.png";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../redux/reducers/Slices/UserSlice";
import { jwtDecode as decode } from "jwt-decode";
import { setUser } from "../../redux/reducers/Slices/UserSlice";
import Alert from "@mui/material/Alert";

function Navbar() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ user }) => user);
  const [errorMessage, setErrorMessage] = useState(error);

  const logOut = useCallback(() => {
    // Your logOut logic
    dispatch(logOutUser());
  }, [dispatch]);

  const user = data;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    } else console.log("Nothing happened");
  }, [data, user, logOut]);

  useEffect(() => {
    if (error) setErrorMessage("Invalid Credentials");
    else setErrorMessage("");
  }, [error]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("profile"));
    if (data === null && temp != null) dispatch(setUser(temp));
  }, [data, dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <>
      <AppBar
        style={{
          borderRadius: 15,
          margin: "30px",
          marginLeft: 0,
          marginRight: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
        position="static"
        color="inherit"
      >
        <Grid container alignItems={"center"} spacing={1}>
          <Grid item>
            <Link to="/">
              <img
                src={memories2}
                alt="memories"
                height="50"
                className="image"
              />
            </Link>
          </Grid>
          <Grid item style={{ marginRight: "auto" }}>
            <Link to="/">
              <img
                src={memories1}
                alt="memories"
                height="50"
                className="image"
              />
            </Link>
          </Grid>
          <Grid item>
            {user ? (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"300px"}
              >
                <Avatar
                  className="purple"
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className="userName" variant="h6">
                  {user.result.name}
                </Typography>
                <Button
                  variant="contained"
                  className="logout"
                  color="secondary"
                  onClick={logOut}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            )}
          </Grid>
        </Grid>
      </AppBar>
      {errorMessage?.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Alert
            severity="error"
            onClose={() => {
              setErrorMessage("");
            }}
          >
            {errorMessage}
          </Alert>
        </div>
      )}
    </>
  );
}

export default Navbar;
