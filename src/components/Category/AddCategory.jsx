import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DragDrop from "../DragDrop";
import {
  categoryEditHandler,
  categoryHndlerData,
  categoryAddHandler,
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
} from "./Category.style";

export default function AddCategory(props) {
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
      setValue("categoryImg", file);
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages(e.target.result);
      };
      reader.readAsDataURL(file);
      return file;
    }); // eslint-disable-next-line
  }, []);

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
        getCategoryData(categoryId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(categoryId);
    // eslint-disable-next-line
  }, [search]);

  // this function get particular category name and image
  const getCategoryData = async (categoryId) => {
    const response = await categoryHndlerData(categoryId);
    setApiImg(response.categoryImg);
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
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      categoryName: null,
      categoryImg: null,
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
            setLoading(false);
            props.getValue(true, `${response.message}`);
          }
        } catch (error) {
          alert(error);
        }
      } else {
        const reqBody = new FormData();
        reqBody.append("categoryName", body.categoryName);
        reqBody.append("categoryImg", file);
        const response = await categoryAddHandler(reqBody);
        try {
          if (response.success) {
            navigate(`/category`);
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
        Add your Product category and necessary information from here
      </Typography>
      <InputBox>
        <form>
          <Controller
            name="categoryName"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="categoryName"
                placeholder="Category Name"
                name="categoryName"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            )}
            control={control}
            rules={{
              required: "Please add category name",
            }}
          />
          <Typography color="text.primary" variant="caption" display="block">
            Category Images
          </Typography>
          <ImgBox>
            <Controller
              name="categoryImg"
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
                              <DelIcon
                                onClick={() => setValue("categoryImg", null)}
                              />
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
                                  setValue("categoryImg", null),
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
            onClick={handleSubmit(handleCategoryData)}
          >
            {cid ? "Update" : "Add"} Category
          </LoadingButton>
        </form>
      </InputBox>
    </Container>
  );
}
