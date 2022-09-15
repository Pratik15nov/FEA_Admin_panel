import { useState } from "react";
import { useEffect } from "react";
import { Container, InputBox, InputField, BottomButton } from "./profile.style";
import {
  staffDataHandler, // eslint-disable-next-line
} from "../../service/Auth.Service";
import { Typography, Grid, Skeleton, Box, Breadcrumbs } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MyLink } from "../BreadcrumbArea/Breadcrumbarea.style";
import { listBody } from "../../utils/Helper";
import { updatepProfile } from "../../js/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cid, setcid] = useState();
  const [show, setShow] = useState(false);
  const jumpOnPath = useSelector((state) => state.staff.jumpTo);

  const navigate = useNavigate();
  let info = JSON.parse(localStorage.getItem("Data"));
  useEffect(() => {
    if (jumpOnPath !== null) {
      navigate(`${jumpOnPath}`);
    } // eslint-disable-next-line
  }, [jumpOnPath]);

  useEffect(() => {
    setcid(info?.data?.id);
    profileHandler(info?.data?.id); // eslint-disable-next-line
  }, []);

  const profileHandler = async (id) => {
    setLoading(true);
    try {
      const response = await staffDataHandler(
        listBody({
          where: {
            _id: id,
          },
          perPage: 10,
        })
      );
      console.log("response: ", response);
      if (response.success) {
        profileFormControl.reset({
          firstName: response?.list[0].firstName,
          lastName: response?.list[0].lastName,
          phoneNumber: response?.list[0].phoneNumber,
          email: response?.list[0].email,
        });
        setLoading(false);
      } else {
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const handleAdd = async (body) => {
    console.log("body: ", body);
    try {
      dispatch(
        updatepProfile({
          cid,
          body,
        })
      );
    } catch (error) {
      alert(error);
    }
  };
  const profileFormControl = useForm({
    defaultValues: {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
    },
  });

  const changePasswordFormControl = useForm({
    defaultValues: {
      oldPassword: null,
      newPassword: null,
      confirmPassword:null,
    },
  });
  let pwd = changePasswordFormControl.watch("newPassword");

  const handleGet = (body) => {
    console.log("body: ", body);
  };

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
      <Grid container sx={{ paddingBottom: "20px" }}>
        <Grid item xs={7}>
          <form onSubmit={profileFormControl.handleSubmit(handleAdd)}>
            {loading ? (
              <InputBox item>
                <Skeleton animation="wave" height={25} width="30%" />
                <Skeleton animation="wave" height={70} width="100%" />
                <Skeleton animation="wave" height={25} width="30%" />
                <Skeleton animation="wave" height={70} width="100%" />
                <Skeleton animation="wave" height={25} width="30%" />
                <Skeleton animation="wave" height={70} width="100%" />
                <Skeleton animation="wave" height={70} width="40%" />
              </InputBox>
            ) : (
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
                  control={profileFormControl.control}
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
                  control={profileFormControl.control}
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
                  control={profileFormControl.control}
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
                  control={profileFormControl.control}
                  rules={{
                    required: "Please add email ",
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Enter email properly",
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
                {!show && 
                <BottomButton
                  variant="contained"
                  onClick={() => setShow(true)}
                >
                 Reset-Passowrd
                </BottomButton> }
              </InputBox>
            )}
          </form>
        </Grid>
        <Grid item xs={5}>
          <form onSubmit={changePasswordFormControl.handleSubmit(handleGet)}>
           {show &&
            <InputBox item xs={12}>
            <Typography color="text.primary" variant="subtitle2">
              Old-password
            </Typography>
            <Controller
              name="oldPassword"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="oldPassword"
                  placeholder="Enter you old password"
                  name="oldPassword"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={changePasswordFormControl.control}
              rules={{
                required: "Please fill  your oldpassword",
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              New Password
            </Typography>
            <Controller
              name="newPassword"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="newPassword"
                  placeholder="Enter you new Password"
                  name="newPassword"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={changePasswordFormControl.control}
              rules={{
                required: "Please fill  your new Password",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    " Must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character ",
                },
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
             Confirm New Password
            </Typography>
            <Controller
              name="confirmPassword"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="confirmPassword"
                  placeholder=" Re-enter your new Password"
                  name="confirmPassword"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={changePasswordFormControl.control}
              rules={{
                required: "Please re-enter your new Password",
                validate: value => value === pwd || "The passwords do not match"
              }}
            />
            <BottomButton
              type="submit"
              loadingPosition="end"
              variant="contained"
            >
              Update Password
            </BottomButton>
            <BottomButton
              variant="contained"
              onClick={() => setShow(false)}
            >
              Back
            </BottomButton>
          </InputBox>
           }
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
