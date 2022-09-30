import { Box, Button, FormHelperText } from "@mui/material";
import React from "react";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  ContainerHead,
  MainBox,
  ScrollBox,
  CoustomMenuItem,
  FormText,
  InputField,
  SelectField,
  SelectionBox,
  SelectionImage,
  SelectionText,
  ImgBox,
  ImgSize,
  DelIcon,
  GridUi,
  BottomButton,
} from "./settings.style";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerListData, fetchCategoryDataList } from "../../js/actions";
import { ENDPOINTURLFORIMG, listBody } from "../../utils/Helper";
import { useForm, Controller } from "react-hook-form";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteIcon from "@mui/icons-material/Delete";
import DragDrop from "../DragDrop";
import { bannerAddHandler } from "../../service/Auth.Service";

const Settings = (props) => {
  const [addSection, setAddSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const bannerList = useSelector((state) => state.bannerImages.list);
  const categorySelectionList = useSelector((state) => state.categoryList.list);
  useEffect(() => {
    bannerListData();
    categoryListData();
  }, []);
  const categoryListData = async () => {
    try {
      dispatch(fetchCategoryDataList(listBody({ perPage: 1000 })));
    } catch (err) {
      alert(err);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      setValue("Img", file);
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages(e.target.result);
      };
      reader.readAsDataURL(file);
      return file;
    }); // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  const bannerListData = () => {
    try {
      dispatch(fetchBannerListData(listBody({ perPage: 1000 })));
    } catch (err) {
      alert(err);
    }
  };
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      name: null,
      description: null,
      Img: null,
      categoryId: null,
    },
  });

  const save = async (payload) => {
    const response = await bannerAddHandler(payload);
    try {
      if (response.success) {
        setLoading(false);
        setAddSection(false);
        setImages(null);
        try {
          dispatch(fetchBannerListData(listBody({ perPage: 1000 })));
        } catch (err) {
          alert(err);
        }
        reset({
          name: null,
          description: null,
          Img: null,
          categoryId: null,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const submitBannerData = async (body) => {
    setLoading(true);
    let reader = new FileReader();
    reader.readAsDataURL(body.Img);
    reader.onload = () => {
      reader.result;
      const reqBody = {
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
        Img: reader.result,
      };
      save(reqBody);
    };
  };
  return (
    <>
      <Container>
        <BreadcrumbArea />
      </Container>

      <MainBox>
        <ContainerHead variant="h5">Banner Images</ContainerHead>

        {addSection ? (
          <Box sx={{ width: "50%" }}>
            <FormText variant="subtitle2">Banner Name</FormText>
            <Controller
              name="name"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="name"
                  placeholder="Banner Name"
                  name="name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ? error.message : ""}
                />
              )}
              control={control}
              rules={{
                required: "Please Add Banner name",
                maxLength: {
                  value: 100,
                  message: "Cannot be longer than 100 characters",
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
            <FormText variant="subtitle2">Banner Category</FormText>
            <Controller
              name="categoryId"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <SelectField
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="categoryId"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ? error.message : ""}
                  >
                    {categorySelectionList?.map((card) => {
                      return (
                        <CoustomMenuItem
                          key={card?.BreadcrumbAreakey}
                          value={card._id}
                        >
                          <SelectionBox contasiner>
                            <SelectionImage
                              variant="rounded"
                              alt="Product image"
                              src={ENDPOINTURLFORIMG + card.categoryImg}
                            />
                            <SelectionText>{card.categoryName}</SelectionText>
                          </SelectionBox>
                        </CoustomMenuItem>
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
                required: "Select one Category",
              }}
            />
            <FormText variant="subtitle2">Banner Description</FormText>
            <Controller
              name="description"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="description"
                  placeholder="Banner Description"
                  name="description"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ? error.message : ""}
                />
              )}
              control={control}
              rules={{
                required: "Please Add Banner description",
                maxLength: {
                  value: 100,
                  message: "Cannot be longer than 100 characters",
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
            <FormText variant="subtitle2">Banner Image</FormText>
            <ImgBox>
              <Controller
                name="Img"
                render={({ field: { value }, fieldState: { error } }) => (
                  <>
                    {images == null ? (
                      <Box>
                        <FormHelperText error={error}>
                          {error?.message ? error.message : ""}
                        </FormHelperText>
                        <GridUi container spacing={2}>
                          {value == null ? (
                            <GridUi item xs={12}>
                              <DragDrop onDrop={onDrop} accept={"image/*"} />
                            </GridUi>
                          ) : (
                            <></>
                          )}
                          <GridUi item xs={12}>
                            {value !== null ? (
                              <>
                                <ImgSize component="img" src={value} alt="" />
                              </>
                            ) : (
                              <></>
                            )}
                            {value !== null ? (
                              <>
                                <DelIcon
                                  onClick={() => setValue("Img", null)}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </GridUi>
                        </GridUi>
                      </Box>
                    ) : (
                      <>
                        <GridUi container spacing={2}>
                          <GridUi item xs={6}>
                            {images == null ? (
                              <DragDrop onDrop={onDrop} accept={"image/*"} />
                            ) : (
                              <></>
                            )}
                          </GridUi>
                          <GridUi item xs={12}>
                            <ImgSize component="img" src={images} alt="" />
                            {images !== null ? (
                              <>
                                <DelIcon
                                  onClick={() => [
                                    setImages(null),
                                    setValue("Img", null),
                                  ]}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </GridUi>
                        </GridUi>
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
          </Box>
        ) : (
          <></>
        )}
        {!addSection ? (
          <BottomButton
            variant="contained"
            endIcon={<AddCardIcon />}
            onClick={() => setAddSection(true)}
          >
            Add Banner
          </BottomButton>
        ) : (
          <></>
        )}
        {addSection ? (
          <BottomButton
            type="submit"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(submitBannerData)}
            endIcon={<AddCardIcon />}
          >
            Add Banner
          </BottomButton>
        ) : (
          <></>
        )}

        <ScrollBox>
          {bannerList.map((item) => (
            <ImageListItem key={item.img} cols={2}>
              <img
                src={item.Img}
                alt={item.name}
                style={{
                  width: "400px",
                  borderRadius: "10px",
                  margin: "10px",
                  boxShadow:
                    "rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px",
                }}
              />
              <ImageListItemBar
                style={{
                  width: "400px",
                  marginLeft: "10px",
                  borderRadius: "10px",
                }}
                title={item.name}
                subtitle={item?.categoryId?.categoryName}
                actionIcon={
                  <IconButton aria-label={`info about ${item.name}`}>
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ScrollBox>
      </MainBox>
    </>
  );
};

export default Settings;
