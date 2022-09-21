import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A0944",
      // main: "#523b83",
<<<<<<< HEAD
      main: "#25316D",
    },
    secondary: {
      // main: "#b9f2ff",
      main: "#5F6F94",
=======
    },
    secondary: {
      main: "#C996CC",
      // main: "#ffebe9",
>>>>>>> faa47daf0c641463389f071d05b66bd9b3a2603e
    },
    tertiary: {
      main: "#F6F2D4",
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
