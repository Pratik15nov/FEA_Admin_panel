import { Box, Divider, styled, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

export const DialogContainer = styled(Dialog)(({ theme }) => ({}));
export const CustomButton = styled(Button)(({ theme }) => ({
  fontWeight:"bold",
  color:"white"
}));
export const Actions = styled(DialogActions)(({ theme }) => ({
  justifyContent: "flex-start",
  background:"#1a1a40",
}));
export const ContentBox = styled(DialogContent)(({ theme }) => ({
  background:"#b7dfff",
}));
export const TitleBox = styled(DialogTitle)(({ theme }) => ({
  background:"#1a1a40",
  color:"white"
}));
export const ContentText = styled(DialogContentText)(({ theme }) => ({}));
export const MasterConatiner = styled(Box)(({ theme }) => ({
  color:"black",
}));

export const TopTextStyle = styled(Typography)(({ theme }) => ({
  fontSize:"15px"
}));
export const CustomDivider = styled(Divider)(({ theme }) => ({
marginTop:"5px",
marginBottom:"5px"
}));
export const HeadLabel = styled(Typography)(({ theme }) => ({
   fontWeight:"500"
  }));
  
