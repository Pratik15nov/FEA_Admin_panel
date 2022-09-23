import * as React from "react";
import { Toolbar, ListItemButton, Grid } from "@mui/material";
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
  Drawer,
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
  MainList,
  DropDownMenu,
} from "./Layout.style";
import { useDispatch, useSelector } from "react-redux";
import { updatepState, fetchUserAdminList } from "../../js/actions";
import { capitalizeWord, listBody } from "../../utils/Helper";
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
export default function Layout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const productList = useSelector((state) => state.userAdmin.list);
  useEffect(() => {
    getRights();
  }, []);
  useEffect(() => {
    getCheckedItem(productList);
  }, [productList]);
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
    data
      .filter((r) => r.view === true)
      .map((r, index) => {
        if (r.name === capitalizeWord(location.pathname.split("/")[1])) {
          setSelectedIndex(index);
        }
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("dataToken");
    localStorage.removeItem("Data");
    navigate("/");
  };
  const getRights = async () => {
    try {
      dispatch(
        fetchUserAdminList(
          listBody({
            where: { roleId: info.data.role._id },
            perPage: 1000000,
            page: 1,
          })
        )
      );
    } catch (error) {
      alert(error);
    }
  };
  const handleListItemClick = (index) => {
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
            <Tooltip title="Settings">
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
          <DropDownMenu
            anchorEl={anchorEl}
            id="account-menu"
            open={opens}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => [navigate(`/profile`), dispatch(updatepState())]}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </DropDownMenu>
          {/* <NotificationsActiveIcon sx={{ marginRight: 3 }} />*/}
        </ToolBarLeft>
      </Customsidebar>
      <Drawer variant="permanent" open={open}>
        <CardHeaders container open={open}>
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
        <MainList
          sx={{
            ...(!open && { marginTop: 8 }),
          }}
        >
          {productList
            ?.filter((r) => r.view === true)
            .map((r, index) => (
              <ListItem
                style={{ padding: "0px" }}
                key={index}
                disablePadding
                selected={selectedIndex === index}
                onClick={() => [
                  navigate("/" + r.name.toLowerCase()),
                  handleListItemClick(index),
                ]}
              >
                <ListItemButton>
                  <ListIcon>{giveIcons(r.name.toLowerCase())}</ListIcon>
                  <ListText>{r.name}</ListText>
                </ListItemButton>
              </ListItem>
            ))}
        </MainList>
      </Drawer>
      <MainAdminBox>
        <MainAdminContent>{props.children}</MainAdminContent>
      </MainAdminBox>
    </MainContainer>
  );
}
