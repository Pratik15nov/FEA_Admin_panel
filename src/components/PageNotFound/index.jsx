import { Typography } from "@mui/material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: "center", padding: "50px" }}>
      <Typography variant="h1" gutterBottom>
        Sorry, page not found!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        <br />
        mistyped the URL? Be sure to check your spelling.
      </Typography>
      <img src="/images/404.png" width={460} alt="404"></img>
      <br />
      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
}
