import React, { useEffect, useState } from "react";
import { Typography, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  couponsHndlerData,
  couponsAddHandler,
  couponsEditHandler,
} from "../../service/Auth.Service";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  InputBox,
  BottomButton,
  SelectField,
} from "./Coupons.style";

import { fetchCouponsList } from "../../js/actions";
import { useDispatch } from "react-redux";
import { listBody } from "../../utils/Helper";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function AddCoupons(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    let couponsId;
    try {
      if (search.split("=").length > 0) {
        couponsId = search.split("=")[1];
      } else {
        couponsId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (search.split("=").length > 0) {
        couponsId = search.split("=")[1];
      } else {
        couponsId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (couponsId) {
        getCategoryData(couponsId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(couponsId);
    // eslint-disable-next-line
  }, [search]);

  // this function get particular category name and image
  const getCategoryData = async (couponsId) => {
    const response = await couponsHndlerData(
      listBody({ where: { _id: couponsId }, perPage: 10, page: 1 })
    );

    try {
      if (response) {
        reset({
          couponcode: response?.list[0].couponcode,
          description: response?.list[0].description,
          type: response?.list[0].type,
          minvalue: response?.list[0].minvalue,
          maxdiscountvalue: response.list[0].maxdiscountvalue,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  // this function used for after submit form create object and then update functionality this value change from api value
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      couponcode: null,
      description: null,
      type: null,
      minvalue: null,
      maxdiscountvalue: null,
    },
  });

  // it can be use for edit categories details
  const handleCouponsData = async (body) => {
    setLoading(true);
    try {
      if (cid) {
        const reqBody = {
          couponcode: body.couponcode,
          description: body.description,
          type: body.type,
          minvalue: body.minvalue,
          maxdiscountvalue: body.maxdiscountvalue,
        };
        const response = await couponsEditHandler(cid, reqBody);
        try {
          if (response.success) {
            navigate(`/coupons`);
            dispatch(
              fetchCouponsList(listBody({ where: null, perPage: 10, page: 1 }))
            );
            setLoading(false);
            props.getValue(true, `${response.message}`);
          }
        } catch (error) {
          alert(error);
        }
      } else {
        const reqBody = {
          couponcode: body.couponcode,
          description: body.description,
          type: body.type,
          minvalue: body.minvalue,
          maxdiscountvalue: body.maxdiscountvalue,
        };
        const response = await couponsAddHandler(reqBody);
        try {
          if (response.success) {
            navigate(`/coupons`);
            dispatch(
              fetchCouponsList(listBody({ where: null, perPage: 10, page: 1 }))
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
      <Typography color="text.primary">
        Add your Coupons code and necessary information from here
      </Typography>
      <InputBox>
        <form>
          <Typography color="text.primary" variant="subtitle2">
            Coupon Name
          </Typography>
          <Controller
            name="couponcode"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="couponcode"
                placeholder="Coupon Name"
                name="couponcode"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please add couponcode",
            }}
          />
          <Typography color="text.primary" variant="subtitle2">
            Coupon description
          </Typography>
          <Controller
            name="description"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="description"
                placeholder="Coupon description"
                name="description"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please add coupon description",
            }}
          />

          <Typography color="text.primary" variant="subtitle2">
            Coupon type
          </Typography>
          <Controller
            name="type"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth>
                <SelectField
                  labelId="demo-simple-select-label"
                  id="type"
                  placeholder="Coupon type"
                  name="type"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                >
                  <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
                  <MenuItem value="FLAT">FLAT</MenuItem>
                </SelectField>
                <FormHelperText error={error}>
                  {error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
            control={control}
            rules={{
              required: "Select one Type",
            }}
          />
          <Typography color="text.primary" variant="subtitle2">
            Coupon minvalue
          </Typography>
          <Controller
            name="minvalue"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="minvalue"
                placeholder="Coupon minvalue"
                name="minvalue"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
                type={Number}
              />
            )}
            control={control}
            rules={{
              required: "Please Add minvalue",
              maxLength: {
                value: 10,
                message: "Cannot be longer than 12 characters",
              },
              pattern: {
                value: /^[1-9]\d*(\d+)?$/i,
                message: "only numbers are allowed",
              },
            }}
          />
          <Typography color="text.primary" variant="subtitle2">
            Coupon maxdiscountvalue
          </Typography>
          <Controller
            name="maxdiscountvalue"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="maxdiscountvalue"
                placeholder="Coupon maxdiscountvalue"
                name="maxdiscountvalue"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please Add maxdiscountvalue",
              maxLength: {
                value: 10,
                message: "Cannot be longer than 12 characters",
              },
              pattern: {
                value: /^[1-9]\d*(\d+)?$/i,
                message: "only numbers are allowed",
              },
            }}
          />

          <br />
          <BottomButton
            type="submit"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(handleCouponsData)}
          >
            {cid ? "Update" : "Add"} Coupons
          </BottomButton>
          <BottomButton
            variant="contained"
            onClick={() => navigate("/coupons")}
          >
            Back
          </BottomButton>
        </form>
      </InputBox>
    </Container>
  );
}
