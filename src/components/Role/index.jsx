import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  TableGrid,
  ColoumHead,
  RowName,
  UpdateIcon,
  DeletionIcon,
  IOSSwitch,
  MyButton,
} from "./Role.style";
import { Grid, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { listBody } from "../../utils/Helper";
import {
  fetchRoleList,
  addRoleToData,
  updateActionRoleData,
  loadPaginationRole,
  onRoleSearch,
} from "../../js/actions";
import AddRoleDialog from "./AddRoleDialog";
import UpdateRoleDialog from "./UpdateRoleDialog";

const Role = () => {
  const [openAddRole, setOpenAddRole] = useState(false);
  const [updateAddRole, setUpdateAddRole] = useState(false);
  const [updateRoleData, setUpdateRoleData] = useState([]);


  const roleList = useSelector((state) => state.role.list);

  const page = useSelector((state) => state.role.page);
  const totalCount = useSelector((state) => state.role.totalCount);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrderData(); // eslint-disable-next-line
  }, []);

  const getOrderData = () => {
    try {
      dispatch(
        fetchRoleList(listBody({ where: null, perPage: 10, page: page }))
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleToogleStatus = (id, value) => {
    const body = {
      isActive: value,
    };
    try {
      dispatch(
        updateActionRoleData({
          id: id,
          body,
          defaultPayload: listBody({
            where: null,
            perPage: 10,
            page: page,
          }),
        })
      );
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const handleDeletion = (id) => {
    const body = {
      isActive: false,
    };
    try {
      dispatch(
        updateActionRoleData({
          id: id,
          body,
          defaultPayload: listBody({
            where: null,
            perPage: 10,
            page: page,
          }),
        })
      );
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const addRole = (data) => {
    setOpenAddRole(false);
    const body = {
      roleName: data.roleName,
    };

    try {
      dispatch(
        addRoleToData({
          body,
          defaultPayload: listBody({
            where: null,
            perPage: 10,
            page: page,
          }),
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  const updateRole = (data) => {

    setUpdateAddRole(false);
    setUpdateRoleData([]);
    const body = {
      roleName: data.roleName,
    };
    try {
      dispatch(
        updateActionRoleData({
          id: updateRoleData._id,
          body,
          defaultPayload: listBody({
            where: null,
            perPage: 10,
            page: page,
          }),
        })
      );
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const columns = [
    {
      field: "createdAt",
      headerName: <ColoumHead variant="h2">Created-At</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <RowName>
          {params.row?.createdAt?.substring(8, 10)}
          {"/"}
          {params.row?.createdAt?.substring(5, 7)}
          {"/"}
          {params.row?.createdAt?.substring(0, 4)}
        </RowName>
      ),
    },
    {
      field: "roleName",
      headerName: <ColoumHead variant="h2">Role</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <RowName>{params.row?.roleName ? params.row.roleName : "N/A"}</RowName>
      ),
    },
    {
      field: "updatedAt",
      headerName: <ColoumHead variant="h2">Last-Updated</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <RowName>
          {params.row?.updatedAt?.substring(8, 10)}
          {"/"}
          {params.row?.updatedAt?.substring(5, 7)}
          {"/"}
          {params.row?.updatedAt?.substring(0, 4)}
        </RowName>
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
              handleToogleStatus(params.row._id, e.target.checked);
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
            onClick={() => (
              setUpdateAddRole(true), setUpdateRoleData(params.row)
            )}
            // onClick={() => navigate(`/products/add?cid=${params.row._id}`)}
          />

          {params.row.isActive ? (
            <>
              &nbsp;&nbsp;
              <DeletionIcon onClick={() => handleDeletion(params.row._id)} />
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
        loadPaginationRole(listBody({ where: null, perPage: 10, page: p + 1 }))
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
          onRoleSearch({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      }
      if (data.length === 0) {
        dispatch(
          fetchRoleList(listBody({ where: null, perPage: 10, page: page }))
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Container>
        <Grid container sx={{ paddingBottom: "20px" }}>
          <BreadcrumbArea />
          <Grid xs={3}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                onChange={(e) => captureSearch(e.target.value)} // its a text field user for searching the category
              />
            </Search>
          </Grid>
          <Grid xs={2}>
            <MyButton variant="contained" onClick={() => setOpenAddRole(true)}>
              Add Role
            </MyButton>
          </Grid>
        </Grid>
        <UpdateRoleDialog
          updateAddRole={updateAddRole}
          updateRoleData={updateRoleData}
          updateRoleClose={() => (setUpdateAddRole(false), updateRoleData([]))}
          onAgree={updateRole}
        />

        <AddRoleDialog
          openAddRole={openAddRole}
          addRoleClose={() => setOpenAddRole(false)}
          onAgree={addRole}
        />
        <TableGrid // its material UI DataGrid to show the Product information in a  table structure
          autoHeight={true}
          rows={roleList}
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
    </>
  );
};

export default Role;
