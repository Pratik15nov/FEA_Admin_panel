import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DragDrop from "../DragDrop";
import {
  productEditHandlerdata,
  ProductDataHndlerData,
  productAddHandler,
  categoryHandlerData,
} from "../../service/Auth.Service";
import { ENDPOINTURLFORIMG, listBody } from "../../utils/Helper";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Container,
  InputBox,
  ImgBox,
  ImgSize,
  DelIcon,
  InputField,
  BottomButton,
  SelectField,
} from "./Products.style";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { fetchProductList } from "../../js/actions";
import { useDispatch } from "react-redux";

export default function AddProducts(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [file, setFile] = useState(null);
  const [apiImg, setApiImg] = useState(null);
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const dispatch = useDispatch();

  //use for images manually upload and drop
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      setFile(file);
      setValue("img", file);
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages(e.target.result);
      };
      reader.readAsDataURL(file);
      return file;
    }); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let productId;
    try {
      if (search.split("=").length > 0) {
        productId = search.split("=")[1];
      } else {
        productId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (search.split("=").length > 0) {
        productId = search.split("=")[1];
      } else {
        productId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (productId) {
        ProductData(productId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(productId);
    categoryListData();
    // eslint-disable-next-line
  }, [search]);

  const categoryListData = async () => {
    try {
      const response = await categoryHandlerData(listBody({ perPage: 1000 }));

      if (response.success) {
        setCategoryList(response?.list);
      } else {
        setCategoryList([]);
      }
    } catch (err) {
      alert(err);
    }
  };

  const ProductData = async (productId) => {
    const response = await ProductDataHndlerData(productId);
    setApiImg(response.img);
    try {
      if (response) {
        reset({
          name: response.name,
          specification: response.specification,
          quantity: response.quantity,
          price: response.price,
          discountPrice: response.discountPrice,
          img: response.img,
          categoryId: response.categoryId,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      name: null,
      specification: null,
      quantity: null,
      price: null,
      discountPrice: null,
      img: null,
      categoryId: null,
    },
  });

  // it can be use for edit categories details
  const handleProductData = async (body) => {
    setLoading(true);
    try {
      if (cid) {
        let reqBody;
        try {
          if (file !== null) {
            reqBody = new FormData(); //  if passing an image or file with all data use reBody
            reqBody.append("name", body.name);
            reqBody.append("specification", body.specification);
            reqBody.append("quantity", body.quantity);
            reqBody.append("price", body.price);
            reqBody.append("discountPrice", body.discountPrice);
            reqBody.append("categoryId", body.categoryId);
            reqBody.append("productImg", file);
          } else {
            // if not passing any imge or file pass  data normally like Body
            reqBody = {
              name: body.name,
              specification: body.specification,
              quantity: body.quantity,
              price: body.price,
              discountPrice: body.discountPrice,
              productImg: apiImg,
              categoryId: body.categoryId,
            };
          }
        } catch (error) {
          alert(error);
        }
        const response = await productEditHandlerdata(cid, reqBody);
        try {
          if (response.success) {
            navigate(`/products`);
            dispatch(
              fetchProductList(listBody({ where: null, perPage: 10, page: 1 }))
            );
            setLoading(false);
            props.getValue(true, `${response.message}`);
          }
        } catch (error) {
          alert(error);
        }
      } else {
        const reqBody = new FormData();
        reqBody.append("name", body.name);
        reqBody.append("specification", body.specification);
        reqBody.append("quantity", body.quantity);
        reqBody.append("price", body.price);
        reqBody.append("discountPrice", body.discountPrice);
        reqBody.append("productImg", file);
        reqBody.append("categoryId", body.categoryId);

        const response = await productAddHandler(reqBody);
        try {
          if (response.success) {
            navigate(`/products`);
            dispatch(
              fetchProductList(listBody({ where: null, perPage: 10, page: 1 }))
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
      <Grid container sx={{ paddingBottom: "20px" }}>
        <BreadcrumbArea />
      </Grid>

      <Grid container>
        <InputBox item xs={6} md={6}>
          <Typography variant="h3" gutterBottom>
            Add your Product and necessary information from here
          </Typography>
          <Typography color="text.primary" variant="subtitle2">
            Product Name
          </Typography>
          <Controller
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputField
                margin="normal"
                fullWidth
                id="name"
                placeholder="Product Name"
                name="name"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please Add product name",
              maxLength: {
                value: 12,
                message: "Cannot be longer than 12 characters",
              },
              pattern: {
                value: /\S/,
                message: "Only words are allowed",
              },
              minLength: {
                value: 4,
                message: "Cannot be smaller than 4 characters",
              },
            }}
          />
          <Typography color="text.primary" variant="subtitle2">
            Product Category
          </Typography>
          <Controller
            name="categoryId"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth>
                <SelectField
                  labelId="demo-simple-select-label"
                  id="categoryId"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                >
                  {categoryList.map((card) => {
                    return (
                      <MenuItem key={card.BreadcrumbAreakey} value={card._id}>
                        {card.categoryName}
                      </MenuItem>
                    );
                  })}
                </SelectField>
                <FormHelperText error={error}>
                  {error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
            control={control}
            rules={{
              required: "Select one Category",
            }}
          />
          <Typography color="text.primary" variant="subtitle2">
            Product Specification
          </Typography>
          <Controller
            name="specification"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputField
                margin="normal"
                fullWidth
                id="specification"
                placeholder="Specification"
                name="specification"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please Add Specification",
              maxLength: {
                value: 12,
                message: "Cannot be longer than 12 characters",
              },
              pattern: {
                value: /\S/,
                message: "Only words are allowed",
              },
              minLength: {
                value: 4,
                message: "Cannot be smaller than 4 characters",
              },
            }}
          />
          <Typography color="text.primary" variant="subtitle2">
            Product Quantity
          </Typography>
          <Controller
            name="quantity"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputField
                margin="normal"
                fullWidth
                id="quantity"
                placeholder="Quantity"
                name="quantity"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please Add Quantity",
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
            Product Price {"(Rs)"}
          </Typography>
          <Controller
            name="price"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputField
                margin="normal"
                fullWidth
                id="price"
                placeholder="Price"
                name="price"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please Add Price",
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
        </InputBox>
        <InputBox item xs={6} md={5}>
          <Typography color="text.primary" variant="subtitle2">
            Discount Price {"(Rs)"}
          </Typography>
          <Controller
            name="discountPrice"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputField
                margin="normal"
                fullWidth
                id="discountPrice"
                placeholder="Discount Price"
                name="discountPrice"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please Add Discount Price",
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
            Product Image
          </Typography>
          <ImgBox>
            <Controller
              name="img"
              render={({ field: { value }, fieldState: { error } }) => (
                <>
                  {images == null ? (
                    <Box>
                      <FormHelperText error={error}>
                        {error?.message ?? ""}
                      </FormHelperText>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <DragDrop onDrop={onDrop} accept={"image/*"} />
                        </Grid>
                        <Grid item xs={5}>
                          {value !== null ? (
                            <>
                              <ImgSize
                                component="img"
                                src={ENDPOINTURLFORIMG + value}
                                alt=""
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                          {value !== null ? (
                            <>
                              <DelIcon onClick={() => setValue("img", null)} />
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  ) : (
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <DragDrop onDrop={onDrop} accept={"image/*"} />
                        </Grid>
                        <Grid item xs={5}>
                          <ImgSize component="img" src={images} alt="" />
                        </Grid>
                        <Grid item xs={1}>
                          {images !== null ? (
                            <>
                              <DelIcon
                                onClick={() => [
                                  setImages(null),
                                  setValue("img", null),
                                ]}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
                </>
              )}
              control={control}
              rules={{
                required: {
                  value: " ",
                  message: "Upload one image",
                },
              }}
            />
          </ImgBox>
          <br />
          <BottomButton
            type="submit"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(handleProductData)}
          >
            {cid ? "Update" : "Add"} Product
          </BottomButton>
          <BottomButton
            variant="contained"
            onClick={() => navigate("/products")}
          >
            Back
          </BottomButton>
        </InputBox>
      </Grid>
    </Container>
  );
}
