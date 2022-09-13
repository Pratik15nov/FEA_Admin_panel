import {
  Box,
  Divider,
  styled,
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const DialogContainer = styled(Dialog)(({ theme }) => ({}));
export const CustomButton = styled(Button)(({ theme }) => ({
  cursor: "pointer",
  fontWeight: "bold",
  color: theme.palette.custom.color,
  "&:hover": {
    color: "#b7dfff",
  },
}));
export const Actions = styled(DialogActions)(({ theme }) => ({
  justifyContent:"space-between",
  background: "#1a1a40",
}));
export const ContentBox = styled(DialogContent)(({ theme }) => ({
  // background: "#b7dfff",
  background: "white",
}));
export const TitleBox = styled(DialogTitle)(({ theme }) => ({
  background: "#1a1a40",
  color: theme.palette.custom.color,
}));
export const TitleContainerBox = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0px",
}));
export const TitleTag = styled("div")(({ theme }) => ({
  fontWeight: "bold",
}));

export const ContentText = styled(DialogContentText)(({ theme }) => ({}));
export const MasterConatiner = styled(Box)(({ theme }) => ({
  color: "black",
}));

export const TopTextStyle = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
}));
export const CustomDivider = styled(Divider)(({ theme }) => ({
  marginTop: "5px",
  marginBottom: "5px",
}));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3c89c7",
    color: theme.palette.custom.color,
    fontWeight: "bold",
    fontSize: "12px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  width: "20%",
}));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//++++++++++TABLES++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const TableBox = styled(TableContainer)(({ theme }) => ({
  marginTop: "10px",
  marginBottom: "10px",
}));

export const TableTitleGrid = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "10px",
}));

export const TableArea = styled(Table)(({ theme }) => ({
  minWidth: 500,
}));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const RightBox = styled(Grid)(({ theme }) => ({
  //  display:"block",
  //  background:"white",
  //  borderRadius:"5px"
}));

export const BoxTable = styled(TableContainer)(({ theme }) => ({}));
export const TablePlot = styled(Table)(({ theme }) => ({
  minWidth: 100,
}));
export const BoxTableBody = styled(TableBody)(({ theme }) => ({}));
export const BoxTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": { border: 0 },
}));

export const BoxTableCell = styled(TableCell)(({ theme }) => ({}));
export const CancelIcon = styled(CancelOutlinedIcon)(({ theme }) => ({
  marginLeft: "10%",
  cursor: "pointer",
  fontSize: "xx-large",
  color: "red",
  "&:hover": {
    color: "#b7dfff",
  },
}));
