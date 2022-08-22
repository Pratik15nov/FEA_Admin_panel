import { React, useState, useEffect } from "react";
import { listBody, ENDPOINTURLFORIMG } from "../../utils/Helper";
import {
  categoryHandlerData,
  categoryStatus,
} from "../../service/Auth.Service";

import {
  ImageAvatar,
  UpdateIcon,
  DeletionIcon,
  IOSSwitch,
  TableGrid,
  CategoryName,
  ColoumHead,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MyButton,
} from "./Category.style";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Breadcrumbs,
} from "@mui/material";
import { categoryDelete } from "../../service/Auth.Service";
import { useNavigate } from "react-router";

import SearchIcon from "@mui/icons-material/Search";

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [categorydata, setCategoryData] = useState([]);
  const [openalert, setOpenAlert] = useState(false);
  const [alertdata, setAlertData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
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
    console.log("id: ", id);
    console.log("value: ", value);

    const body = {
      isActive: value,
    };
    try {
      const response = await categoryStatus(id, body);
      console.log("response: ", response);

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
        return (
          <IOSSwitch
            sx={{ m: 1 }}
            checked={params.row?.isActive}
            onChange={(e) => {
              handleToggleStatus(params.row._id, e.target.checked);
            }}
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
            onClick={() => navigate(`/category/add?cid=${params.row._id}`)}
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

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: 2 }}>
        <Grid container sx={{ paddingBottom: "20px" }}>
          <Grid xs={6}>
            <Typography variant="h1"> Category </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Box underline="hover" color="inherit">
                Category
              </Box>
              <Typography>Category List</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid xs={4}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" />
            </Search>
          </Grid>
          <Grid xs={2}>
            <MyButton
              variant="contained"
              onClick={() => navigate(`/category/add`)}
            >
              + Add Category
            </MyButton>
          </Grid>
        </Grid>

        <Dialog
          open={openalert}
          onClose={alertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Deletion alert</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {alertdata.categoryName} category
              ?{alertdata._id}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MyButton onClick={alertClose}>Disagree</MyButton>
            <MyButton onClick={() => removeCategory(alertdata._id)} autoFocus>
              Agree
            </MyButton>
          </DialogActions>
        </Dialog>
        <TableGrid
          autoHeight={true}
          rows={categorydata}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowCount={totalCount}
          rowsPerPageOptions={[10]}
          checkboxSelection={true}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          pagination
          paginationMode="server"
          onPageChange={(page, detail) => {
            setPage(page);
            console.log(page);
          }}
        />
      </Box>
    </Box>
  );
}
