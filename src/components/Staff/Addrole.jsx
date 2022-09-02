import React, { useEffect, useState } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  categoryEditHandler,
  categoryHndlerData,
  categoryAddHandler,
} from "../../service/Auth.Service";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import { Container, InputBox, BottomButton } from "./Staff.style";
import { fetchCategoryList } from "../../js/actions";
import { useDispatch } from "react-redux";
import { listBody } from "../../utils/Helper";
import { Checkbox } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "./badge";

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

export default function AddRole(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [checkbox, setCheckbox] = useState([]);
  const [rightList, setRightList] = useState(rows);
  console.log("MAINDATA", checkbox);
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
    setCheckbox(rows);
    // eslint-disable-next-line
  }, [search]);

  const handleChange = (field, value, index) => {
    rightList[index][field] = value;

    // rows[index][field] = value;
    setRightList(rightList);
    // const { name, checked } = e?.target;

    // let data = checkbox.map(
    //   (checkboxdata) => console.log("checkboxdata", checkboxdata),
    //   console.log("name", name)

    // checkboxdata.name === name
    //   ? { ...checkboxdata, isChecked: !checked }
    //   : checkboxdata
    // );
    console.log("ROW NAME", rightList);
    // setCheckbox(data);
    // console.log("AFFER", data);
  };

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

  // this function used for after submit form create object and then update functionality this value change from api value
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      categoryName: null,
      categoryImg: null,
    },
  });

  // it can be use for edit categories details
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
                {rightList.map((row, index) => (
                  <TableRow key={index}>
                    <Badge
                      name="allSelect"
                      show={show}
                      row={row}
                      setShow={setShow}
                      onChange={handleChange}
                    />
                    <TableCell>
                      <Checkbox
                        name={row.name}
                        value={row.view}
                        onChange={(e) =>
                          handleChange("view", e.target.checked, index)
                        }
                        color="default"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        name={row.name}
                        value={row.edit}
                        onChange={(e) =>
                          handleChange("edit", e.target.checked, index)
                        }
                        color="default"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        name={row.name}
                        value={row.add}
                        onChange={(e) =>
                          handleChange("add", e.target.checked, index)
                        }
                        color="default"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        name={row.name}
                        value={row.deleted}
                        onChange={(e) =>
                          handleChange("deleted", e.target.checked, index)
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
          <BottomButton variant="contained" onClick={() => navigate("/staff")}>
            Back
          </BottomButton>
        </form>
      </InputBox>
    </Container>
  );
}
