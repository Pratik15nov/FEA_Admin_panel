import { Box, Typography } from "@mui/material";
import React from "react";
import BreadcrumbArea from "../BreadcrumbArea";
import { Container } from "./settings.style";
//
// import { Button } from "@mui/material";
// import { loginCheck, afterLoginCheck } from "../../service/Auth.Service";
//
// import Box from "@mui/material/Box";
// import {
//   DataGridPro,
//   useGridApiRef,
//   gridVisibleRowCountSelector,
//   gridVisibleColumnDefinitionsSelector,
//   gridVisibleSortedRowIdsSelector,
// } from "@mui/x-data-grid-pro";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import { useState } from "react";
// import { useEffect } from "react";
// import { LicenseInfo } from "@mui/x-data-grid-pro";

// LicenseInfo.setLicenseKey(
//   "7003f52e1358cc619e3d853e94f079a4T1JERVI6NDMxMDAsRVhQSVJZPTE2ODMyOTQ3MTcwMDAsS0VZVkVSU0lPTj0x"
// );
const Settings = () => {
  //
  // const apiRef = useGridApiRef();

  // const [coordinates, setCoordinates] = useState({
  //   rowIndex: 0,
  //   colIndex: 0,
  // });

  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 10,
  // });

  // useEffect(() => {
  //   const { rowIndex, colIndex } = coordinates;
  //   apiRef.current.scrollToIndexes(coordinates);
  //   const id = gridVisibleSortedRowIdsSelector(apiRef)[rowIndex];
  //   const column = gridVisibleColumnDefinitionsSelector(apiRef)[colIndex];
  //   apiRef.current.setCellFocus(id, column.field);
  // }, [apiRef, coordinates]);
  // eslint-disable-next-line
  // const handleClick = (position) => () => {
  //   const maxRowIndex = gridVisibleRowCountSelector(apiRef) - 1;
  //   const maxColIndex = gridVisibleColumnDefinitionsSelector(apiRef).length - 1;

  //   setCoordinates((coords) => {
  //     switch (position) {
  //       case "top":
  //         return { ...coords, rowIndex: Math.max(0, coords.rowIndex - 1) };
  //       case "bottom":
  //         return {
  //           ...coords,
  //           rowIndex: Math.min(maxRowIndex, coords.rowIndex + 1),
  //         };
  //       case "left":
  //         return { ...coords, colIndex: Math.max(0, coords.colIndex - 1) };
  //       case "right":
  //         return {
  //           ...coords,
  //           colIndex: Math.min(maxColIndex, coords.colIndex + 1),
  //         };
  //       default:
  //         return { ...coords, rowIndex: 0, colIndex: 0 };
  //     }
  //   });
  // };

  // const handleCellClick = (params) => {
  //   const rowIndex = gridVisibleSortedRowIdsSelector(apiRef).findIndex(
  //     (id) => id === params.id
  //   );

  //   const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
  //     (column) => column.field === params.field
  //   );

  //   setCoordinates({ rowIndex, colIndex });
  // };
  //
  // const handleLogin = async () => {
  //   const body = {
  //     email: "vanshpanchal09@gmail.com",
  //     password: "yvAspZZCNh",
  //   };
  //   try {
  //     const response = await loginCheck(body);
  //     if (response) {
  //       localStorage.setItem("dataToken", response?.data?.token);
  //     } else {
  //       alert("not working");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const handleCheck = async () => {
  //   const body = {
  //     Status: "RESONSE CHECK WORKS",
  //   };
  //   try {
  //     const response = await afterLoginCheck(body);
  //     if (response) {
  //     } else {
  //       alert("not working");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const handleCheck = () => {
  //   console.log("TOKEN FORM CHECK",localStorage.getItem("dataToken"));
  // };

  return (
    <>
      <Container>
        <BreadcrumbArea />
      </Container>
      <Box>
        <Typography>Theme Customizer</Typography>
        <Typography> Customize & Preview in Real Time</Typography>
      </Box>

      {/* <Button variant="outlined" size="large" onClick={handleLogin}>
        LOGIN
      </Button>

      <Button variant="outlined" size="large" onClick={handleCheck}>
        CHECK
      </Button> */}
      {/* <Box sx={{ height: 400 }}>
        <DataGridPro
          apiRef={apiRef}
          onCellClick={handleCellClick}
          hideFooter
          {...data}
        />
      </Box> */}
    </>
  );
};

export default Settings;
