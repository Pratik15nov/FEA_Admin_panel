import React, { useEffect, useState } from "react";
import { Box, Grid, Breadcrumbs, Typography } from "@mui/material";
import { MainTextA, MyLink } from "./Breadcrumbarea.style";
import { useLocation } from "react-router-dom";
import { capitalizeWord } from "../../utils/Helper";

export default function BreadcrumbArea(props) {
  const location = useLocation();
  const { search } = location;
  const [linkAdd, setLinkAdd] = useState();
  const [items, setItems] = useState();
  const [buttonArea, setButtonArea] = useState(false);
  const [editText, setEditText] = useState(false);

  useEffect(() => {
    if (location.pathname.split("/")[1]) {
      setItems(capitalizeWord(location.pathname.split("/")[1]));
      setButtonArea(true);
    } else {
      setItems(null);
    }
    if (location.pathname.split("/")[2]) {
      let item =
        capitalizeWord(location.pathname.split("/")[2]) +
        " " +
        capitalizeWord(location.pathname.split("/")[1]);
      setItems(item);
      setButtonArea(false);
      setLinkAdd(item.split(" ")[1].toLowerCase());

      if (location.search.split("?")[1] !== undefined) {
        setEditText(true);
      }
    } // eslint-disable-next-line
  }, [search]);
  return (
    <>
      {buttonArea ? (
        <>
          <Grid xs={7}>
            <MainTextA variant="h1"> {items} </MainTextA>
            <Breadcrumbs aria-label="breadcrumb">
              <Box underline="hover" color="inherit">
                <MyLink to="/dashboard">Dashboard</MyLink>
              </Box>
              <MainTextA>{items} List</MainTextA>
            </Breadcrumbs>
          </Grid>
        </>
      ) : (
        <>
          <Grid xs={12}>
            <MainTextA variant="h1">
              {editText ? "Edit" : "Add"}
              {" " + items?.split(" ")[1]}
            </MainTextA>
            <Breadcrumbs aria-label="breadcrumb">
              <MyLink to="/dashboard">Dashboard</MyLink>
              <MyLink to={`/${linkAdd}`}>
                {linkAdd?.charAt(0).toUpperCase() +
                  linkAdd?.slice(1) +
                  " " +
                  "List"}
              </MyLink>
              <MainTextA>
                {editText ? "Edit" : "Add"}
                {" " + items?.split(" ")[1]}
              </MainTextA>
            </Breadcrumbs>
          </Grid>
        </>
      )}
    </>
  );
}
