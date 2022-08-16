import { Avatar, Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  marginTop: "120px",
}));

export const SideImage = styled(Box)`
  padding-left: 20px;
  & img {
    height: calc(100vh - 150px);
  }
`;
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
