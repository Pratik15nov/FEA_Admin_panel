import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBody, ENDPOINTURLFORIMG } from "../../utils/Helper";
import {
  ImageAvatar,
  UpdateIcon,
  DeletionIcon,
  IOSSwitch,
  TableGrid,
  CategoryName,
  ColoumHead,
  Container,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MyButton,
} from "./Rights.style";
import { Box, Grid } from "@mui/material";
import {
  fetchCategoryList,
  categoryStatusChange,
  onDeletion,
  onSearch,
  loadingCategoryPagination,
  fetchCategoryListFailure,
} from "../../js/actions";
import { useNavigate } from "react-router";
import BreadcrumbArea from "../BreadcrumbArea";
import SearchIcon from "@mui/icons-material/Search";
import DialogBox from "../Dialog/index";

export default function Rights() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const categoryList = useSelector((state) => state.category.list);
  const totalCount = useSelector((state) => state.category.totalCount);
  const page = useSelector((state) => state.category.page);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCategoryData(); // eslint-disable-next-line
  }, [page]);

  // this coloum makes sures that what types of Table Head we want to apply to our table(DataGrid)
  const columns = [
    {
      field: "categoryImg", // remember to pass same field -name as mentioned in dataBase
      headerName: <ColoumHead variant="h2">Image</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <ImageAvatar
          variant="rounded"
          alt="Category Image"
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
          {params.row.isActive ? (
            <>
              &nbsp;&nbsp;
              <DeletionIcon onClick={() => handleAlert(params.row)} />
            </>
          ) : (
            <></>
          )}
        </Box>
      ),
    },
  ];
  const handleAlert = (data) => {
    setAlertData(data);
    setOpenAlert(true);
  };
  const alertClose = () => {
    setAlertData([]);
    setOpenAlert(false);
  };
  // this function handles the toggle of Status
  const handleToggleStatus = async (id, value) => {
    const body = {
      isActive: value,
    };
    try {
      dispatch(
        categoryStatusChange({
          id: id,
          body,
          defaultPayload: listBody({ where: null, perPage: 10, page: page }),
        })
      );
    } catch (err) {
      alert(err);
    }
  };
  // this function handles the onClick event emitted by the <DeletionIcon/>
  const removeCategory = async () => {
    try {
      dispatch(
        onDeletion({
          id: alertData._id,
          defaultPayload: listBody({ where: null, perPage: 10, page: page }),
        })
      );
      setOpenAlert(false);
    } catch (error) {
      alert(error);
    }
  };
  //  this API  fetches the data  from databse according to pagination
  const getCategoryData = async () => {
    try {
      if (categoryList.length === 0) {
        dispatch(
          fetchCategoryList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    } catch (err) {
      alert(err);
    }
  };
  // this function captures the values emitted by the search field and updates the table(DataGrid);
  const captureSearch = async (data) => {
    // setSearchValue(data);
    const body = {
      searchText: data,
    };
    try {
      if (data.length >= 3) {
        dispatch(fetchCategoryListFailure());
        dispatch(
          onSearch({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      }
      if (data.length === 0) {
        dispatch(
          fetchCategoryList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    } catch (error) {
      alert(error);
    }
  };
  // this funnction handles the pagination
  const initPagination = (p) => {
    try {
      dispatch(
        loadingCategoryPagination(
          listBody({ where: null, perPage: 10, page: p + 1 })
        )
      );
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Container>
      <Grid container sx={{ paddingBottom: "20px" }}>
        <BreadcrumbArea />

        <Grid xs={3}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e) => captureSearch(e.target.value)} // its a text field user for searching the category
            />
          </Search>
        </Grid>
        <Grid xs={2}>
          <MyButton
            variant="contained"
            onClick={() => navigate(`/rights/add`)} // this navigates to a new component to add the new categories
          >
            Add Rights
          </MyButton>
        </Grid>
      </Grid>
      <DialogBox // to open the dialogBox as confirmation for the deletion of category after clicking on the <DeletionIcon/>
        openAlert={openAlert}
        alertClose={alertClose}
        msg={`Are you sure you want to delete ${alertData.categoryName}  category ?`}
        onAgree={removeCategory}
      />
      {/* <TableGrid // its material UI DataGrid to show the category information in a  table structure
        autoHeight={true}
        rows={categoryList}
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
        onPageChange={initPagination}
        // onSelectionModelChange={(itm) => console.log(itm)}
        Property="RowHeaderWidth"
      /> */}
    </Container>
  );
}
