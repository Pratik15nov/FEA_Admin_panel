import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import DragDrop from "../DragDrop";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  categoryEditHandler,
  categoryHndlerData,
  categoryAddHandler,
} from "../../service/Auth.Service";
import { ENDPOINTURLFORIMG } from "../../utils/Helper";
// import { useNavigate } from "react-router";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCategory(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      console.log(file);
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
    if (search.split("=").length > 0) {
      categoryId = search.split("=")[1];
    } else {
      categoryId = "";
    }
    if (categoryId) {
      getCategoryData(categoryId);
    }
    setcid(categoryId); // eslint-disable-next-line
  }, [search]);

  const getCategoryData = async (categoryId) => {
    const response = await categoryHndlerData(categoryId);

    if (response) {
      reset({
        categoryName: response.categoryName,
        categoryImg: response.categoryImg,
      });
    }
  };

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      categoryName: null,
      categoryImg: null,
    },
  });

  const handleCategoryAddData = async (body) => {
    setLoading(true);
    const reqBody = new FormData();
    reqBody.append("categoryName", body.categoryName);
    reqBody.append("categoryImg", file);

    const response = await categoryAddHandler(reqBody);
    if (response.success) {
      console.log(response.message);
      navigate(`/category`);
      setLoading(false);
      props.getValue(true, `${response.message}`);
    }
  };

  const handleCategoryEditData = async (body) => {
    setLoading(true);
    const reqBody = new FormData();
    reqBody.append("categoryName", body.categoryName);
    reqBody.append("categoryImg", file);

    const response = await categoryEditHandler(cid, reqBody);
    if (response.success) {
      navigate(`/category`);
      setLoading(false);
      props.getValue(true, `${response.message}`);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1">{cid ? "Edit" : "Add"} Category </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Box underline="hover" color="inherit">
            Category
          </Box>
          <Typography>Category List</Typography>
          <Typography color="text.primary">{cid ? "Edit" : "Add"} </Typography>
        </Breadcrumbs>
      </Box>
      <Typography color="text.primary" sx={{ padding: 2 }}>
        Add your Product category and necessary information from here
      </Typography>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "50%",
            boxShadow: `rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px`,
            padding: 2,
            borderRadius: 2,
          }}
        >
          <form>
            <Controller
              name="categoryName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
            <Box
              sx={{ p: 2, border: "1px dashed grey", justifyContent: "center" }}
            >
              <Controller
                name="categoryImg"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    {images == null ? (
                      <Box>
                        <DragDrop onDrop={onDrop} accept={"image/*"} />
                        {value !== null ? (
                          <>
                            <img src={ENDPOINTURLFORIMG + value} alt="" />
                            <DeleteIcon
                              onClick={() => setValue("categoryImg", null)}
                              sx={{ cursor: "pointer" }}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </Box>
                    ) : (
                      <>
                        <DragDrop onDrop={onDrop} accept={"image/*"} />
                        <img src={images} alt="" />
                        {images !== null ? (
                          <>
                            <DeleteIcon
                              onClick={() => [
                                setImages(null),
                                setValue("categoryImg", null),
                              ]}
                              sx={{ cursor: "pointer" }}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}
                control={control}
                rules={{
                  required: "Plz add category img",
                }}
              />
            </Box>

            <br />
            {cid ? (
              <LoadingButton
                type="submit"
                loading={loading}
                loadingPosition="end"
                variant="contained"
                onClick={handleSubmit(handleCategoryEditData)}
              >
                Update Category
              </LoadingButton>
            ) : (
              <LoadingButton
                type="submit"
                endIcon={<AddIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                onClick={handleSubmit(handleCategoryAddData)}
              >
                Add Category
              </LoadingButton>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
}
