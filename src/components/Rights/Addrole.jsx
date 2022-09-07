import React, { useEffect, useState } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  rightsHandler,
  rightsHandlerData,
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
// import { fetchCategoryList } from "../../js/actions";
// import { useDispatch } from "react-redux";
// import { listBody } from "../../utils/Helper";
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
import { roleHandler } from "../../service/Auth.Service";
import { listBody } from "../../utils/Helper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function createData(name, view, edit, add, deleted) {
  return { name, view, edit, add, deleted };
}
const rows = [
  createData("Dashboard", false, false, false, false),
  createData("Products", false, false, false, false),
  createData("Category", false, false, false, false),
  createData("Customers", false, false, false, false),
  createData("Orders", false, false, false, false),
  createData("Coupons", false, false, false, false),
  createData("Staff", false, false, false, false),
];
export default function AddRights(props) {
  const [cid, setcid] = useState();
  const [roleId, setRoleId] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const [show, setShow] = useState();
  const navigate = useNavigate();
  const [rightList, setRightList] = useState(rows);
  const [roleList, setRoleList] = useState([]);
  const dispatch = useDispatch();
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

    setcid(roleId);
    roleListData(roleId);
  }, [search]);

  // const setDataHandler = (data) => {
  //   console.log("Data", data);
  //   setRightList(data);
  // };

  // const setDataHandler = useCallback(
  //   (data) => {
  //     setRightList(data ? data : rows);
  //   },
  //   [rightList]
  // );

  const handleChange = (field, value, index) => {
    rightList[index][field] = value;
    setRightList(rightList);
  };
  const allhandleChange = (field, value, index) => {
    console.log(field);
    let tempData = rightList[index];
    tempData = {
      view: value,
      edit: value,
      deleted: value,
      add: value,
    };
    rightList[index] = tempData;
    setRightList(rightList);
  };

  const roleListData = async (roleId) => {
    if (!roleId) {
      try {
        const response = await roleHandler(
          listBody({ where: { taken: false }, perPage: 1000 })
        );

        if (response.success) {
          setRoleList(response?.list);
        } else {
          setRoleList([]);
        }
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const response = await roleHandler(
          listBody({ where: null, perPage: 1000 })
        );
        const responses = await rightsHandlerData(
          listBody({ where: { roleId: roleId }, perPage: 1000 })
        );

        if (response.success) {
          setRoleList(response?.list);
          reset({ roleId: response?.list[0]._id });
          setRightList(responses.list[0].rights);
          setRoleId(responses.list[0]._id);
        } else {
          setRoleList([]);
        }
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
          rights: rightList,
          taken: true,
        };
        console.log("updatedlist", rightList);
        const response = await rightsHandler(reqbody);

        if (response.success) {
          setLoading(false);
          // navigate("/rights");
        }
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const reqbody = {
          rights: rightList,
        };
        console.log("updatedlist", rightList);
        const response = await rightsupdateHandlerData(roleId, reqbody);

        if (response.success) {
          setLoading(false);
          // navigate("/rights");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      roleId: null,
    },
  });

  return (
    <Container>
      <BreadcrumbArea />
      <InputBox>
        <form>
          <Typography color="text.primary" variant="subtitle2">
            Role Name
          </Typography>

          <Controller
            name="roleId"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth>
                <SelectField
                  id="roleId"
                  onChange={onChange}
                  value={value}
                  fullWidth
                  placeholder="Coupon type"
                >
                  {roleList.map((card) => {
                    return (
                      <MenuItem key={card._id} value={card._id}>
                        {card.roleName}
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
              required: "Select one role",
            }}
          />
          <br />
          <Typography color="text.primary" variant="subtitle2">
            Role Rights
          </Typography>
          <br />
          <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
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
                {console.log("rightList", rightList)}
                {rightList.map((row, index) => (
                  <TableRow key={`tableRow_${index}`}>
                    <TableCell width="50%">
                      <Grid
                        container
                        spacing={2}
                        // onMouseOver={() => (
                        //   setShow(row.id), console.log("OVER")

                        // )}
                        // onMouseOut={() => (setShow(), console.log("OUT"))}
                      >
                        <Grid item xs={4}>
                          {row.name}
                        </Grid>
                        <Grid item xs={7}>
                          {/* {show === row.id ? ( */}
                          <Box key={index}>
                            <Allcheck
                              onClick={() => allhandleChange(row, true, index)}
                              size="small"
                              label="All Check"
                              variant="outlined"
                            />
                            <Allcheck
                              onClick={() => allhandleChange(row, false, index)}
                              size="small"
                              label="None"
                              variant="outlined"
                            />
                          </Box>
                          {/* ) : (
                            <></>
                          )} */}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.view}
                        name={row.name}
                        value={row.view}
                        onChange={(e) =>
                          handleChange("view", e.target.checked, index, row)
                        }
                        color="secondary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.edit}
                        name={row.name}
                        value={row.edit}
                        onChange={(e) =>
                          handleChange("edit", e.target.checked, index, row)
                        }
                        color="secondary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.add}
                        name={row.name}
                        value={row.add}
                        onChange={(e) =>
                          handleChange("add", e.target.checked, index, row)
                        }
                        color="secondary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.deleted}
                        name={row.name}
                        value={row.deleted}
                        onChange={(e) =>
                          handleChange("deleted", e.target.checked, index, row)
                        }
                        color="secondary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <BottomButton
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(rightsData)}
          >
            {cid ? "Update" : "Add"} Rights
          </BottomButton>
          <BottomButton variant="contained" onClick={() => navigate("/rights")}>
            Back
          </BottomButton>
        </form>
      </InputBox>
    </Container>
  );
}
