import { Avatar, Box, styled } from "@mui/material";
import Link from "@mui/material/Link";

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
}));

export const LinkBox = styled(Link)(({ theme }) => ({
  cursor: "pointer",
}));
