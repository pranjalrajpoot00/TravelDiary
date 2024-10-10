import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = ({
  half,
  name,
  type,
  handleChange,
  label,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        required
        fullWidth
        label={label}
        type={type}
        onChange={handleChange}
        name={name}
        variant="outlined"
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
