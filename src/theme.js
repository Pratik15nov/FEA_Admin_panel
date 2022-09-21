import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#25316D", // Royal Blue
    },
    secondary: {
      main: "#E6D2AA", // Greyiesh Blue
    },
    tertiary: {
      main: "#FFF5E4", // light Sky blue
    },
    quad: {
      main: "#F1EFDC", // numb yellow
    },

    fontColor: {
      mainUp: "#ffffff", // white
      mainDown: "#000", // black
    },

    mainBackground: {
      main: "#ffffff", // white
    },

    custom: {
      color: "#white",
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
