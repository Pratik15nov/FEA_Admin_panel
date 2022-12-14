import {
  styled,
  Typography,
  Button,
  TextField,
  DialogTitle,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const DialogText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 400,
  color: "black",
}));
export const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "1em",
  },
  width: "400px",
  marginTop: "20px",
  background: "white",
}));
export const AddRoleButton = styled(Button)(({ theme }) => ({
  height: 40,
  fontFamily: theme.typography.fontFamily,
  textTransform: "capitalize",
  marginTop: "20px",
  fontSize: "18px",
  paddingLeft: "50px",
  paddingRight: "50px",
}));

export const CancelIcon = styled(CancelOutlinedIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "xx-medium",
  color: "red",
  "&:hover": {
    color: "#523b83",
  },
}));
export const TitleText = styled(DialogTitle)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  color: theme.palette.custom.color,
  background: "#523b83",
}));
