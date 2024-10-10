import React from "react";
import { Card, Grid } from "@mui/material";
import "./Shimmer.css";

const Shimmer = () => {
  const shimmerCards = Array.from({ length: 8 }).map((_, index) => (
    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
      <Card
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "15px",
          background:
            "linear-gradient(to right, #f0f0f0 4%, #e0e0e0 25%, #f0f0f0 36%)",
          animation: "shimmer 1.5s infinite",
          height: "450px",
        }}
      ></Card>
    </Grid>
  ));

  return (
    <Grid container spacing={3}>
      {shimmerCards}
    </Grid>
  );
};

export default Shimmer;
