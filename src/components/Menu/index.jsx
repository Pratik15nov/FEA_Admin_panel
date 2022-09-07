import BreadcrumbArea from "../BreadcrumbArea";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listBody } from "../../utils/Helper";
import { fetchMenuList, updateMenuData } from "../../js/actions";
import { TableGrid } from "./Menu.style";
import { Grid } from "@mui/material";
import {
  Container,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ColoumHead,
  RowName,
  IOSSwitch,
  DeletionIcon,
  DisableDeletionIcon,
} from "./Menu.style";
import SearchIcon from "@mui/icons-material/Search";

const Menu = () => {
  const menuList = useSelector((state) => state.menu.list);
  console.log("menuList: ", menuList);
  const page = useSelector((state) => state.menu.page);
  const totalCount = useSelector((state) => state.menu.totalCount);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    getOrderData(); // eslint-disable-next-line
  }, []);

  const getOrderData = () => {
    try {
      dispatch(
        fetchMenuList(listBody({ where: null, perPage: 10, page: page }))
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
        updateMenuData({
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
        updateMenuData({
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
      field: "fieldName",
      headerName: <ColoumHead variant="h2">Field-Name</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <RowName>
          {params.row?.fieldName
            ? params.row?.fieldName.charAt(0).toUpperCase() +
              params.row?.fieldName.slice(1)
            : "NO/Name"}
        </RowName>
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
        <>
          {params.row?.isActive === true ? (
            <DeletionIcon onClick={() => handleDeletion(params.row._id)} />
          ) : (
            <DisableDeletionIcon />
          )}
        </>
      ),
    },
  ];

  return (
    <Container>
      <Grid container sx={{ paddingBottom: "20px" }}>
        <BreadcrumbArea />
        <Grid xs={5}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by PaymentId..."
              // onChange={(e) => captureSearch(e.target.value)} // its a text field user for searching the category
            />
          </Search>
        </Grid>
      </Grid>
      <TableGrid // its material UI DataGrid to show the Product information in a  table structure
        autoHeight={true}
        rows={menuList}
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
        // onPageChange={initPagination}
        // onSelectionModelChange={(itm) => console.log(itm)}
        Property="RowHeaderWidth"
      />
    </Container>
  );
};

export default Menu;
