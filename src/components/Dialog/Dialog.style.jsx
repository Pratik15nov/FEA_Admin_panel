import { styled, Typography, Button } from "@mui/material";
import {DialogTitle ,DialogActions} from "@mui/material";


export const TitleBox = styled(DialogTitle)(({ theme }) => ({
  background:"#1a1a40",
  color:"white"
}));

export const ActionsBox = styled(DialogActions)(({ theme }) => ({
  background:"#1a1a40",
  color:"white",
  justifyContent:"space-between"
}));


export const DialogText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 400,
  color: "black",
}));

export const MyButton = styled(Button)(({ theme }) => ({
  cursor:"pointer",
  height: 40,
  color:"white",
  "&:hover": {
    color: "#b7dfff",
  },
}));


