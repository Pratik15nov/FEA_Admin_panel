import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBody, ENDPOINTURLFORIMG } from "../../utils/Helper";
import {
  categoryHandlerData,
  categoryStatus,
  searchHandlerData,
  categoryDelete,
} from "../../service/Auth.Service";
import {
  ImageAvatar,
  UpdateIcon,
  DeletionIcon,
  IOSSwitch,
  TableGrid,
  CategoryName,
  ColoumHead,
  Container,
} from "./Category.style";
import { Box } from "@mui/material";
import {
  fetchCategoryList,
  categoryStatusChange,
  onDeletion,
  fetchCategoryListSuccess,
  fetchCategoryListFailure,
  updatePageNumber,
} from "../../js/actions";
import { useNavigate } from "react-router";
import BreadcrumbArea from "../BreadcrumbArea";
import DialogBox from "../Dialog/index";

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);
  // const [totalCount, setTotalCount] = useState(0);
  // const [page, setPage] = useState(1);

  const categoryList = useSelector((state) => state.category.list);
  const totalCount = useSelector((state) => state.category.totalCount);
  const page = useSelector((state) => state.category.page);

  const dispatch = useDispatch();

  console.log("State: ", categoryList);
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
      dispatch(categoryStatusChange({id: id, body, defaultPayload: listBody({ where: null, perPage: 10, page: page })}));
      // const response = await categoryStatus(id, body);

      // if (response.success) {
      //   dispatch(fetchCategoryListFailure());
      //   getCategoryData();
      // } else {
      //   alert("SWITCH IS NOT WORKING");
      // }
    } catch (err) {
      alert(err);
    }
  };

  // this function handles the onClick event emitted by the <DeletionIcon/>
  const removeCategory = async () => {
    try {
      dispatch(onDeletion({id:alertData._id,defaultPayload:listBody({ where: null, perPage: 10, page: page })}));
      setOpenAlert(false);
      // const response = await categoryDelete(alertData._id);
      // if (response.data.success) {
      //   setOpenAlert(false);
      //   setAlertData([]);
      //   dispatch(fetchCategoryListFailure());
      //   getCategoryData();
      // } else {
      //   alert("DELETION NOT WORKING");
      // }
    } catch (error) {
      alert(error);
    }
  };

  //  this API  fetches the data  from databse according to pagination
  const getCategoryData = async () => {
    setLoading(true);
    try {
      if (categoryList.length === 0) {
        dispatch(fetchCategoryList(listBody({ where: null, perPage: 10, page: page })));
        // const response = await categoryHandlerData(
        //   listBody({ where: null, perPage: 10, page: page })
        // );

        // if (response.success) {
        //   // if (totalCount === 0) {
        //   //   setTotalCount(response.count);
        //   // }
        //   dispatch(fetchCategoryListSuccess(response));
        //   // setCategoryData(response?.list);
        // } else {
        //   dispatch(fetchCategoryListFailure());
        //   // setCategoryData([]);
        // }
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  // this function captures the values emitted by the search field and updates the table(DataGrid);
  const captureSearch = async (data) => {
    const body = {
      searchText: data,
    };

    try {
      if (data.length >= 3) {
        const response = await searchHandlerData(body);

        setCategoryData(response?.data);
      }
      if (data.length === 0) {
        dispatch(fetchCategoryListFailure());
        getCategoryData();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <BreadcrumbArea captureSearch={captureSearch} />
      <DialogBox // to open the dialogBox as confirmation for the deletion of category after clicking on the <DeletionIcon/>
        openAlert={openAlert}
        alertClose={alertClose}
        msg={`Are you sure you want to delete ${alertData.categoryName}  category ?`}
        onAgree={removeCategory}
      />
      <TableGrid // its material UI DataGrid to show the category information in a  table structure
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
        onPageChange={(page, detail) => {
          dispatch(updatePageNumber(page + 1));
        }}
        // onSelectionModelChange={(itm) => console.log(itm)}
        Property="RowHeaderWidth"
      />
    </Container>
  );
}
