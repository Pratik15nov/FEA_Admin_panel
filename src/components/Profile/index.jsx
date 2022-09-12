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
import { addStaffData, updateStaff } from "../../js/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cid, setcid] = useState();
  const jumpOnPath = useSelector((state) => state.staff.jumpTo);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    if (jumpOnPath !== null) {
      navigate("/dashboard");
    } // eslint-disable-next-line
  }, [jumpOnPath]);

  useEffect(() => {
    let info = JSON.parse(localStorage.getItem("Data"));
    setcid(info?.data?.id);
    profileHandler(info?.data?.id);
  }, []);

  const profileHandler = async (profileId) => {
    try {
      const response = await staffDataHandler(
        listBody({
          where: {
            _id: profileId,
          },
          perPage: 10,
        })
      );
      if (response.success) {
        console.log(response);
        reset({
          firstName: response?.list[0].firstName,
          lastName: response?.list[0].lastName,
          email: response?.list[0].email,
          phoneNumber: response?.list[0].phoneNumber,
        });
      } else {
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const handleAdd = async (body) => {
    try {
      dispatch(
        updateStaff({
          cid,
          body,
        })
      );
    } catch (error) {
      alert(error);
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

      <Grid container sx={{ flexWrap: "nowrap" }}>
        <form onSubmit={handleSubmit(handleAdd)}>
          <InputBox item xs={12}>
            <Typography color="text.primary" variant="subtitle2">
              First-Name
            </Typography>
            <Controller
              name="firstName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="firstName"
                  placeholder="Enter you first name"
                  name="firstName"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add firstname",
                maxLength: {
                  value: 12,
                  message: "Cannot be longer than 12 characters",
                },
                pattern: {
                  value:
                    /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
                  message: "Only words are allowed",
                },
                minLength: {
                  value: 4,
                  message: "Cannot be smaller than 4 characters",
                },
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              Last-Name
            </Typography>
            <Controller
              name="lastName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="lastName"
                  placeholder="Enter you last name"
                  name="lastName"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add lastName",
                maxLength: {
                  value: 12,
                  message: "Cannot be longer than 12 characters",
                },
                pattern: {
                  value:
                    /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
                  message: "Only words are allowed",
                },
                minLength: {
                  value: 4,
                  message: "Cannot be smaller than 4 characters",
                },
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              E-mail
            </Typography>
            <Controller
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="email"
                  placeholder="Enter you email"
                  name="email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add email-address",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Add a valid email-address ",
                },
              }}
            />

            <Typography color="text.primary" variant="subtitle2">
              Contact
            </Typography>
            <Controller
              name="phoneNumber"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="phoneNumber"
                  placeholder="Enter you phonenumber"
                  name="phoneNumber"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add phone number ",
                minLength: {
                  value: 10,
                  message: "Cannot be smaller than 10 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Cannot be longer than 10 characters",
                },

                pattern: {
                  value: /^[0-9]/,
                  message: "Enter only 10 digit number",
                },
              }}
            />
            <BottomButton
              type="submit"
              loadingPosition="end"
              variant="contained"
            >
              Update Profile
            </BottomButton>
            <BottomButton
              variant="contained"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </BottomButton>
          </InputBox>
        </form>
      </Grid>
    </Container>
  );
};

export default Profile;
