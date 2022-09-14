import { styled, Box, Grid, TextField,Select } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));

export const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "1em",
  },
  marginTop: 10,
  marginBottom: 10,
  // height: "1em",
}));

export const InputBox = styled(Grid)(({ theme }) => ({
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;`,
  padding: 25,
  borderRadius: 10,
  marginRight: 20,
}));

export const BottomButton = styled(LoadingButton)(({ theme }) => ({
  marginRight: 20,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  textTransform: "capitalize",
}));
export const SelectField = styled(Select)(({ theme }) => ({
    "& .MuiOutlinedInput-input": {
      height: "1em",
    },
    marginTop: 10,
    marginBottom: 10,
  }));

  export const ImgBox = styled(Box)(({ theme }) => ({
    padding: 20,
    border: "1px solid #c4c4c4",
    borderRadius: 5,
  }));

  export const ImgSize = styled(Box)(({ theme }) => ({
    height: 200,
    width: 200,
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
    borderRadius: 10,
  }));

  export const DelIcon = styled(DeleteIcon)(({ theme }) => ({
    padding: 4,
    boxShadow: `rgb(0 0 0 / 10%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px;`,
    borderRadius: 50,
    backgroundColor: alpha(theme.palette.custom.error, 1),
    cursor: "pointer",
    fontSize: 20,
    color: theme.palette.custom.color,
    marginBottom: 170,
    marginLeft: 10,
  }));
  
  