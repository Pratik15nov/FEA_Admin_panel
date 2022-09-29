import { styled, Typography, Button } from "@mui/material";
import {DialogTitle ,DialogActions} from "@mui/material";


export const TitleBox = styled(DialogTitle)(({ theme }) => ({
  background:theme.palette.primary.main,
  color:theme.palette.fontColor.main,
  padding:"12px"
}));

export const ActionsBox = styled(DialogActions)(({ theme }) => ({
  background:theme.palette.primary.main,
  padding:"7px",
  color:theme.palette.fontColor.main,
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
  color:theme.palette.fontColor.main,
  "&:hover": {
    color:theme.palette.fontColor.first,
  },
}));


