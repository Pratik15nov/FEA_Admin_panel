import React from 'react';
import { Box, Grid } from "@mui/material";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  TableGrid,
  ColoumHead,
  RowName,
  UpdateIcon,
  DeletionIcon,
  ViewIcon,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  OrderId,
  Contact,
  Price,
  NoItems,
  RupeeIcon,
  // HtmlTooltip,
  OrderStatusPlaced,
  OrderStatusReceived,
  OrderStatusDispatched,
  OrderStatusCancel,
} from "./Orders.style";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBody } from "../../utils/Helper";
import {
  fetchOrderCustomersList,
  sendOrderUpdationCustomers,
  loadPaginationOrderCustomers,
  onOrderSearch,
} from "../../js/actions";
import { OrderStatusDialog } from "./OrderStatusDialog";
import { useState } from "react";
import OrderView from "./OrderView";
import { useLocation } from "react-router-dom";


const Orders = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogdata] = useState([]);
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const handleClickOpen = (data) => {
    setOpen(true);
    setDialogdata(data);
  };
  const handleCancelIcon = () => {
    setOpen(false);
  };
  const handleSubmit = (value) => {
    const body = {
      orderStatus: value.orderStatus,
    };
    dispatch(
      sendOrderUpdationCustomers({
        id: value.id,
        body,
        defaultPayload: listBody({
          where: { "userId": cid },
          perPage: 10,
          page: page,
        }),
      })
    );

    setOpen(false);
  };
  const [view, setView] = useState(false);
  const [viewdata, setViewData] = useState([]);
  const handleView = (data) => {
    setViewData(data);
    setView(true);
  };
  const handleCloseView = (data) => {
    setViewData([]);
    setView(false);
  };

  const orderList = useSelector((state) => state.ordercustomers.list);
  // console.log("orderList: ", orderList);
  const page = useSelector((state) => state.ordercustomers.page);
  const totalCount = useSelector((state) => state.ordercustomers.totalCount);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    let cId;
    try {
      if (search.split("=").length > 0) {
        cId = search.split("=")[1];
      } else {
        cId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (search.split("=").length > 0) {
        cId = search.split("=")[1];
      } else {
        cId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (cId) {
        setcid(cId);
        getOrderData(cId);
      }
    } catch (error) {
      alert(error);
    }

    getOrderData(); // eslint-disable-next-line
  }, [search]);

  const getOrderData = (cId) => {
    try {
      dispatch(
        fetchOrderCustomersList(listBody({ where: { "userId": cId }, perPage: 10, page: page }))
      );
    } catch (error) {
      alert(error);
    }
  };
  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const columns = [
    {
      field: "PaymentId",
      headerName: <ColoumHead variant="h2">PaymentId</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <OrderId>
          {params.row.paymentId
            ? params.row.paymentId.slice(0, 10)
            : "unspecified"}
        </OrderId>
      ),
    },
    {
      field: "name",
      headerName: <ColoumHead variant="h2">Client</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <>
          <RowName>
            {params.row.userId.firstName
              ? params.row.userId.firstName
              : "NO/F"}
          </RowName>
          &nbsp;&nbsp;
          <RowName>
            {params.row.userId.lastName ? params.row.userId.lastName : "NO/L"}
          </RowName>
        </>
      ),
    },
    {
      field: "contact",
      headerName: <ColoumHead variant="h2">Contact</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Contact>
          {params.row.userId.phoneNumber
            ? "+91 " + params.row.userId.phoneNumber
            : "N/A"}
        </Contact>
      ),
    },
    {
      field: "price",
      headerName: <ColoumHead variant="h2">Price</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <>
          <RupeeIcon />
          &nbsp;
          <Price>
            {params.row.totalPrice
              ? `${currencyFormat(params.row.totalPrice)}`
              : `N/A`}
          </Price>
        </>
      ),
    },
    {
      field: "orderStatus",
      headerName: <ColoumHead variant="h2">OrderStatus</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        try {
          if (params.row.orderStatus) {
            switch (params.row.orderStatus) {
              case "PLACED":
                return (
                  <OrderStatusPlaced
                    onClick={() => handleClickOpen(params.row)}
                  >
                    PLACED
                  </OrderStatusPlaced>
                );

              case "RECEIVED":
                return (
                  <OrderStatusReceived
                    onClick={() => handleClickOpen(params.row)}
                  >
                    RECEIVED
                  </OrderStatusReceived>
                );
              case "DISPATCHED":
                return (
                  <OrderStatusDispatched
                    onClick={() => handleClickOpen(params.row)}
                  >
                    DISPATCHED
                  </OrderStatusDispatched>
                );
              case "CANCEL":
                return (
                  <OrderStatusCancel
                    onClick={() => handleClickOpen(params.row)}
                  >
                    CANCEL
                  </OrderStatusCancel>
                );

              default:
                return <OrderStatusPlaced>N/A</OrderStatusPlaced>;
            }
          } else {
            alert("ORDERSTATUS_ERROR OCCURED");
          }
        } catch (error) {
          alert(error);
        }
      },
    },
    // <>
    //   {/* <HtmlTooltip placement="top" title={`click to chnage status`}>
    //     <OrderStatusPlaced onClick={() => handleClickOpen(params.row)}>
    //       {params.row?.orderStatus
    //         ? params.row?.orderStatus
    //         : "unspecified"}
    //     </OrderStatusPlaced>
    //   </HtmlTooltip> */}
    // </>
    {
      field: "cartItems",
      headerName: <ColoumHead variant="h2">No/Items</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <NoItems>
          {params.row.cartdetail
            ? params.row.cartdetail.length
            : "unspecified"}
        </NoItems>
      ),
    },
    {
      field: "actions",
      headerName: <ColoumHead variant="h2">Actions</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <UpdateIcon
          // onClick={() => navigate(`/products/add?cid=${params.row._id}`)}
          />
          &nbsp;&nbsp;&nbsp;
          <ViewIcon onClick={() => handleView(params.row)} />
          {params.row.isActive ? (
            <>
              &nbsp;&nbsp;&nbsp;
              <DeletionIcon
              //  onClick={() => handleAlert(params.row)}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
      ),
    },
  ];
  const initPagination = (p) => {
    try {
      dispatch(
        loadPaginationOrderCustomers(listBody({ where: { "userId": cid }, perPage: 10, page: p + 1 }))
      );
    } catch (error) {
      alert(error);
    }
  };
  const captureSearch = async (data) => {
    const body = {
      searchText: data,
    };
    try {
      if (data.length >= 3) {
        dispatch(
          onOrderSearch({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      }
      if (data.length === 0) {
        dispatch(
          fetchOrderCustomersList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <OrderStatusDialog
        open={open}
        dialogData={dialogData}
        onSubmission={handleSubmit}
        handleCancelIcon={handleCancelIcon}
      />
      <OrderView
        view={view}
        handleCloseView={handleCloseView}
        viewdata={viewdata}
      />
      <Grid container sx={{ paddingBottom: "20px" }}>
        <BreadcrumbArea />
        <Grid xs={5}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by PaymentId..."
              onChange={(e) => captureSearch(e.target.value)} // its a text field user for searching the category
            />
          </Search>
        </Grid>
      </Grid>
      <TableGrid // its material UI DataGrid to show the Product information in a  table structure
        autoHeight={true}
        rows={orderList}
        columns={columns}
        loading={loading}
        pageSize={10}
        rowCount={totalCount}
        rowsPerPageOptions={[10]}
        checkboxSelection={true}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        paginationMode={"server"}
        pagination
        onPageChange={initPagination}
        // onSelectionModelChange={(itm) => console.log(itm)}
        Property="RowHeaderWidth"
      />
    </Container>
  );
};

export default Orders;
