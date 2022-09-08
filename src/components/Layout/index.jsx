import * as React from "react";
import {
  Box,
  Toolbar,
  List,
  Divider,
  ListItemButton,
  CardHeader,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
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
  SearchIconWrapper,
  Search,
  StyledInputBase,
  AvatarStyle,
  AvatarHeader,
  ListIcon,
  ListText,
  ListItem,
} from "./Layout.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutingList } from "../../js/actions";
import { listBody } from "../../utils/Helper";
import { useEffect } from "react";

export default function MiniDrawer(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState();

  const page = useSelector((state) => state.layout.page);
  const RouteList = useSelector((state) => state.layout.list);
<<<<<<< HEAD
 
=======
>>>>>>> b0b6ce7371e24b3c8e87c0edce835f964635eb4f
  useEffect(() => {
    getRoutes(); // eslint-disable-next-line
  }, []);

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
          <img src="/images/logo.png" alt="logo"></img>
        </Toolbar>
        <Toolbar sx={{ flexDirection: "row-reverse" }}>
          <Avatar alt="admin" src="/images/profile.webp" />
          <NotificationsActiveIcon sx={{ marginRight: 3 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <AvatarHeader>
          <CardHeader
            avatar={<AvatarStyle alt="admin" src="/images/profile.webp" />}
            title="Prince Akabari"
            subheader="Admin"
            sx={{ padding: 1 }}
          />
          <mainListIcon onClick={() => setOpen(false)}>
            <KeyboardDoubleArrowLeftIcon />
          </mainListIcon>
        </AvatarHeader>
        <Divider />

        <List>
          {RouteList.filter((r) => r.fieldName !== "settings").map(
            (r, index) => (
              <ListItem
                key={index}
                disablePadding
                selected={selectedIndex === index}
                onClick={(event) => [
                  navigate(r.path),
                  handleListItemClick(event, index),
                ]}
              >
                <ListItemButton>
                  <ListIcon>{giveIcons(r.fieldName)}</ListIcon>
                  <ListText>
                    {r.fieldName.charAt(0).toUpperCase() + r.fieldName.slice(1)}
                  </ListText>
                </ListItemButton>
              </ListItem>
            )
          )}
          <ListItem
            disablePadding
            selected={selectedIndex === 9999999999}
            onClick={(event) => [
              navigate("/settings"),
              handleListItemClick(event, 9999999999),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <SettingsSuggestRoundedIcon />
              </ListIcon>
              <ListText>Settings</ListText>
            </ListItemButton>
          </ListItem>
        </List>

        {/* <List>
          <ListItem
            disablePadding
            selected={selectedIndex === 0}
            onClick={(event) => [
              navigate("/dashboard"),
              handleListItemClick(event, 0),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <GridViewIcon />
              </ListIcon>
              <ListText>Dashboard</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={selectedIndex === 1}
            onClick={(event) => [
              navigate("/products"),
              handleListItemClick(event, 1),
              dispatch(
                fetchProductList(
                  listBody({ where: null, perPage: 10, page: 1 })
                )
              ),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <InventoryIcon />
              </ListIcon>
              <ListText>Products</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={selectedIndex === 2}
            onClick={(event) => [
              navigate("/category"),
              handleListItemClick(event, 2),
              dispatch(
                fetchCategoryList(
                  listBody({ where: null, perPage: 10, page: 1 })
                )
              ),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <CategoryIcon />
              </ListIcon>
              <ListText>Category</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={selectedIndex === 3}
            onClick={(event) => [
              navigate("/customers"),
              handleListItemClick(event, 3),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <PeopleAltIcon />
              </ListIcon>
              <ListText>Customers</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={selectedIndex === 4}
            onClick={(event) => [
              navigate("/orders"),
              handleListItemClick(event, 4),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <ViewQuiltRoundedIcon />
              </ListIcon>
              <ListText>Orders</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={selectedIndex === 5}
            onClick={(event) => [
              navigate("/coupons"),
              handleListItemClick(event, 5),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <DiscountRoundedIcon />
              </ListIcon>
              <ListText>Coupons</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={selectedIndex === 6}
            onClick={(event) => [
              navigate("/staff"),
              handleListItemClick(event, 6),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <LocalLibraryRoundedIcon />
              </ListIcon>
              <ListText>All Staff</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={selectedIndex === 7}
            onClick={(event) => [
              navigate("/settings"),
              handleListItemClick(event, 7),
            ]}
          >
            <ListItemButton>
              <ListIcon>
                <SettingsSuggestRoundedIcon />
              </ListIcon>
              <ListText>Setting</ListText>
            </ListItemButton>
          </ListItem>
        </List> */}
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: "64px 24px 24px 0px" }}>
        <Box sx={{ p: "20px" }}>{props.children}</Box>
      </Box>
    </Box>
  );
}
