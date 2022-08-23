import { React, useState, useEffect } from "react";
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
  MyButton,
  DialogText,
} from "./Category.style";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router";
import BreadcrumbArea from "../BreadcrumbArea";

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [breadMsg, setBreadMsg] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    setBreadMsg("Category");
    getCategoryData(); // eslint-disable-next-line
  }, [page]);

  // this coloum makes sures that what types of Table Head we want to apply to our table(DataGrid)
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
      const response = await categoryStatus(id, body);

      if (response.success) {
        getCategoryData();
      } else {
        alert("SWITCH IS NOT WORKING");
      }
    } catch (err) {
      alert(err);
    }
  };

  // this function handles the onClick event emitted by the <DeletionIcon/>
  const removeCategory = async (id) => {
    try {
      const response = await categoryDelete(id);
      if (response.data.success) {
        setOpenAlert(false);
        setAlertData([]);
        getCategoryData();
      } else {
        alert("DELETION NOT WORKING");
      }
    } catch (error) {
      alert(error);
    }
  };

  //  this API  fetches the data  from databse according to pagination
  const getCategoryData = async () => {
    setLoading(true);
    try {
      const response = await categoryHandlerData(
        listBody({ where: null, perPage: 10, page: page })
      );

      if (response.success) {
        if (totalCount === 0) {
          setTotalCount(response.count);
        }
        setCategoryData(response?.list);
      } else {
        setCategoryData([]);
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
        getCategoryData();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box>
      <BreadcrumbArea captureSearch={captureSearch} breadMsg={breadMsg} />
      <Dialog // open up a dialog box as a confirmation when user clicks on <DeletionIcon/> icon
        open={openAlert}
        onClose={alertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deletion alert</DialogTitle>
        <DialogContent>
          <DialogText>
            Are you sure you want to delete
            <b>{alertData.categoryName}</b> category ?
          </DialogText>
        </DialogContent>
        <DialogActions>
          <MyButton onClick={alertClose}>Disagree</MyButton>
          <MyButton onClick={() => removeCategory(alertData._id)} autoFocus>
            Agree
          </MyButton>
        </DialogActions>
      </Dialog>
      <TableGrid // its material UI DataGrid to show the category information in a  table structure
        autoHeight={true}
        rows={categoryData}
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
    </Box>
  );
}
