import * as React from "react";
import {
  Box,
  Toolbar,
  List,
  Divider,
  ListItemButton,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import GridViewIcon from "@mui/icons-material/GridView";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router";
import {
  AppBar,
  Drawer,
  // SearchIconWrapper,
  // Search,
  // StyledInputBase,
  AvatarStyle,
  ListIcon,
  ListText,
  ListItem,
  CardHeaders,
  Admin,
} from "./Layout.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutingList, updatepState } from "../../js/actions";
import { listBody } from "../../utils/Helper";
import { useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { rightsHandlerData } from "../../service/Auth.Service";
import { useState } from "react";

export default function MiniDrawer(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [checkRights, setCheckRights] = useState([]);

  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const page = useSelector((state) => state);
  // const RouteList = useSelector((state) => state.layout.list);

  useEffect(() => {
    getRights();
    getRoutes(); // eslint-disable-next-line
  }, []);

  let info = JSON.parse(localStorage.getItem("Data"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("dataToken");
    navigate("/");
  };

  const getRights = async () => {
    try {
      let comment = JSON.parse(localStorage.getItem("Data"));
      const response = await rightsHandlerData(
        listBody({
          where: { roleId: comment?.data?.role?._id },
          perPage: 1000000,
          page: 1,
        })
      );
      setCheckRights(response.list[0].rights);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  const getRoutes = () => {
    try {
      dispatch(
        fetchRoutingList(
          listBody({
            where: { isActive: true },
            perPage: 10000,
            page: page,
            sortBy: "createdAt",
          })
        )
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const giveIcons = (name) => {
    try {
      if (name) {
        switch (name) {
          case "dashboard":
            return <GridViewIcon />;
          case "products":
            return <InventoryIcon />;
          case "category":
            return <CategoryIcon />;
          case "customers":
            return <PeopleAltIcon />;
          case "orders":
            return <ViewQuiltRoundedIcon />;
          case "coupons":
            return <DiscountRoundedIcon />;
          case "staff":
            return <LocalLibraryRoundedIcon />;
          case "settings":
            return <SettingsSuggestRoundedIcon />;
          case "menu":
            return <WidgetsIcon />;
          case "rights":
            return <AdminPanelSettingsIcon />;
          case "role":
            return <ManageAccountsIcon />;
          default:
            return <GridViewIcon />;
        }
      } else {
        <GridViewIcon />;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        open={open}
      >
        <Toolbar>
          <mainListIcon
            onClick={() => setOpen(true)}
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </mainListIcon>
          <img alt="logo" src="images/logo.png"></img>
        </Toolbar>

        <Toolbar sx={{ flexDirection: "row-reverse" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar alt="admin" src="/images/profile.webp" />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={opens}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => [navigate(`/profile`), dispatch(updatepState())]}
            >
              <Avatar /> Profile
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          {/* <NotificationsActiveIcon sx={{ marginRight: 3 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <CardHeaders
          container
          sx={{
            ...(!open && { display: "none" }),
          }}
        >
          <Grid item xs={6} md={3}>
            <AvatarStyle alt="admin" src="/images/profile.webp" />
          </Grid>
          <Grid xs={6} md={6}>
            {info?.data?.firstName?.charAt(0).toUpperCase() +
              info.data.firstName.slice(1) +
              ` ` +
              info?.data.lastName.charAt(0).toUpperCase() +
              info?.data.lastName.slice(1)}
            <br />
            <Admin variant="caption">{info?.data.role.roleName}</Admin>
          </Grid>
          <Grid xs={6} md={3}>
            <mainListIcon onClick={() => setOpen(false)}>
              <KeyboardDoubleArrowLeftIcon gutterBottom sx={{ mt: 1 }} />
            </mainListIcon>
          </Grid>
        </CardHeaders>

        <Divider />

        <List
          sx={{
            ...(!open && { marginTop: 8 }),
          }}
        >
          {checkRights
            .filter((r) => r.view === true)
            .map((r, index) => (
              <ListItem
                key={index}
                disablePadding
                selected={selectedIndex === index}
                onClick={(event) => [
                  navigate(
                    "/" + r.name.charAt(0).toLowerCase() + r.name.slice(1)
                  ),
                  handleListItemClick(event, index),
                ]}
              >
                <ListItemButton>
                  <ListIcon>
                    {giveIcons(
                      r.name.charAt(0).toLowerCase() + r.name.slice(1)
                    )}
                  </ListIcon>
                  <ListText>
                    {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                  </ListText>
                </ListItemButton>
              </ListItem>
            ))}

          <ListItem
            disablePadding
            selected={selectedIndex === 9999999999}
            onClick={(event) => [
              navigate("/settings"),
              handleListItemClick(event, 9999999999),
            ]}
          >
            {/* <ListItemButton>
              <ListIcon>
                <SettingsSuggestRoundedIcon />
              </ListIcon>
              <ListText>Settings</ListText>
            </ListItemButton> */}
          </ListItem>
        </List>

        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: "64px 24px 24px 0px" }}>
        <Box sx={{ p: "20px" }}>{props.children}</Box>
      </Box>
    </Box>
  );
}
