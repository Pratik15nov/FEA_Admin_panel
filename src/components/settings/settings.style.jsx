import {
  styled,
  Box,
  Typography,
  Switch,
  MenuItem,
  TextField,
  Select,
  Grid,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));
export const ContainerHead = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  color: theme.palette.fontColor.first,
}));

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
export const ScrollBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  // height: "245px",
  width: "1162px",
  overflow: "hidden",
  overflowX: "scroll",
  "::-webkit-scrollbar": { width: "10px" },
  "::-webkit-scrollbar-track": {
    background: theme.palette.secondary.main,
    borderRadius: 10,
  },
  "::-webkit-scrollbar-thumb": { background: "#888", borderRadius: 10 },
  "::-webkit-scrollbar-thumb:hover": { background: "#555" },
}));
export const MainBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "rgb(0 0 0 / 15%) 0px 2px 8px",
  margin: "5px",
}));
export const CoustomMenuItem = styled(MenuItem)(({ theme }) => ({
  // border: 2px solid green;
  // border-radius: 5px;

  background: theme.palette.secondary.main,
  color: theme.palette.fontColor.first,
  "&:hover": {
    color: theme.palette.fontColor.main,
    background: theme.palette.primary.main,
  },
  "&:selected": {
    color: "black",
    background: theme.palette.primary.main,
  },
}));
export const FormText = styled(Typography)(({ theme }) => ({
  color: theme.palette.fontColor.first,
}));
export const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "1em",
  },
  marginTop: 10,
  marginBottom: 10,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  // height: "1em",
  "& .MuiInputBase-root": {
    color: theme.palette.fontColor.first,
  },
}));
export const SelectField = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "2.1em",
    padding: " 6px 0px 6px 15px",
  },
  "& .css-1poimk-MuiPaper": {
    backgroundColor: theme.palette.secondary.main,
  },
  marginTop: 10,
  marginBottom: 10,
  border: `1px solid ${theme.palette.primary.main}`,
}));
export const SelectionBox = styled(Grid)(({ theme }) => ({
  display: "-ms-flexbox",
}));
export const SelectionImage = styled(Avatar)(({ theme }) => ({}));
export const SelectionText = styled(Typography)(({ theme }) => ({
  marginLeft: "13px",
  padding: "7px 0px",
}));
export const ImgBox = styled(Box)(({ theme }) => ({
  padding: 20,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
}));
export const ImgSize = styled(Box)(({ theme }) => ({
  height: 200,
  width: 510,
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
  borderRadius: 10,
}));
export const DelIcon = styled(DeleteIcon)(({ theme }) => ({
  padding: 4,
  boxShadow: `rgb(0 0 0 / 10%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px;`,
  borderRadius: 50,
  backgroundColor: alpha(theme.palette.custom.error, 1),
  cursor: "pointer",
  fontSize: 20,
  color: theme.palette.fontColor.main,
  marginBottom: 170,
  marginLeft: 10,
}));
export const GridUi = styled(Grid)(({ theme }) => ({}));
export const BottomButton = styled(LoadingButton)(({ theme }) => ({
  marginRight: 20,
  marginTop: 20,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  textTransform: "capitalize",
}));
