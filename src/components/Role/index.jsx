import BreadcrumbArea from "../BreadcrumbArea";
import { Container,Search ,SearchIconWrapper,StyledInputBase } from "./Role.style";
import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listBody } from "../../utils/Helper";
import { fetchRoleList } from "../../js/actions";

const Role = () => {
  const roleList = useSelector((state) => state.role.list);
  console.log('roleList: ', roleList);
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

  return (
    <>
      <Container>
      <Grid container sx={{ paddingBottom: "20px" }}>
        <BreadcrumbArea />
        <Grid xs={5}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
             // onChange={(e) => captureSearch(e.target.value)} // its a text field user for searching the category
            />
          </Search>
        </Grid>
      </Grid>
      </Container>
    </>
  );
};

export default Role;
