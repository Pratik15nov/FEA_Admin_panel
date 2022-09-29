import { Breadcrumbs, Button, styled, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.fontColor.first,
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
}));
export const MainText = styled(Button)(({ theme }) => ({
  color: theme.palette.fontColor.first,
}));
export const MyLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.fontColor.first,
  "&:hover": {
    color: alpha(theme.palette.primary.main),
  },
}));
export const MainTextA = styled(Typography)(({ theme }) => ({
  color: theme.palette.fontColor.first,
}));
export const MainBreadcrumbs= styled(Breadcrumbs)(({ theme }) => ({
  color: theme.palette.fontColor.first,
}));