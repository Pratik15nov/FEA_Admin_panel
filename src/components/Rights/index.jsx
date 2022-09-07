import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBody, ENDPOINTURLFORIMG } from "../../utils/Helper";
import {
  ImageAvatar,
  UpdateIcon,
  DeletionIcon,
  IOSSwitch,
  TableGrid,
  RowName,
  ColoumHead,
  Container,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MyButton,
} from "./Rights.style";
import { Box, Grid } from "@mui/material";
import {
  fetchRightsList,
  rightsStatusChange,
  onDeletionRights,
  onRightsSearch,
  rightsCategoryPagination,
  fetchRightsListFailure,
} from "../../js/actions";
import { useNavigate } from "react-router";
import BreadcrumbArea from "../BreadcrumbArea";
import SearchIcon from "@mui/icons-material/Search";
import DialogBox from "../Dialog/index";

export default function Rights() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const rightsList = useSelector((state) => state.rights.list);
  const totalCount = useSelector((state) => state.rights.count);
  const page = useSelector((state) => state.rights.page);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getRightsData(); // eslint-disable-next-line
  }, [page]);

  // this coloum makes sures that what types of Table Head we want to apply to our table(DataGrid)
  const columns = [
    {
      field: "roleName",
      headerName: <ColoumHead variant="h2">Rolename</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => <RowName>{params.row.roleId.roleName}</RowName>,
    },

    {
      field: "actions",
      headerName: <ColoumHead variant="h2">Actions</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <UpdateIcon
            onClick={() => navigate(`/rights/add?cid=${params.row.roleId._id}`)}
          />
          {params.row.roleId.isActive ? (
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
        rightsStatusChange({
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
  const removeRights = async () => {
    try {
      dispatch(
        onDeletionRights({
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
  const getRightsData = async () => {
    try {
      if (rightsList.length === 0) {
        dispatch(
          fetchRightsList(listBody({ where: null, perPage: 10, page: page }))
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
        dispatch(fetchRightsListFailure());
        dispatch(
          onRightsSearch({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      }
      if (data.length === 0) {
        dispatch(
          fetchRightsList(listBody({ where: null, perPage: 10, page: page }))
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
        rightsCategoryPagination(
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
              onChange={(e) => captureSearch(e.target.value)} // its a text field user for searching the rights
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
      <DialogBox // to open the dialogBox as confirmation for the deletion of rights after clicking on the <DeletionIcon/>
        openAlert={openAlert}
        alertClose={alertClose}
        msg={`Are you sure you want to delete ${alertData.rightsName}  rights ?`}
        onAgree={removeRights}
      />
      <TableGrid // its material UI DataGrid to show the rights information in a  table structure
        autoHeight={true}
        rows={rightsList}
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
        Property="RowHeaderWidth"
      />
    </Container>
  );
}
