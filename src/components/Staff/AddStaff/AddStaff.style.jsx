import { styled, Box, Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));

export const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "1em",
  },
  marginTop: 10,
  marginBottom: 10,
  // height: "1em",
}));

export const InputBox = styled(Grid)(({ theme }) => ({
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;`,
  padding: 25,
  borderRadius: 10,
  marginRight: 20,
}));

export const BottomButton = styled(LoadingButton)(({ theme }) => ({
  marginRight: 20,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  textTransform: "capitalize",
}));
