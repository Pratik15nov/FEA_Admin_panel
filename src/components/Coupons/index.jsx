import React from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCouponsList,
  couponsStatusChange,
  onDeletionCoupons,
  onCustomersSearch,
  onCouponsloadingPagination,
} from "../../js/actions";
import { listBody } from "../../utils/Helper";
import {
  Container,
  TableGrid,
  IOSSwitch,
  UpdateIcon,
  DeletionIcon,
  ColoumHead,
  RowName,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MyButton,
} from "./Coupons.style";
import BreadcrumbArea from "../BreadcrumbArea";
import DialogBox from "../Dialog";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";

const Coupons = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const couponsList = useSelector((state) => state.coupons.list);

  const totalCount = useSelector((state) => state.coupons.totalCount);
  const page = useSelector((state) => state.coupons.page);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    getCouponsData(); // eslint-disable-next-line
  }, [page]);
  // this coloum makes sures that what types of Table Head we want to apply to our table(DataGrid)
  const columns = [
    {
      field: "joiningdate",
      headerName: <ColoumHead variant="h2">Create Date</ColoumHead>,
      flex: 1,
      sortable: false,

      renderCell: (params) => (
        <RowName>
          {params.row.createdAt.substring(8, 10)}
          {"/"}
          {params.row.createdAt.substring(5, 7)}
          {"/"}
          {params.row.createdAt.substring(0, 4)}
        </RowName>
      ),
    },
    {
      field: "couponcode",
      headerName: <ColoumHead variant="h2">Coupon Name</ColoumHead>,
      flex: 1,
      sortable: false,

      renderCell: (params) => <RowName>{params.row.couponcode}</RowName>,
    },

    {
      field: "description",
      headerName: <ColoumHead variant="h2">Description</ColoumHead>,
      flex: 1,
      sortable: false,
      minvalue: 300,
      renderCell: (params) => <RowName>{params.row.description}</RowName>,
    },
    {
      field: "type",
      headerName: <ColoumHead variant="h2">type</ColoumHead>,
      flex: 1,
      sortable: false,

      renderCell: (params) => <RowName>{params.row.type}</RowName>,
    },
    {
      field: "minvalue",
      headerName: <ColoumHead variant="h2">Minvalue</ColoumHead>,
      flex: 1,
      sortable: false,
      minWidth: 150,
      renderCell: (params) => <RowName>{params.row.minvalue}</RowName>,
    },
    {
      field: "maxdiscountvalue",
      headerName: <ColoumHead variant="h2">Maxvalue</ColoumHead>,
      flex: 1,
      sortable: false,
      minWidth: 150,
      renderCell: (params) => <RowName>{params.row.maxdiscountvalue}</RowName>,
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
            checked={params.row.isActive}
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
            onClick={() => navigate(`/coupons/add?cid=${params.row._id}`)}
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
  // // this function handles the toggle of Status
  const handleToggleStatus = async (id, value) => {
    const body = {
      isActive: value,
    };
    try {
      dispatch(
        couponsStatusChange({
          id: id,
          body,
          defaultPayload: listBody({
            where: null,
            perPage: 10,
            page: page,
          }),
        })
      );
    } catch (err) {
      alert(err);
    }
  };
  // // this function handles the opening of dialog box
  const handleAlert = (data) => {
    setAlertData(data);
    setOpenAlert(true);
  };
  // this function handles the closing of dialog box
  const alertClose = () => {
    setAlertData([]);
    setOpenAlert(false);
  };
  // this function handles the onClick event emitted by the <DeletionIcon/>
  const removeProduct = async () => {
    try {
      dispatch(
        onDeletionCoupons({
          id: alertData._id,
          defaultPayload: listBody({ where: null, perPage: 10, page: page }),
        })
      );
      setOpenAlert(false);
    } catch (error) {
      alert(error);
    }
  };

  const captureSearch = async (data) => {
    if (data) {
      if (data.length >= 3) {
        const body = {
          searchText: data,
        };
        dispatch(
          onCustomersSearch({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      }
      if (data.length === 0) {
        dispatch(
          fetchCouponsList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    } else {
      if (data.length >= 10) {
        const body = {
          searchText: data,
        };
        dispatch(
          onCustomersSearch({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      }
      if (data.length === 0) {
        dispatch(
          fetchCouponsList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    }
  };
  const getCouponsData = async () => {
    try {
      if (couponsList.length === 0) {
        dispatch(
          fetchCouponsList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    } catch (err) {
      alert(err);
    } finally {
    }
  };
  const initPagination = (p) => {
    try {
      dispatch(
        onCouponsloadingPagination(
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
            onClick={() => navigate(`/coupons/add`)} // this navigates to a new component to add the new categories
          >
            Add Coupons
          </MyButton>
        </Grid>
      </Grid>
      {/* <BreadcrumbArea captureSearch={captureSearch} /> */}
      <DialogBox // to open the dialogBox as confirmation for the deletion of Product after clicking on the <DeletionIcon/>
        openAlert={openAlert}
        alertClose={alertClose}
        msg={`Are you sure you want to delete ${alertData.name}  product ?`}
        onAgree={removeProduct}
      />
      <TableGrid // its material UI DataGrid to show the Product information in a  table structure
        autoHeight={true}
        rows={couponsList}
        columns={columns}
        loading={loading}
        pageSize={10}
        rowCount={totalCount}
        rowsPerPageOptions={[10]}
        checkboxSelection={true}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        paginationMode="server"
        onPageChange={initPagination}
        // onSelectionModelChange={(itm) => console.log(itm)}
        Property="RowHeaderWidth"
      />
    </Container>
  );
};
export default Coupons;
