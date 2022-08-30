import * as React from "react";
import {
  Box,
  Toolbar,
  List,
  Divider,
  ListItem,
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
} from "./Layout.style";
import { useDispatch } from "react-redux";
import { fetchCategoryList,fetchProductList } from "../../js/actions";
import { listBody } from "../../utils/Helper";

export default function MiniDrawer(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

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
          <ListItem disablePadding onClick={() => navigate("/dashboard")}>
            <ListItemButton>
              <ListIcon>
                <GridViewIcon />
              </ListIcon>
              <ListText>Dashboard</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => [
              navigate("/products"),
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
            onClick={() => [
              navigate("/category"),
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
          <ListItem disablePadding onClick={() => navigate("/customers")}>
            <ListItemButton>
              <ListIcon>
                <PeopleAltIcon />
              </ListIcon>
              <ListText>Customers</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate("/orders")}>
            <ListItemButton>
              <ListIcon>
                <ViewQuiltRoundedIcon />
              </ListIcon>
              <ListText>Orders</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate("/coupons")}>
            <ListItemButton>
              <ListIcon>
                <DiscountRoundedIcon />
              </ListIcon>
              <ListText>Coupons</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate("/staff")}>
            <ListItemButton>
              <ListIcon>
                <LocalLibraryRoundedIcon />
              </ListIcon>
              <ListText>All Staff</ListText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate("/")}>
            <ListItemButton>
              <ListIcon>
                <SettingsSuggestRoundedIcon />
              </ListIcon>
              <ListText>Setting</ListText>
            </ListItemButton>
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
