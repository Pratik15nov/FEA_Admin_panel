import BreadcrumbArea from "../BreadcrumbArea";
import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  InputBox,
  InputField,
  BottomButton,
  SelectField,
} from "./profile.style";
import {
  roleHandlerData,
  staffDataHandler, // eslint-disable-next-line
  updateStaffHandlerData,
} from "../../service/Auth.Service";
import { Typography, Grid, Skeleton, Box, Breadcrumbs } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MyLink } from "../BreadcrumbArea/Breadcrumbarea.style";
import { listBody } from "../../utils/Helper";
const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cid, setcid] = useState();
  const page = useSelector((state) => state.staff.page);
  const jumpOnPath = useSelector((state) => state.staff.jumpTo);
  const [roleData, setRoleData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    if (jumpOnPath !== null) {
      navigate("/dashboard");
    } // eslint-disable-next-line
  }, [jumpOnPath]);

  useEffect(() => {
    let staffId;
    try {
      if (search.split("=").length > 0) {
        staffId = search.split("=")[1];
      } else {
        staffId = "";
      }
    } catch (error) {
      alert(error);
    }

    try {
      if (staffId) {
        profileHandler(staffId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(staffId);
  }, [search]);
  const profileHandler = async (staffId) => {
    try {
      const response = await staffDataHandler(
        listBody({
          where: {
            _id: staffId,
          },
          perPage: 10,
        })
      );
      if (response.success) {
        reset({
          firstName: response?.list[0].firstName,
          lastName: response?.list[0].lastName,
          email: response?.list[0].email,
          phoneNumber: response?.list[0].phoneNumber,
          role: response?.list[0].role._id,
        });
      } else {
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
    },
  });
  return (
    <Container>
      <form>
        <Grid container sx={{ paddingBottom: "20px" }}>
          <Grid xs={7}>
            <Typography variant="h1"> Profile Settings</Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Box underline="hover" color="inherit">
                <MyLink
                  style={{
                    color: "black",
                  }}
                  to="/dashboard"
                >
                  Dashboard
                </MyLink>
              </Box>
              <Typography>Profile</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        {loading ? (
          <Grid container sx={{ flexWrap: "nowrap" }}>
            <InputBox item xs={6}>
              <Skeleton animation="wave" height={25} width="30%" />
              <Skeleton animation="wave" height={70} width="100%" />
              <Skeleton animation="wave" height={25} width="30%" />
              <Skeleton animation="wave" height={70} width="100%" />
              <Skeleton animation="wave" height={25} width="30%" />
              <Skeleton animation="wave" height={70} width="100%" />
              <Skeleton animation="wave" height={25} width="30%" />
              <Skeleton animation="wave" height={70} width="100%" />
            </InputBox>
            <InputBox item xs={6}>
              <Skeleton animation="wave" height={25} width="30%" />
              <Skeleton animation="wave" height={70} width="100%" />
              <Skeleton animation="wave" height={70} width="38%" />
            </InputBox>
          </Grid>
        ) : (
          <></>
        )}
      </form>
    </Container>
  );
};

export default Profile;
