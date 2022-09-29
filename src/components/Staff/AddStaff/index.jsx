import React from "react";
import BreadcrumbArea from "../../BreadcrumbArea";
import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  InputBox,
  InputField,
  BottomButton,
  SelectField,
  CustomText,
} from "./AddStaff.style";
import { Typography, Grid, Skeleton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  staffDataHandler, // eslint-disable-next-line
} from "../../../service/Auth.Service";
import { listBody } from "../../../utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import {
  addStaffData,
  updateStaff,
  fetchRoleDataList,
} from "../../../js/actions";

const AddStaff = (props) => {
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
      navigate("/staff");
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
        staffHandler(staffId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(staffId);
    roleListData(); // eslint-disable-next-line
  }, [search]);
  const roleSelectionList = useSelector((state) => state.roleList.list);
  const staffHandler = async (staffId) => {
    try {
      const response = await staffDataHandler(
        listBody({
          where: {
            _id: staffId,
          },
          perPage: 10,
        })
      );
      if (response.success && response.list) {
        reset({
          firstName: response.list[0].firstName,
          lastName: response.list[0].lastName,
          email: response.list[0].email,
          phoneNumber: response.list[0].phoneNumber,
          role: response.list[0].role._id,
        });
      } else {
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const roleListData = async (staffId) => {
    try {
      dispatch(fetchRoleDataList(listBody({ perPage: 1000 })));
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
      role: null,
    },
  });
  const handleAdd = async (body) => {
    if (cid) {
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
    } else {
      try {
        dispatch(
          addStaffData({
            body,
            defaultPayload: listBody({ where: null, perPage: 10, page: page }),
          })
        );
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleAdd)}>
        <Grid container sx={{ paddingBottom: "20px" }}>
          <BreadcrumbArea />
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
          <Grid container sx={{ flexWrap: "nowrap" }}>
            <InputBox item xs={6}>
              <CustomText  variant="subtitle2">
                First-Name
              </CustomText>
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
                    helperText={error?.message ? error.message : ""}
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
              <CustomText  variant="subtitle2">
                Last-Name
              </CustomText>
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
                    helperText={error?.message ? error.message : ""}
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
              <CustomText  variant="subtitle2">
                E-mail
              </CustomText>
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
                    helperText={error?.message ? error.message : ""}
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

              <CustomText  variant="subtitle2">
                Contact
              </CustomText>
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
                    helperText={error?.message ? error.message : ""}
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
            </InputBox>
            <InputBox item xs={6}>
              <CustomText variant="subtitle2">
                User Post
              </CustomText>
              <Controller
                name="role"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <SelectField
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="role"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error?.message ? error.message : ""}
                    >
                      {roleSelectionList?.map((r, index) => {
                        return (
                          <MenuItem key={index} value={r._id}>
                            {r.roleName}
                          </MenuItem>
                        );
                      })}
                    </SelectField>
                    <FormHelperText error={error}>
                      {error?.message ? error.message : ""}
                    </FormHelperText>
                  </>
                )}
                control={control}
                rules={{
                  required: "Select one Post",
                }}
              />
              <BottomButton
                type="submit"
                loadingPosition="end"
                variant="contained"
              >
                {cid ? "Update" : "Add"} User
              </BottomButton>
              <BottomButton
                variant="contained"
                onClick={() => navigate("/staff")}
              >
                Back
              </BottomButton>
            </InputBox>
          </Grid>
        )}
      </form>
    </Container>
  );
};

export default AddStaff;
