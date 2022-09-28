simport { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#42032C", // Royal Blue
    },
    secondary: {
      main: "#E6D2AA", // Pale brown
    },
    tertiary: {
      main: "#FFF5E4", // light Creamish
    },
    quad: {
      main: "#EBC7E8", // numb yellow
    },

    fontColor: {
      main: "#ffffff", // white
      first: "#000000", // black
    },

    mainBackground: {
      main: "#000", // black
    },
    background: {
      default: "#ffffff", // white
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

export default defaultTheme;
