import BreadcrumbArea from "../BreadcrumbArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Search,
  StyledInputBase,
  SearchIconWrapper,
  MyButton,
  TableGrid,
  ColoumHead,
  RowName,
  Contact,
  IOSSwitch,
  ImageAvatar,
  PostTag,
} from "./Staff.style";
import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { listBody } from "../../utils/Helper";
import { fetchStaffList } from "../../js/actions";
import { ENDPOINTURLFORIMG } from "../../utils/Helper";

const Staff = () => {
  const navigate = useNavigate();
  const staffList = useSelector((state) => state.staff.list);
  console.log("staffList: ", staffList);
  const page = useSelector((state) => state.staff.page);
  const totalCount = useSelector((state) => state.staff.totalCount);
  const loading = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    getStaffData(); // eslint-disable-next-line
  }, []);

  const getStaffData = () => {
    try {
      dispatch(
        fetchStaffList(listBody({ where: null, perPage: 10, page: page }))
      );
    } catch (error) {
      alert(error);
    }
  };
  const columns = [
    {
      field: "Img", // remember to pass same field -name as mentioned in dataBase
      headerName: <ColoumHead variant="h2">Image</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <ImageAvatar
          variant="rounded"
          alt="Category Image"
          src={ENDPOINTURLFORIMG + params.row.userImg}
        />
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
            {params.row?.firstName
              ? params.row?.firstName.charAt(0).toUpperCase() +
                params.row?.firstName.slice(1)
              : "NO/F"}
          </RowName>
          &nbsp;&nbsp;
          <RowName>
            {params.row?.lastName
              ? params.row?.lastName.charAt(0).toUpperCase() +
                params.row?.lastName.slice(1)
              : "NO/L"}
          </RowName>
        </>
      ),
    },
    {
      field: "email",
      headerName: <ColoumHead variant="h2">E-mail</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <RowName>{params.row?.email ? params.row?.email : "NO/F"}</RowName>
      ),
    },

    {
      field: "contact",
      headerName: <ColoumHead variant="h2">Contact</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Contact>
          {params.row.phoneNumber ? "+91 " + params.row.phoneNumber : "N/A"}
        </Contact>
      ),
    },
    {
      field: "role",
      headerName: <ColoumHead variant="h2">Post</ColoumHead>,
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <PostTag>
          {params.row?.role?.roleName ? params.row?.role?.roleName : "NO/F"}
        </PostTag>
      ),
    },

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
      field: "isActive",
      headerName: <ColoumHead variant="h2">Status</ColoumHead>,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <IOSSwitch
            sx={{ m: 1 }}
            checked={params.row?.isActive}
            // onChange={(e) => {
            //   handleToogleStatus(params.row._id, e.target.checked);
            // }}
          />
        );
      },
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

    
   
  ];

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
              // onChange={(e) => captureSearch(e.target.value)} // its a text field user for searching the category
            />
          </Search>
        </Grid>
        <Grid xs={2}>
          <MyButton
            variant="contained"
            onClick={() => navigate(`/staff/add`)} // this navigates to a new component to add the new categories
          >
            Add User
          </MyButton>
        </Grid>
      </Grid>
      <TableGrid // its material UI DataGrid to show the Product information in a  table structure
        autoHeight={true}
        rows={staffList}
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

export default Staff;
