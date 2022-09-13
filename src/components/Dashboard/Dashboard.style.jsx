import Card from "@mui/material/Card";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const CardFrist = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: 5,
  fontFamily: theme.typography.fontFamily,
  borderRadius: 10,
  margin: 10,
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
}));
export const MainBody = styled(Card)(({ theme }) => ({
  padding: 10,
  boxShadow: "none",
}));

export const CardOne = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "2rem",
  lineHeight: 1.5,
}));

export const CardTwo = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "0.875rem",
  lineHeight: 1.57143,
}));

export const ContainerTwo = styled(Grid)(({ theme }) => ({
 marginTop: 2
}));
