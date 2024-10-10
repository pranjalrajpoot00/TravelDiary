import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Container,
  Button,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/actions/Users";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password should be same");
      return;
    }
    console.log(formData);
    dispatch(setUserProfile({ isSignUp, formData, navigate }));
  };

  const handleChange = (e) => {
    console.log("handle Change Called");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };

  return (
    <Container maxWidth="xs" component={"main"}>
      <Paper
        elevation={3}
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Avatar style={{ backgroundColor: "blueviolet" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: 2, width: "100%" }}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half={true}
                  type={"text"}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half={true}
                  type={"text"}
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type={"email"}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            size="large"
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
