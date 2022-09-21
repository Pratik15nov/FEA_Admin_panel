import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { withStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@mui/styles";
import MuiListItem from "@material-ui/core/ListItem";
import { Grid, Typography } from "@mui/material";
import { Box } from "devextreme-react";
const openedMixin = (theme) => ({
  width: 240,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  border: "none",
  borderRight: "none",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Customsidebar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  boxShadow: ` rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`,
}));

const AvatarHeader = styled(DrawerHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
  color: `white`,
}));

const CardHeaders = styled(Grid)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  "& .MuiGrid-root": {
    padding: 12,
  },
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.custom.color,
}));
const Admin = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  backgroundColor: "#FFF9CA",
  paddingLeft: 14,
  paddingRight: 14,
  borderRadius: 5,
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const ListIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const ListText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  "& .MuiTypography-root": {
    fontWeight: 600,
  },
}));

const mainListIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  "&.MuiListItem-root.Mui-selected.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
    "& .MuiTypography-root": {
      color: "white",
    },
  },
  "&.Mui-selected:hover": {
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "&:hover": {
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    backgroundColor: theme.palette.primary.main,
    "& .MuiListItemIcon-root": {
      color: "white",
    },
    "& .MuiTypography-root": {
      color: "white",
    },
  },

  ".MuiListItem-root": { padding: 0 },
  selected: {},
}));
const mainBody = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
export {
  Customsidebar,
  DrawerHeader,
  AppBar,
  Drawer,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  AvatarStyle,
  AvatarHeader,
  ListIcon,
  ListText,
  mainListIcon,
  ListItem,
  CardHeaders,
  Admin,
  mainBody,
  // useStyles,
};
