import Card from '@mui/material/Card';
import {
    styled,
} from "@mui/material";
export const CardFrist = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: 20,
    fontFamily: theme.typography.fontFamily,
    borderRadius: 15,
    margin:5
}));
export const MainBody = styled(Card)(({ theme }) => ({
    padding: 10,
    boxShadow: "none"
}));