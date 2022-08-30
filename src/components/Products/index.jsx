import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchProductList,
  productStatusChange,
  onDeletionProduct,
  onProductSearch,
  loadingPagination,
} from "../../js/actions";
import { listBody, ENDPOINTURLFORIMG } from "../../utils/Helper";
import {
  Container,
  TableGrid,
  ImageAvatar,
  IOSSwitch,
  UpdateIcon,
  DeletionIcon,
  ColoumHead,
  RowName,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MyButton,
} from "./Products.style";
import BreadcrumbArea from "../BreadcrumbArea";
import DialogBox from "../Dialog";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";

const Products = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const productList = useSelector((state) => state.product.list);
  console.log("productList: ", productList);
  const totalCount = useSelector((state) => state.product.totalCount);
  const page = useSelector((state) => state.product.page);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    getProductData(); // eslint-disable-next-line
  }, [page]);
  // this coloum makes sures that what types of Table Head we want to apply to our table(DataGrid)
  const columns = [
    {
      field: "img",
      headerName: <ColoumHead variant="h2">Image</ColoumHead>,
      flex: 1,
      width: 200,
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
      field: "name",
      headerName: <ColoumHead variant="h2">Product</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => <RowName>{params.row.name}</RowName>,
    },
    {
      field: "categoryName",
      headerName: <ColoumHead variant="h2">Category</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <RowName>
          {params.row.categoryId?.categoryName
            ? params.row.categoryId.categoryName
            : "unspecified"}
        </RowName>
      ),
    },
    {
      field: "price",
      headerName: <ColoumHead variant="h2">Price</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <RowName>
          {Number.isInteger(params.row.price)
            ? `Rs${" "}${params.row.price}.00`
            : `Rs${" "}${params.row.price.toFixed(2)}`}
        </RowName>
      ),
    },
    {
      field: "discountPrice",
      headerName: <ColoumHead variant="h2">Discount</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <RowName>
          {Number.isInteger(params.row.discountPrice)
            ? `Rs${" "}${params.row.discountPrice}.00`
            : `Rs${" "}${params.row.discountPrice.toFixed(2)}`}
        </RowName>
      ),
    },
    {
      field: "quantity",
      headerName: <ColoumHead variant="h2">Quantity</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => <RowName>{params.row.quantity}</RowName>,
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
            onClick={() => navigate(`/products/add?cid=${params.row._id}`)}
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
  // this function handles the toggle of Status
  const handleToggleStatus = async (id, value) => {
    const body = {
      isActive: value,
    };
    try {
      dispatch(
        productStatusChange({
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
  // this function handles the opening of dialog box
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
        onDeletionProduct({
          id: alertData._id,
          defaultPayload: listBody({ where: null, perPage: 10, page: page }),
        })
      );
      setOpenAlert(false);
    } catch (error) {
      alert(error);
    }
  };
  // this function captures the values emitted by the search field and updates the table(DataGrid);
  const captureSearch = async (data) => {
    const body = {
      searchText: data,
    };
    try {
      if (data.length >= 3) {
        dispatch(
          onProductSearch({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      }
      if (data.length === 0) {
        dispatch(
          fetchProductList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    } catch (error) {
      alert(error);
    }
  };
  const getProductData = async () => {
    try {
      if (productList.length === 0) {
        dispatch(
          fetchProductList(listBody({ where: null, perPage: 10, page: page }))
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
        loadingPagination(listBody({ where: null, perPage: 10, page: p + 1 }))
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
            onClick={() => navigate(`/products/add`)} // this navigates to a new component to add the new categories
          >
            Add Product
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
        rows={productList}
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
export default Products;
