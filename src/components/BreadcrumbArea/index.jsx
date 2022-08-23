import React, { useEffect, useState } from "react";

import { Box, Grid, Breadcrumbs, Typography } from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MyButton,
  MyLink,
} from "./Breadcrumbarea.style";
import SearchIcon from "@mui/icons-material/Search";
import {useLocation, useNavigate } from "react-router-dom";

export default function BreadcrumbArea(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const [link, setLink] = useState();
  const [linkAdd, setLinkAdd] = useState();
  const [items, setItems] = useState();
  const [buttonArea, setButtonArea] = useState(false);

  useEffect(() => {
    if (window.location.pathname?.split("/")[1]) {
      let item = window.location.pathname
        .split("/")[1]
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
      setItems(item);
      setLink(window.location.pathname);
      setButtonArea(true);
    } else {
      setItems(null);
    }
    if (window.location.pathname?.split("/")[2]) {
      let item =
        window.location.pathname
          .split("/")[2]
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) +
        " " +
        window.location.pathname
          .split("/")[1]
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
      setItems(item);
      setButtonArea(false);
      setLinkAdd(item?.split(" ")[1].toLowerCase());
    }
  }, [search]);
  return (
    <Grid container sx={{ paddingBottom: "20px" }}>
      {buttonArea ? (
        <>
          <Grid xs={7}>
            <Typography variant="h1"> {items} </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Box underline="hover" color="inherit">
                <MyLink
                  style={{
                    color: "black",
                  }}
                  to="/dashboard"
                >
                  Dashboard
                </MyLink>
              </Box>
              <Typography>{items} List</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid xs={3}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={(e) => props.captureSearch(e.target.value)} // its a text field user for searching the category
              />
            </Search>
          </Grid>
          <Grid xs={2}>
            <MyButton
              variant="contained"
              onClick={() => navigate(`${link}/add`)} // this navigates to a new component to add the new categories
            >
              Add {items}
            </MyButton>
          </Grid>
        </>
      ) : (
        <>
          <Grid xs={12}>
            <Typography variant="h1"> {items} </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <MyLink to="/dashboard">Dashboard</MyLink>
              <MyLink to={`/${linkAdd}`}>
                {linkAdd?.charAt(0).toUpperCase() +
                  linkAdd?.slice(1) +
                  " " +
                  "List"}
              </MyLink>
              <Typography>{items}</Typography>
            </Breadcrumbs>
          </Grid>
        </>
      )}
    </Grid>
  );
}
