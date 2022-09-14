import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A1A40",
    },
    secondary: {
      main: "#FFF9CA",
    },

    custom: {
      color: "#FFFFFF",
      tertiary: "#FFCB42",
      quad: "#FFF4CF",
      success: "#54D62C",
      info: "#0C53B7",
      warning: "#B78103",
      error: "#FF4842",
    },
  },
  typography: {
    fontFamily: ['"Public Sans"'].join(","),
    h1: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "20px",
    },
    h3: {
      fontSize: "15px",
    },
  },
});

export default theme;
