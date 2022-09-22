import * as React from "react";
import {
  Box,
  Toolbar,
  List,
  ListItemButton,
  Grid,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
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
  // StyledInputBase,
  AvatarStyle,
  ListIcon,
  ListText,
  ListItem,
  CardHeaders,
  Admin,
  MainContainer,
  Customsidebar,
  MainListIcon,
  MainMenuIcon,
  AdminHeading,
  ToolBarLeft,
  ToolBarLeftBox,
  MainAdminBox,
  MainAdminContent,
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
export default function Layout(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [checkRights, setCheckRights] = useState([]);
<<<<<<< HEAD
  const location = useLocation();
  const { search } = location;
=======
>>>>>>> 5ee5f08ad2bdbd8e6746bd589e84afaf3363214d
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState();
  const page = useSelector((state) => state);
  // const RouteList = useSelector((state) => stat.layout.list);
  useEffect(() => {
    getRights();
    getRoutes();
  }, []);
  let info = JSON.parse(localStorage.getItem("Data"));
  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getCheckedItem = (data) => {
    let item = location.pathname
      .split("/")[1]
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    data
      .filter((r) => r.view === true)
      .map((r, index) => {
        let menu = r.name.charAt(0).toUpperCase() + r.name.slice(1);

        if (menu === item) {
          setSelectedIndex(index);
        }
        return menu;
      });
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
          where: { roleId: comment.data.role._id },
          perPage: 1000000,
          page: 1,
        })
      );
      setCheckRights([
        ...response.list[0].rights,
        { name: "Settings", _id: " 12345678abc910", view: true },
      ]);
      if (response.success) {
        getCheckedItem([
          ...response.list[0].rights,
          { name: "Settings", _id: "12345678abc910", view: true },
        ]);
      }
    } catch (error) {
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
  };

  return (
    <MainContainer>
      <Customsidebar open={open}>
        <Toolbar>
          <MainListIcon onClick={() => setOpen(true)} open={open}>
            <MainMenuIcon />
          </MainListIcon>
          <img alt="logo" src="images/logo.png"></img>
        </Toolbar>
        <ToolBarLeft>
          <ToolBarLeftBox>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar alt="admin" src="/images/profile.webp" />
              </IconButton>
            </Tooltip>
          </ToolBarLeftBox>
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
                borderRadius: 2,
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
              Profile
            </MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          {/* <NotificationsActiveIcon sx={{ marginRight: 3 }} />*/}
        </ToolBarLeft>
      </Customsidebar>
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
          <Grid item xs={6} md={6}>
            <AdminHeading variant="caption">
              {info.data.firstName + " " + info.data.lastName}
            </AdminHeading>
            <br />
            <Admin variant="caption">{info.data.role.roleName}</Admin>
          </Grid>
          <Grid item xs={6} md={3}>
            <MainListIcon onClick={() => setOpen(false)}>
              <KeyboardDoubleArrowLeftIcon gutterBottom />
            </MainListIcon>
          </Grid>
        </CardHeaders>

        <List
          sx={{
            ...(!open && { marginTop: 8 }),
          }}
        >
          {checkRights
            .filter((r) => r.view === true)
            .map((r, index) => (
              <ListItem
                style={{ padding: "0px" }}
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
        </List>
      </Drawer>
      <MainAdminBox component="main">
        <MainAdminContent>{props.children}</MainAdminContent>
      </MainAdminBox>
    </MainContainer>
  );
}
