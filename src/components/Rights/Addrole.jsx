import React, { useEffect, useState } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  // categoryEditHandler,
  categoryHndlerData,
  // categoryAddHandler,
} from "../../service/Auth.Service";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import { Container, InputBox, BottomButton } from "./Rights.style";
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
import Chip from "@mui/material/Chip";
// import { IndeterminateCheckBox } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

function createData(name, view, edit, add, deleted, id) {
  return { name, view, edit, add, deleted, id };
}

const rows = [
  createData("Dashboard", false, false, false, false, 0),
  createData("Products", false, false, false, false, 1),
  createData("Category", false, false, false, false, 2),
  createData("Customers", false, false, false, false, 3),
  createData("Orders", false, false, false, false, 4),
  createData("Coupons", false, false, false, false, 5),
  createData("Staff", false, false, false, false, 6),
];

export default function AddRights(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const [show, setShow] = useState();
  const navigate = useNavigate();
  const [rightList, setRightList] = useState(rows);

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

    // eslint-disable-next-line
  }, [search]);

  const handleChange = (field, value, index) => {
    rightList[index][field] = value;
    setRightList(rightList);
    console.log("FINALLIST", rightList);
    setShow();
  };
  const allhandleChange = (value, index) => {
    let tempData = rightList[index];
    tempData = {
      ...tempData,
      add: value,
      deleted: value,
      edit: value,
      view: value,
    };
    rightList[index] = tempData;
    setRightList(rightList);
    console.log("FINALLIST", rightList);
    setShow();
  };
  // console.log("FINALLIST", rightList);
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

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      categoryName: null,
      categoryImg: null,
    },
  });

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
                {rightList?.map((row) => (
                  <TableRow
                    key={`tableRow_${row.id}`}
                    onMouseOver={() => setShow(row.id)}
                    onMouseOut={() => setShow()}
                  >
                    <TableCell width="50%">
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          {row.name}
                        </Grid>
                        <Grid item xs={8}>
                          {show === row.id ? (
                            <Box key={row.id}>
                              <Chip
                                onClick={() => allhandleChange(true, row.id)}
                                size="small"
                                label="All Check"
                                variant="outlined"
                              />
                              <Chip
                                onClick={(e) => allhandleChange(false, row.id)}
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
                        onChange={(e) =>
                          handleChange("view", e.target.checked, row.id)
                        }
                        color="default"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.edit}
                        name={row.name}
                        value={row.edit}
                        onChange={(e) =>
                          handleChange("edit", e.target.checked, row.id)
                        }
                        color="default"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.add}
                        name={row.name}
                        value={row.add}
                        onChange={(e) =>
                          handleChange("add", e.target.checked, row.id)
                        }
                        color="default"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.deleted}
                        name={row.name}
                        value={row.deleted}
                        onChange={(e) =>
                          handleChange("deleted", e.target.checked, row.id)
                        }
                        color="default"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          <BottomButton variant="contained" onClick={() => navigate("/rights")}>
            Back
          </BottomButton>
        </form>
      </InputBox>
    </Container>
  );
}
