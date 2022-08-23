import { styled, Typography, Button } from "@mui/material";

export const DialogText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 400,
  color: "black",
}));

export const MyButton = styled(Button)(({ theme }) => ({
  height: 40,
}));
