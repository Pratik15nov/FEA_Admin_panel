import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DragDrop from "../DragDrop";
import {
  productEditHandler,
  ProductDataHndlerData,
  productAddHandler,
} from "../../service/Auth.Service";
import { ENDPOINTURLFORIMG } from "../../utils/Helper";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  InputBox,
  ImgBox,
  ImgSize,
  DelIcon,
} from "./Products.style";

export default function AddProducts(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [file, setFile] = useState(null);
  const [apiImg, setApiImg] = useState(null);
  const navigate = useNavigate();

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
    // eslint-disable-next-line
  }, [search]);

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
            };
          }
        } catch (error) {
          alert(error);
        }
        const response = await productEditHandler(cid, reqBody);
        try {
          if (response.success) {
            navigate(`/products`);
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
        const response = await productAddHandler(reqBody);
        try {
          if (response.success) {
            // navigate(`/products`);
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
        Add your Product and necessary information from here
      </Typography>
      <InputBox>
        <form>
          <Controller
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
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
              required: "Please Add Product Name",
            }}
          />
          <Controller
            name="specification"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
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
            }}
          />
          <Controller
            name="quantity"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
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
            }}
          />
          <Controller
            name="price"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
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
            }}
          />
          <Controller
            name="discountPrice"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
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
            }}
          />
          <Typography color="text.primary" variant="caption" display="block">
            Product Images
          </Typography>
          <ImgBox>
            <Controller
              name="img"
              render={({ field: { value } }) => (
                <>
                  {images == null ? (
                    <Box>
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
                required: "Please add category img",
              }}
            />
          </ImgBox>
          <br />
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(handleProductData)}
          >
            {cid ? "Update" : "Add"} Product
          </LoadingButton>
        </form>
      </InputBox>
    </Container>
  );
}
