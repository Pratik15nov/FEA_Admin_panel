import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled, Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));

export const InputBox = styled(Box)(({ theme }) => ({
  width: "50%",
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;`,
  padding: 20,
  borderRadius: 5,
}));

export const ImgBox = styled(Box)(({ theme }) => ({
  padding: 20,
  border: "1px solid gray",
}));

export const ImgSize = styled(Box)(({ theme }) => ({
  height: 200,
  width: 200,
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
  borderRadius: 20,
}));

export const DelIcon = styled(DeleteIcon)(({ theme }) => ({
  padding: 6,
  boxShadow: `rgb(0 0 0 / 10%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px;`,
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.custom.error, 1),
  cursor: "pointer",
}));
