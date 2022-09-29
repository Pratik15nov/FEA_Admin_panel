import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Button, styled, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const DialogBox = styled(Dialog)(({ theme }) => ({}));
export const DialogTitleBar = styled(DialogTitle)(({ theme }) => ({
  background:theme.palette.primary.main,
  color: theme.palette.fontColor.main,
  display: "flex",
}));
export const FormLabelControl = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: "0px",
  marginRight: "0px",
  "&:hover": {
    // background: theme.palette.primary.main,
    background:"#D8D8D8",
    color: theme.palette.fontColor.main,
  },
  color:theme.palette.fontColor.first,
}));
export const RadioButtonGroup = styled(RadioGroup)(({ theme }) => ({}));
export const CustomButton = styled(Button)(({ theme }) => ({
  marginLeft: "39px",
  marginBottom: "12px",
  marginTop:"5px",
}));

export const FormContainer = styled("form")(({ theme }) => ({
  background: theme.palette.background.default,
}));

export const CancelIcon = styled(CancelOutlinedIcon)(({ theme }) => ({
  marginLeft: "10%",
  cursor: "pointer",
  fontSize: "x-large",
  color: "red",
  "&:hover": {
    // color:theme.palette.fontColor.first,
    color:"#D8D8D8"
  },
}));

export const Title = styled(Typography)(({ theme }) => ({}));
