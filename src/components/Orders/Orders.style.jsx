import { styled, Box, Typography, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import AutoDeleteTwoToneIcon from "@mui/icons-material/AutoDeleteTwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import { alpha } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));

export const TableGrid = styled(DataGrid)(({ theme }) => ({
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
    color: "white",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#b7dfff",
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
  "& .MuiCheckbox-colorPrimary.Mui-checked": {
    color: theme.palette.custom.success,
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "& .MuiTablePagination-displayedRows": {
    color: "white",
  },
  "& .MuiTablePagination-actions": {
    color: "white",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
}));

export const ColoumHead = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  fontSize: "16px",
}));

export const RowName = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  color: "black",

  "&:hover": {
    color: "black",
  },
}));
export const OrderId = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  color: "black",

  "&:hover": {
    color: "black",
  },
}));
export const Contact = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  color: "black",

  "&:hover": {
    color: "black",
  },
}));
export const Price = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  color: "black",

  "&:hover": {
    color: "black",
  },
}));
export const OrderStatus = styled("span")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 400,
  color: "#006400",
  backgroundColor: "#92f592",
  borderRadius: "6px",
  padding: "7px",
  "&:hover": {
    color: "black",
  },
}));
export const NoItems = styled("span")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 400,
  color: "#0e0eee",
  backgroundColor: "#ffff7a",
  borderRadius: "10px",
  padding: "7px",
  "&:hover": {
    color: "black",
  },
}));

export const UpdateIcon = styled(AppRegistrationTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "x-large",
  // fontSize: "xx-large",
  color: "#65c466",
  "&:hover": {
    color: "black",
  },
}));
export const DeletionIcon = styled(AutoDeleteTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "x-large",
  color: "red",
  "&:hover": {
    color: "black",
  },
}));

export const ViewIcon = styled(RemoveRedEyeTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "x-large",
  color: "blue",
  "&:hover": {
    color: "black",
  },
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "white",
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
