import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#277BC0",
    },
    secondary: {
      main: "#FFB200",
    },

    custom: {
      tertiary: "#FFCB42",
      quad: "#FFF4CF",
      success: "#54D62C",
      info: "#0C53B7",
      warning: "#B78103",
      error: "#FF4842",
    },
  },
  typography: {
    // fontFamily: ["-apple-system"].join(","),
    h1: {
      fontSize: "24px",
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
