import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42032C", // Royal Blue
    },
    secondary: {
      main: "#E6D2AA", // Greyiesh Blue
    },
    tertiary: {
      main: "#E6D2AA", // light Sky blue
    },
    quad: {
      main: "#EBC7E8", // numb yellow
    },

    fontColor: {
      main: "#ffffff", // white
      first: "#000000", // black
    },

    mainBackground: {
      main: "#000", // white
    },
    background: {
      default: "#ffffff",
    },
    custom: {
      color: "#fff",
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
