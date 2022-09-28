import React from "react";
import {
  Avatar,
  Box,
  styled,
  Switch,
  Typography,
  TextField,
  InputBase,
  Button,
  Select,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import AutoDeleteTwoToneIcon from "@mui/icons-material/AutoDeleteTwoTone";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));

export const TableGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.fontColor.main,
  },
  "& .MuiTablePagination-displayedRows": {
    color: theme.palette.fontColor.main,
  },
  "& .MuiTablePagination-actions": {
    color: theme.palette.fontColor.main,
  },

  overflow: "scroll", // eslint-disable-next-line
  overflow: "scroll",
  " &.MuiDataGrid-root .MuiDataGrid-cell": {
    color: "pink",
  },
  " &.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.fontColor.main
  },
  "& .MuiDataGrid-row": {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.fontColor.main,
    "&:hover": {
      color: "black",
    },
  },
  "& .MuiCheckbox-colorPrimary.Mui-checked": {
    color: theme.palette.custom.success,
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
}));

export const ImageAvatar = styled(Avatar)(({ theme }) => ({}));

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

export const UpdateIcon = styled(AppRegistrationTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "xx-medium",
  color: "#65c466",
  "&:hover": {
    color: "black",
  },
}));
export const DeletionIcon = styled(AutoDeleteTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "xx-medium",
  color: "red",
  "&:hover": {
    color: "black",
  },
}));

export const ColoumHead = styled(Typography)(({ theme }) => ({
  color: theme.palette.fontColor.main,
  fontWeight: 600,
  fontSize: "16px",
}));

export const RowName = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 400,
  color: theme.palette.fontColor.first,

  "&:hover": {
    color: "green",
  },
}));
export const InputBox = styled(Grid)(({ theme }) => ({
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;`,
  padding: 25,
  borderRadius: 10,
  marginRight: 20,
}));

export const ImgBox = styled(Box)(({ theme }) => ({
  padding: 20,
  border: "1px solid #c4c4c4",
  borderRadius: 5,
}));

export const ImgSize = styled(Box)(({ theme }) => ({
  height: 200,
  width: 200,
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

export const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "1em",
  },
  marginTop: 10,
  marginBottom: 10,
  // height: "1em",
}));
export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.custom.color,
  backgroundColor: alpha(theme.palette.primary.main, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
    color: "black",
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export const MyButton = styled(Button)(({ theme }) => ({
  height: 40,
  fontFamily: theme.typography.fontFamily,
  textTransform: "capitalize",
}));
export const BottomButton = styled(LoadingButton)(({ theme }) => ({
  marginRight: 20,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  textTransform: "capitalize",
}));
export const SelectField = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "1em",
    padding: " 5px 0px 8px 0px",
  },
  marginTop: 10,
  marginBottom: 10,
}));
export const ProductStatusInStock = styled("span")(({ theme }) => ({
  height: "30px",
  minWidth: "30px",
  lineHeight: 0,
  borderRadius: "6px",
  cursor: "default",
  alignItems: "center",
  whiteSpace: "nowrap",
  display: "inline-flex",
  justifyContent: "center",
  padding: "0px 8px",
  color: "rgb(34, 154, 22)",
  fontSize: "0.75rem",
  fontFamily: '"Public Sans", sans-serif',
  backgroundColor: "rgba(84, 214, 44, 0.16)",
  fontWeight: 700,
  textTransform: "capitalize",
}));
export const ProductStatusLowStock = styled("span")(({ theme }) => ({
  height: "30px",
  minWidth: "30px",
  lineHeight: 0,
  borderRadius: "6px",
  cursor: "default",
  alignItems: "center",
  whiteSpace: "nowrap",
  display: "inline-flex",
  justifyContent: "center",
  padding: "0px 8px",
  color: "rgb(183, 129, 3)",
  fontSize: "0.75rem",
  fontFamily: '"Public Sans", sans-serif',
  backgroundColor: "rgba(255, 193, 7, 0.16)",
  fontWeight: 700,
  textTransform: "capitalize",
}));
export const ProductStatusOutOfStock = styled("span")(({ theme }) => ({
  height: "30px",
  minWidth: "30px",
  lineHeight: 0,
  borderRadius: "6px",
  cursor: "default",
  alignItems: "center",
  whiteSpace: "nowrap",
  display: "inline-flex",
  justifyContent: "center",
  padding: "0px 8px",
  color: "rgb(183, 33, 54)",
  fontSize: "0.75rem",
  fontFamily: '"Public Sans", sans-serif',
  backgroundColor: "rgba(255, 72, 66, 0.16)",
  fontWeight: 700,
  textTransform: "capitalize",
}));

export const ContainerOne = styled(Grid)(({ theme }) => ({
  paddingBottom: "20px",
}));

export const SelectionImage = styled(Avatar)(({ theme }) => ({}));
export const SelectionText = styled(Typography)(({ theme }) => ({
  marginLeft: "13px",
  padding: "7px 0px",
}));

export const SelectionBox = styled(Grid)(({ theme }) => ({
  display: "-ms-flexbox",
}));
