import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { ImageAvatar } from "./Category.style";
import AutoDeleteTwoToneIcon from "@mui/icons-material/AutoDeleteTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import { categoryHandlerData } from "../../service/Auth.Service";
import { listBody } from "../../utils/Helper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  UpdateIcon,
  DeletionIcon,
  IOSSwitch,
  TableGrid,
  CategoryName,
  ColoumHead,
} from "./Category.style";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { categoryDelete } from "../../service/Auth.Service";

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [categorydata, setCategoryData] = useState([]);
  const [openalert, setOpenAlert] = useState(false);
  const [alertdata, setAlertData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getcategoryData(); // eslint-disable-next-line
  }, [page]);

  const handleAlert = (data) => {
    setAlertData(data);
    setOpenAlert(true);
  };

  const alertClose = () => {
    setAlertData([]);
    setOpenAlert(false);
  };

  const handleToggleStatus = async (id, value) => {
    const body = {
      isActive: value,
    };
    try {
      const response = await categoryStatus(id, body);
      if (response.success) {
        console.log(response);
        getcategoryData();
        console.log("SWITCH WORKS");
      } else {
        console.log("SWITCH IS NOT WORKING");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeCategory = async (id) => {
    try {
      const response = await categoryDelete(id);
      if (response.data.success) {
        console.log(response);
        setOpenAlert(false);
        setAlertData([]);
        getcategoryData();
      } else {
        console.log("DELETION NOT WORKING");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "categoryImg",
      headerName: <ColoumHead variant="h2">Image</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <ImageAvatar
          variant="rounded"
          alt="Product image"
          src={ENDPOINTURLFORIMG + params.value}
        />
      ),
    },
    {
      field: "categoryName",
      headerName: <ColoumHead variant="h2">Categories</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <CategoryName>{params.row.categoryName}</CategoryName>
      ),
    },
    {
      field: "isActive",
      headerName: <ColoumHead variant="h2">Status</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        let value = params.row?.isActive;

        return (
          <IOSSwitch
            sx={{ m: 1 }}
            //   defaultChecked={params.row.isActive ? true :  false}
            // value={params.row.isActive}
            // defaultValue={params.row?.isActive}
            onChange={(e) => {
              value = !params.row?.isActive;
              handleToggleStatus(params.row._id, e.target.checked);
            }}
            checked={value}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: <ColoumHead variant="h2">Actions</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <UpdateIcon
            onClick={() => console.log("ID FOR UPDATION", params.row._id)}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <DeletionIcon onClick={() => handleAlert(params.row)} />
        </Box>
      ),
    },
  ];

  const getcategoryData = async () => {
    setLoading(true);
    try {
      const response = await categoryHandlerData(
        listBody({ where: null, perPage: 10, page: page })
      );
      if (response.success) {
        if (totalCount === 0) {
          setTotalCount(response.count);
        }
        // const updateData = response?.list?.map((res) => ({ ...res, actions: null }));
        setCategoryData(response?.list);
      } else {
        setCategoryData([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categorydata.length) : 0; // CHANGE_HERE

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container sx={{ padding: 2 }}>
        <Grid item xs={10}>
          <Typography variant="h1">Category List</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Box underline="hover" color="inherit">
              Category
            </Box>
            <Typography color="text.primary">Category List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={2}>
          <Link to="/category/add" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <AddIcon />
              Add Category
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={categorydata.length} // CHANGE_HERE
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(categorydata, getComparator(order, orderBy)) // CHANGE_HERE
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.categoryName); // CHANGE_HERE
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.categoryName)} // CHANGE_HERE
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.categoryName} // CHANGE_HERE
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Box display={"flex"}>
                          <ImageAvatar
                            variant="rounded"
                            alt="Product image"
                            src="https://images.unsplash.com/photo-1656226238400-e10946021d9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDc3fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                          />
                          &nbsp; &nbsp;
                          {row.categoryName}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.createdAt}</TableCell>
                      <TableCell align="right">
                        {row.isActive ? "True" : "False"}
                      </TableCell>
                      <TableCell align="right">
                        {<AppRegistrationTwoToneIcon sx={{ color: "green" }} />}
                      </TableCell>
                      <TableCell align="right">
                        <AutoDeleteTwoToneIcon sx={{ color: "red" }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categorydata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

{
  /* <IOSSwitch
  sx={{ m: 1 }}
  checked={params.row?.isActive}
  //   defaultChecked={params.row.isActive}
  // value={params.row.isActive}
  // defaultValue={params.row?.isActive}
  onChange={(e) => {
    console.log(e.target.checked);
    console.log("9090",params.row?.isActive)
    handleToggleStatus(params.row._id, e.target.checked);
  }}
  /> */
}
