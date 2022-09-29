import Card from "@mui/material/Card";
import { styled, Button, TableCell, Box } from "@mui/material";
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
  backgroundColor: theme.palette.background.default,
}));

export const CardOne = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "2rem",
  lineHeight: 1.5,
  color: theme.palette.fontColor.first,
}));

export const CardTwo = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: 1.57143,
  marginBottom: 5,
  color: theme.palette.fontColor.first,
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
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
  color: theme.palette.fontColor.first,
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
  color: theme.palette.fontColor.first,
  // marginLeft: "80%",
}));
export const OrderTrackingText = styled(Typography)(({ theme }) => ({
  fontFamily: "Public Sans",
  textTransform: " capitalize",
  fontSize: 15,
  color: theme.palette.fontColor.first,
}));
export const ShowButtonText = styled(Typography)(({ theme }) => ({
  fontFamily: "Public Sans",
  textTransform: " capitalize",
  fontSize: 11,
}));
export const CardThree = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 800,
  fontSize: "28px",
  lineHeight: 1.57143,
  marginBottom: 5,
  color: "#103c01",
}));
export const IncomeCard = styled(Card)(({ theme }) => ({
  padding: 5,
  fontFamily: theme.typography.fontFamily,
  borderRadius: 10,
  margin: 10,
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
  background: "#c3f7c3",
  color: "green",
}));
export const ExpensesCard = styled(Card)(({ theme }) => ({
  padding: 5,
  fontFamily: theme.typography.fontFamily,
  borderRadius: 10,
  margin: 10,
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
  background: "#ffb6b6",
  color: "green",
}));
export const CardFour = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 800,
  fontSize: "28px",
  lineHeight: 1.57143,
  marginBottom: 5,
  color: "#760000;",
}));

export const TableCellA = styled(TableCell)(({ theme }) => ({
  background: "aliceblue",
  borderTopLeftRadius: "15px",
  borderBottomLeftRadius: "15px",
  borderBottom: "none",
}));
export const TableCellB = styled(TableCell)(({ theme }) => ({
  background: "aliceblue",
  borderBottom: "none",
}));
export const TableCellC = styled(TableCell)(({ theme }) => ({
  background: "aliceblue",
  borderTopRightRadius: "15px",
  borderBottomRightRadius: "15px",
  borderBottom: "none",
}));
export const TableCellD = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  color: theme.palette.fontColor.first,
}));
export const ProductsText = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  textDecoration: "line-through",
}));
export const CardFive = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: 1.57143,
  marginBottom: 5,
  color: theme.palette.secondary.main,
}));
export const ScrollBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "148px",
  overflow: "hidden",
  overflowY: "scroll",
  "::-webkit-scrollbar": { width: "10px" },
  "::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: 10,
  },
  "::-webkit-scrollbar-thumb": { background: "#888", borderRadius: 10 },
  "::-webkit-scrollbar-thumb:hover": { background: "#555" },
}));
