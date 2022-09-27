import React, { useEffect, useState } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  rightsHandler,
  rightsupdateHandlerData,
} from "../../service/Auth.Service";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  InputBox,
  BottomButton,
  Allcheck,
  SelectField,
} from "./Rights.style";
import { Checkbox } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { listBody } from "../../utils/Helper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  fetchRightsList,
  fetchLayoutList,
  fetchEditRoleRights,
  fetchIfAddRoleRightsHandler,
} from "../../js/actions";

export default function AddRights(props) {
  const [cid, setcid] = useState(null);
  // const [rightId, setRightId] = useState(null);
  const location = useLocation();
  const { search, pathname } = location;
  const [loading, setLoading] = useState(false);
  const [skelloading, setSkelLoading] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const navigate = useNavigate();
  const [tableShow, setTableShow] = useState(false);
  // const [roleList, setRoleList] = useState([null]);

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      roleId: null,
      rights: [],
    },
  });

  const page = useSelector((state) => state.rights.page);
  const getLayoutList = useSelector((state) => state.getLayoutList.list);

  useEffect(() => {
    let roleId;
    try {
      if (search.length > 0) {
        roleId = search.split("=")[1];
        setcid(roleId);
        roleListData(roleId);
      } else {
        roleListData(roleId);
      }
    } catch (error) {
      alert(error);
    }
    menuListHandler();
  }, [search]);

  useEffect(() => {
    console.log(typeof cid);
    if (cid === null) {
      console.log("83");
      reset({
        roleId: null,
        rights: getLayoutList.map((card) => {
          return {
            name: card.fieldName[0].toUpperCase() + card.fieldName.substring(1),
            view: false,
            edit: false,
            add: false,
            deleted: false,
          };
        }),
      });
    }
  }, [getLayoutList, cid]);

  const reduxRoleList = useSelector((state) => state.role.list);

  const selectedRightList = useSelector(
    (state) => state.selectedRightList.list
  );

  useEffect(() => {
    try {
      if (selectedRightList && selectedRightList.length > 0) {
        console.log("107");

        console.log("selectedRightList", selectedRightList);
        reset({
          roleId: selectedRightList[0].roleId?._id,
          rights: selectedRightList[0].rights,
        });
      } else {
        console.log("HELLOW");
      }
    } catch (error) {
      alert(error);
    }
  }, [selectedRightList]);

  const menuListHandler = async () => {
    try {
      setSkelLoading(true);
      dispatch(
        fetchLayoutList(listBody({ where: { isActive: true }, perPage: 1000 }))
      );
      setSkelLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const roleListData = async (roleId) => {
    if (!roleId) {
      try {
        setSkelLoading(true);
        dispatch(
          fetchIfAddRoleRightsHandler(
            listBody({ where: { taken: false }, perPage: 1000 })
          )
        );
        setSkelLoading(false);
      } catch (err) {
        alert(err);
      }
    } else {
      setSkelLoading(true);
      try {
        dispatch(
          fetchEditRoleRights({
            roleList: listBody({ perPage: 1000 }),
            rightList: listBody({ where: { roleId: roleId }, perPage: 1000 }),
          })
        );

        setSkelLoading(false);
      } catch (err) {
        alert(err);
      }
    }
  };

  const rightsData = async (body) => {
    setLoading(true);
    if (!cid) {
      try {
        const reqbody = {
          roleId: body.roleId,
          rights: body.rights,
          taken: true,
        };
        const response = await rightsHandler(reqbody);
        if (response.success) {
          dispatch(
            fetchRightsList(listBody({ where: null, perPage: 10, page: page }))
          );
          setLoading(false);
          navigate("/rights");
        }
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const reqbody = {
          roleId: body.roleId,
          rights: body.rights,
          taken: true,
        };

        const response = await rightsupdateHandlerData(
          selectedRightList[0]?._id,
          reqbody
        );

        if (response.success) {
          setLoading(false);
          navigate("/rights");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <Container>
      <BreadcrumbArea />
      {skelloading ? (
        <InputBox>
          <form>
            <Skeleton animation="wave" height={25} width="30%" />
            <Skeleton animation="wave" height={70} width="100%" />

            <br />

            <>
              <Skeleton animation="wave" height={25} width="30%" />

              <br />
              <TableContainer component={Paper} sx={{ maxWidth: 720 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Skeleton animation="wave" height={25} width="30%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" height={25} width="100%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" height={25} width="100%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" height={25} width="100%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" height={25} width="100%" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                      <TableRow key={`tableRow_${index}`}>
                        <TableCell width="50%">
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Skeleton
                                animation="wave"
                                height={25}
                                width="100%"
                              />
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={25} width="50%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={25} width="50%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={25} width="50%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={25} width="50%" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          </form>
        </InputBox>
      ) : (
        <InputBox>
          <form>
            <Typography color="text.primary" variant="subtitle2">
              Role Name
            </Typography>

            <Controller
              name="roleId"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                setTableShow(value ? true : false);
                return (
                  <>
                    {cid ? (
                      <FormControl fullWidth disabled>
                        <SelectField
                          id="roleId"
                          onChange={setTableShow(true)}
                          value={value}
                          fullWidth
                          placeholder="Roletype"
                        >
                          {/* {roleList? */}
                          {reduxRoleList?.map((card) => {
                            return (
                              <MenuItem key={card._id} value={card._id}>
                                {card.roleName}
                              </MenuItem>
                            );
                          })}
                        </SelectField>
                        <FormHelperText error={error}>
                          {error?.message ? error.message : ""}
                        </FormHelperText>
                      </FormControl>
                    ) : (
                      <FormControl fullWidth>
                        <SelectField
                          id="roleId"
                          // onChange={[onChange(tableHandler(tr))]}
                          onChange={onChange}
                          value={value}
                          fullWidth
                          placeholder="Coupon type"
                        >
                          {/* {roleList. */}
                          {reduxRoleList?.map((card) => {
                            return (
                              <MenuItem key={card._id} value={card._id}>
                                {card.roleName}
                              </MenuItem>
                            );
                          })}
                        </SelectField>
                        <FormHelperText error={error}>
                          {error?.message ? error.message : ""}
                        </FormHelperText>
                      </FormControl>
                    )}
                  </>
                );
              }}
              control={control}
              rules={{
                required: "Select one role",
              }}
            />
            <br />

            {tableShow ? (
              <>
                <Typography color="text.primary" variant="subtitle2">
                  Role Rights
                </Typography>
                <br />
                <TableContainer component={Paper} sx={{ maxWidth: 720 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Choose</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Add</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Controller
                        name="rights"
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <>
                            {value?.map((row, index) => (
                              <TableRow key={`tableRow_${index}`}>
                                <TableCell
                                  width="50%"
                                  onMouseOver={() => setShow(index)}
                                  onMouseOut={() => setShow()}
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                      {row.name}
                                    </Grid>
                                    <Grid item xs={7}>
                                      {show === index ? (
                                        <Box key={index}>
                                          <Allcheck
                                            onClick={() => {
                                              let tempData = value[index];
                                              tempData = {
                                                name: row.name,
                                                view: true,
                                                edit: true,
                                                deleted: true,
                                                add: true,
                                              };
                                              value[index] = tempData;
                                              setValue(`rights`, value);
                                            }}
                                            size="small"
                                            label="All Check"
                                            variant="outlined"
                                          />
                                          <Allcheck
                                            onClick={() => {
                                              let tempData = value[index];
                                              tempData = {
                                                name: row.name,
                                                view: false,
                                                edit: false,
                                                deleted: false,
                                                add: false,
                                              };
                                              value[index] = tempData;
                                              setValue(`rights`, value);
                                            }}
                                            size="small"
                                            label="None"
                                            variant="outlined"
                                          />
                                        </Box>
                                      ) : (
                                        <></>
                                      )}
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    checked={row.view}
                                    name={row.name}
                                    value={row.view}
                                    onChange={(e) => {
                                      const updatedValue = value;
                                      updatedValue[index].view =
                                        e.target.checked;
                                      setValue(`rights`, updatedValue);
                                    }}
                                    color="secondary"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    checked={row.edit}
                                    name={row.name}
                                    value={row.edit}
                                    onChange={(e) => {
                                      const updatedValue = value;
                                      updatedValue[index].edit =
                                        e.target.checked;
                                      setValue(`rights`, updatedValue);
                                    }}
                                    color="secondary"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    checked={row.add}
                                    name={row.name}
                                    value={row.add}
                                    onChange={(e) => {
                                      const updatedValue = value;
                                      updatedValue[index].add =
                                        e.target.checked;
                                      setValue(`rights`, updatedValue);
                                    }}
                                    color="secondary"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    checked={row.deleted}
                                    name={row.name}
                                    value={row.deleted}
                                    onChange={(e) => {
                                      const updatedValue = value;
                                      updatedValue[index].deleted =
                                        e.target.checked;
                                      setValue(`rights`, updatedValue);
                                    }}
                                    color="secondary"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        )}
                        control={control}
                        rules={{
                          required: "Select one role",
                        }}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <></>
            )}
            <br />
            <BottomButton
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={handleSubmit(rightsData)}
            >
              {cid ? "Update" : "Add"} Rights
            </BottomButton>
            <BottomButton
              variant="contained"
              onClick={() => navigate("/rights")}
            >
              Back
            </BottomButton>
          </form>
        </InputBox>
      )}
    </Container>
  );
}
