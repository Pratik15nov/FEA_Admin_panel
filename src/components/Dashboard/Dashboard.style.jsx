import Card from "@mui/material/Card";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TuneIcon from "@mui/icons-material/Tune";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Doughnut, Line } from "react-chartjs-2";

export const DoughnutSize = styled(Doughnut)(({ theme }) => ({
  maxHeight: 375,
}));
export const ProductChartSize = styled(Line)(({ theme }) => ({
  maxHeight: 335,
}));

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
  marginTop: 2,
}));
export const CustomIcon = styled(TuneIcon)(({ theme }) => ({
  marginTop: 10,
}));

export const TabMain = styled(Tabs)(({ theme }) => ({
  paddingTop: 7,
}));
export const TabButtons = styled(Tab)(({ theme }) => ({
  color: "#1A1A40",
  fontFamily: "Public Sans",
  textTransform: " capitalize",
  fontWeight: 600,
}));
