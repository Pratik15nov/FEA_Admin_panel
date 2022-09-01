import React, { useEffect, useState } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  categoryEditHandler,
  categoryHndlerData,
  categoryAddHandler,
} from "../../service/Auth.Service";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  InputBox,
  BottomButton,
} from "./Staff.style";
import { fetchCategoryList } from "../../js/actions";
import { useDispatch } from "react-redux";
import { listBody } from "../../utils/Helper";
import { Checkbox } from "@material-ui/core";

const userData = [
  { name: "Dashboard" },
  { name: "Products" },
  { name: "Category" },
  { name: "Customers" },
  { name: "Coupons" },
  { name: "Staff" },
  { name: "Orders" }
];

export default function AddRole(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //use for images manually upload and drop


  useEffect(() => {
    let roleId;
    try {
      if (search.split("=").length > 0) {
        roleId = search.split("=")[1];
      } else {
        roleId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (search.split("=").length > 0) {
        roleId = search.split("=")[1];
      } else {
        roleId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (roleId) {
        getRoleData(roleId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(roleId);
    setUsers(userData);
    // eslint-disable-next-line
  }, [search]);
  const [users, setUsers] = useState([]);
  console.log(users);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  // this function get particular category name and image
  const getRoleData = async (roleId) => {
    const response = await categoryHndlerData(roleId);
    try {
      if (response) {
        reset({
          categoryName: response.categoryName,
          categoryImg: response.categoryImg,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  // this function used for after submit form create object and then update functionality this value change from api value
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      categoryName: null,
      categoryImg: null,
    },
  });

  // it can be use for edit categories details
  const handleCategoryData = async (body) => {
    setLoading(true);

  };




  return (
    <Container>
      <BreadcrumbArea />

      <InputBox>

        <form>
          <Typography color="text.primary" variant="subtitle2">
            Role Name
          </Typography>
          <Controller
            name="categoryName"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="categoryName"
                placeholder="Role Name"
                name="categoryName"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please add role name",
            }}
          />
          <Typography color="text.primary" variant="subtitle2">
            Choose View Option
          </Typography>
          <Controller
            name="categoryName"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Checkbox
                name="allSelect"
                // checked={
                //   users.filter((user) => user?.isChecked !== true).length < 1
                // }
                color="default"
                checked={!users.some((user) => user?.isChecked !== true)}
                onChange={handleChange}
              />)}
            control={control}
            rules={{
              required: "Please add role name",
            }}
          />
          {users.map((user, index) => (
            <Box key={index}>
              <Checkbox
                name={user.name}
                checked={user?.isChecked || false}
                onChange={handleChange}
                color="default"
              />
              <label className="form-check-label ms-2">{user.name}</label>
            </Box>
          ))}
          <br />
          <BottomButton
            type="submit"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(handleCategoryData)}
          >
            {cid ? "Update" : "Add"} Role
          </BottomButton>
          <BottomButton
            variant="contained"
            onClick={() => navigate("/staff")}
          >
            Back
          </BottomButton>
        </form>

      </InputBox>
    </Container>
  );
}
