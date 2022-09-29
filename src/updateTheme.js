import { createTheme } from "@mui/material";

const updateTheme = createTheme({
  palette: {
    primary: {
      main: "#65C18C", // pastel green
    },
    secondary: {
      main: "#151b23", // Dark Blue
    },
    tertiary: {
      main: "#FFF5E4", // light Creamish
    },
    quad: {
      main: "#F1EFDC", // numb yellow
    },

    fontColor: {
      main: "#000000", // black
      first: "#ffffff", // white
    },

    mainBackground: {
      main: "#ffffff", // white
    },
    background: {
      default: "#000", // black
    },
    custom: {
      color: "#ffffff", // white
      success: "#65c466", // green
      error: "#FF4842", // red
      tertiary: "#FFCB42",
      quad: "#FFF4CF",
      info: "#0C53B7",
      warning: "#B78103",
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

export default updateTheme;
