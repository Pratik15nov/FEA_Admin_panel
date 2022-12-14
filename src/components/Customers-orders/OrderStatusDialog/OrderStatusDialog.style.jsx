import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Button, styled, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const DialogBox = styled(Dialog)(({ theme }) => ({}));
export const DialogTitleBar = styled(DialogTitle)(({ theme }) => ({
  background: "#523b83",
  color: theme.palette.custom.color,
  display: "flex",
}));
export const FormLabelControl = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: "0px",
  marginRight: "0px",
  "&:hover": {
    background: " #523b8394",
    color: theme.palette.custom.color,
  },
}));
export const RadioButtonGroup = styled(RadioGroup)(({ theme }) => ({}));
export const CustomButton = styled(Button)(({ theme }) => ({
  marginLeft: "39px",
  marginBottom: "12px",
  marginTop:"5px",
}));

export const FormContainer = styled("form")(({ theme }) => ({
  background: "#523b83",
}));

export const CancelIcon = styled(CancelOutlinedIcon)(({ theme }) => ({
  marginLeft: "10%",
  cursor: "pointer",
  fontSize: "x-large",
  color: "red",
  "&:hover": {
    color: "#523b83",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({}));
