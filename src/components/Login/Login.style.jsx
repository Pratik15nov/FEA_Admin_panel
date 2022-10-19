import { Avatar, Box, styled } from "@mui/material";
import Link from "@mui/material/Link";
import { LoadingButton } from "@mui/lab";

export const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  marginTop: "120px",

  [theme.breakpoints.down("md")]: {
    display: "block",
    margin: "30px",
  },
  [theme.breakpoints.up("md")]: {
    display: "grid",
  },
  [theme.breakpoints.up("lg")]: {
    display: "grid",
  },
}));

export const SideImage = styled(Box)(({ theme }) => ({
  paddingLeft: "20px",
  [theme.breakpoints.down("md")]: { display: "none" },
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));
export const LoginSide = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  margin: "5px",
  backgroundColor: theme.palette.primary.main,
  padding: "15px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  marginBottom: 15,
}));

export const LinkBox = styled(Link)(({ theme }) => ({
  cursor: "pointer",
  textDecoration: "none",
}));

export const ButtonLoading = styled(LoadingButton)(({ theme }) => ({
  cursor: "pointer",
  textDecoration: "none",
  marginTop: 5,
  marginBottom: 5,
  width: "100%",
}));
