import Card from "@mui/material/Card";
import { styled, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TuneIcon from "@mui/icons-material/Tune";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Doughnut, Line } from "react-chartjs-2";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

export const DoughnutSize = styled(Doughnut)(({ theme }) => ({
  display: "block",
  boxSizing: "border-box",
  height: "293px",
  width: "438px",
  maxHeight: "293px",
}));
export const ProductChartSize = styled(Line)(({ theme }) => ({
  display: "block",
  boxSizing: "border-box",
  height: "267px",
  width: "638px",
  maxHeight: "267px",
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
  marginBottom: 5,
}));

export const ContainerTwo = styled(Grid)(({ theme }) => ({
  marginTop: 2,
}));
export const StockBox = styled(Grid)(({ theme }) => ({
  background: "#ffffff",
  padding: ["6px", "8px"],
  borderRadius: ["10px", "63ox"],
  justifyContent: "center",
  alignItems: "center",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  marginTop: 5,
}));
export const CustomIcon = styled(TuneIcon)(({ theme }) => ({
  marginTop: 10,
}));

export const TabMain = styled(Tabs)(({ theme }) => ({
  paddingTop: 7,
  fontSize: 12,
}));
export const TabButtons = styled(Tab)(({ theme }) => ({
  color: "#1A1A40",
  fontFamily: "Public Sans",
  textTransform: " capitalize",
  fontWeight: 600,
}));
export const BorderALinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 5,
  marginBottom: 8,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.custom.color,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.custom.success,
  },
}));

export const BorderBLinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 5,
  marginBottom: 8,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.custom.color,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.custom.warning,
  },
}));
export const BorderCLinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 5,
  marginBottom: 8,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.custom.color,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.custom.info,
  },
}));
export const BorderDLinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 5,
  marginBottom: 8,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.custom.color,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.custom.error,
  },
}));

export const ShowButton = styled(Button)(({ theme }) => ({
  fontFamily: "Public Sans",
  textTransform: " capitalize",
  marginTop: "14px",
  marginLeft: "77%",
}));
export const OrderTrackingText = styled(Typography)(({ theme }) => ({
  fontFamily: "Public Sans",
  textTransform: " capitalize",
  fontSize: 15,
}));
export const ShowButtonText = styled(Typography)(({ theme }) => ({
  fontFamily: "Public Sans",
  textTransform: " capitalize",
  fontSize: 14,
}));
export const CardThree = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "26px",
  lineHeight: 1.57143,
  marginBottom: 5,
  color: theme.palette.primary.main,
}));
