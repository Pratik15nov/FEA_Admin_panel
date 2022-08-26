import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DragDrop from "../DragDrop";
import {
  categoryEditHandler,
  customersHandlerData,
} from "../../service/Auth.Service";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  InputBox,
  ImgBox,
  ImgSize,
  DelIcon,
  BottomButton,
} from "./Customers.style";
import { fetchCategoryList } from "../../js/actions";
import { useDispatch } from "react-redux";
import { listBody } from "../../utils/Helper";

export default function UpdateCustomers(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [apiImg, setApiImg] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    let categoryId;
    try {
      if (search.split("=").length > 0) {
        categoryId = search.split("=")[1];
      } else {
        categoryId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (search.split("=").length > 0) {
        categoryId = search.split("=")[1];
      } else {
        categoryId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (categoryId) {
        getCustomersData(categoryId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(categoryId);
    // eslint-disable-next-line
  }, [search]);

  // this function get particular category name and image
  const getCustomersData = async (categoryId) => {
    const response = await customersHandlerData(categoryId);
    setApiImg(response.categoryImg);
    try {
      if (response) {
        reset({
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNumber: response.phoneNumber,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  // this function used for after submit form create object and then update functionality this value change from api value
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      firstName: null,
      lastName: null,
      phoneNumber: null,
    },
  });

  // it can be use for edit categories details
  const handleCategoryData = async (body) => {
    setLoading(true);
    try {
      if (cid) {
        let reqBody;
        try {
          if (file !== null) {
            reqBody = new FormData(); //  if passing an image or file with all data use reBody
            reqBody.append("categoryName", body.categoryName);
            reqBody.append("categoryImg", file);
          } else {
            // if not passing any imge or file pass  data normally like Body
            reqBody = {
              categoryName: body.categoryName,
              categoryImg: apiImg,
            };
          }
        } catch (error) {
          alert(error);
        }
        const response = await categoryEditHandler(cid, reqBody);
        try {
          if (response.success) {
            navigate(`/category`);
            dispatch(
              fetchCategoryList(listBody({ where: null, perPage: 10, page: 1 }))
            );
            setLoading(false);
            props.getValue(true, `${response.message}`);
          }
        } catch (error) {
          alert(error);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <BreadcrumbArea />

      <InputBox>
        <Typography color="text.primary" variant="subtitle2">
          First Name
        </Typography>
        <Controller
          name="firstName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message ?? ""}
            />
          )}
          control={control}
          rules={{
            required: "Please add first name",
          }}
        />
        <Typography color="text.primary" variant="subtitle2">
          Last Name
        </Typography>
        <Controller
          name="lastName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message ?? ""}
            />
          )}
          control={control}
          rules={{
            required: "Please add first name",
          }}
        />
        <Typography color="text.primary" variant="subtitle2">
          First Name
        </Typography>
        <Controller
          name="firstName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message ?? ""}
            />
          )}
          control={control}
          rules={{
            required: "Please add first name",
          }}
        />
        <br />
        <BottomButton
          type="submit"
          loading={loading}
          loadingPosition="end"
          variant="contained"
          onClick={handleSubmit(handleCategoryData)}
        >
          {cid ? "Update" : "Add"} Customers
        </BottomButton>
        <BottomButton
          variant="contained"
          onClick={() => navigate("/customers")}
        >
          Back
        </BottomButton>
      </InputBox>
    </Container>
  );
}
