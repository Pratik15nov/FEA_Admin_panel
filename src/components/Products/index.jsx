import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  productHandlerData,
  productEditHandler,
} from "../../service/Auth.Service";
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
} from "./Products.style";
import BreadcrumbArea from "../BreadcrumbArea";
import DialogBox from "../Dialog";
import { useNavigate } from "react-router";
const Products = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);
  console.log("alertData: ", alertData);

  useEffect(() => {
    getProductData(); // eslint-disable-next-line
  }, [page]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await productHandlerData(
        listBody({ where: null, perPage: 10, page: page })
      );
      if (response.success) {
        const UpdatedData = response?.list.map((obj) => ({
          ...obj?.categoryId,
          ...obj,
        }));
        //  console.log('Updatedata: ', Updatedata);
        if (totalCount === 0) {
          setTotalCount(response.count);
        }
        setProductData(UpdatedData);
      } else {
        setProductData([]);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("DATA", productData);

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
          onClick={() => console.log(params)}
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
          {params.row.categoryName ? params.row.categoryName : "unspecified"}
        </RowName>
      ),
    },
    {
      field: "price",
      headerName: <ColoumHead variant="h2">Price</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => <RowName>Rs&nbsp;{params.row.price}</RowName>,
    },
    {
      field: "discountPrice",
      headerName: <ColoumHead variant="h2">Discount</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <RowName>Rs&nbsp;{params.row.discountPrice}.00</RowName>
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

  const handleToggleStatus = async (id, value) => {
    const body = {
      isActive: value,
    };
    try {
      const response = await productEditHandler(id, body);

      if (response.success) {
        getProductData();
      } else {
        alert("SWITCH IS NOT WORKING");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleAlert = (data) => {
    setAlertData(data);
    setOpenAlert(true);
  };

  const alertClose = () => {
    setAlertData([]);
    setOpenAlert(false);
  };

  const removeProduct = async () => {
    const body = {
      isActive: false,
    };
    try {
      const response = await productEditHandler(alertData._id, body);
      if (response.success) {
        setOpenAlert(false);
        setAlertData([]);
        getProductData();
      } else {
        alert("DELETION NOT WORKING");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <BreadcrumbArea />
      <DialogBox // to open the dialogBox as confirmation for the deletion of category after clicking on the <DeletionIcon/>
        openAlert={openAlert}
        alertClose={alertClose}
        msg={`Are you sure you want to delete ${alertData.name}  product ?`}
        onAgree={removeProduct}
      />
      <TableGrid // its material UI DataGrid to show the category information in a  table structure
        autoHeight={true}
        rows={productData}
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
          setPage(page + 1);
        }}
        // onSelectionModelChange={(itm) => console.log(itm)}
        Property="RowHeaderWidth"
      />
    </Container>
  );
};

export default Products;
