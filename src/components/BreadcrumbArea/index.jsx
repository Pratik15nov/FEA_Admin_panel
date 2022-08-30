import React, { useEffect, useState } from "react";
import { Box, Grid, Breadcrumbs, Typography } from "@mui/material";
import { MyLink } from "./Breadcrumbarea.style";
import { useLocation } from "react-router-dom";

export default function BreadcrumbArea(props) {
  const location = useLocation();
  const { search } = location;
  const [linkAdd, setLinkAdd] = useState();
  const [items, setItems] = useState();
  const [buttonArea, setButtonArea] = useState(false);
  const [editText, setEditText] = useState(false);

  useEffect(() => {
    if (location.pathname?.split("/")[1]) {
      let item = location.pathname
        .split("/")[1]
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
      setItems(item);

      setButtonArea(true);
    } else {
      setItems(null);
    }
    if (location.pathname?.split("/")[2]) {
      let item =
        location.pathname
          .split("/")[2]
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) +
        " " +
        location.pathname
          .split("/")[1]
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
      setItems(item);
      setButtonArea(false);
      setLinkAdd(item?.split(" ")[1].toLowerCase());

      if (location?.search.split("?")[1] !== undefined) {
        setEditText(true);
      }
    } // eslint-disable-next-line
  }, [search]);
  return (
    <>
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
        </>
      ) : (
        <>
          <Grid xs={12}>
            <Typography variant="h1">
              {editText ? "Edit" : "Add"}
              {" " + items?.split(" ")[1]}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <MyLink to="/dashboard">Dashboard</MyLink>
              <MyLink to={`/${linkAdd}`}>
                {linkAdd?.charAt(0).toUpperCase() +
                  linkAdd?.slice(1) +
                  " " +
                  "List"}
              </MyLink>
              <Typography>
                {editText ? "Edit" : "Add"}
                {" " + items?.split(" ")[1]}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </>
      )}
    </>
  );
}
