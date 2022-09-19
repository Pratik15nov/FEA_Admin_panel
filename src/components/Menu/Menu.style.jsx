import { styled, Box,InputBase,Typography,Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { alpha } from "@mui/material/styles";
import AutoDeleteTwoToneIcon from "@mui/icons-material/AutoDeleteTwoTone";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));

export const TableGrid = styled(DataGrid)(({ theme }) => ({
  overflow: "scroll", // eslint-disable-next-line
  " &.MuiDataGrid-root .MuiDataGrid-cell": {
    color: "pink",
  },
  " &.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.custom.color,
  },
  "& .MuiDataGrid-row": {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.custom.color,
    "&:hover": {
      color: "black",
    },
  },
  "& .MuiCheckbox-colorPrimary.Mui-checked": {
    color: theme.palette.custom.success,
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.custom.color,
  },
  "& .MuiTablePagination-displayedRows": {
    color: theme.palette.custom.color,
  },
  "& .MuiTablePagination-actions": {
    color: theme.palette.custom.color,
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
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

export const ColoumHead = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.color,
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

export const DeletionIcon = styled(AutoDeleteTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "xx-medium",
  color: "red",
  "&:hover": {
    color: "black",
  },
}));

export const DisableDeletionIcon = styled(AutoDeleteTwoToneIcon)(({ theme }) => ({
  // cursor: "pointer",
  cursor: "not-allowed",
  fontSize: "x-large",
  color: "grey",
  // color: "red",
  // "&:hover": {
  //   color: "black",
  // },
}));