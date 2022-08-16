import { Avatar, Box, styled } from "@mui/material";

const SideImage = styled(Box)`
  width: 95%;
  height: 700px;
  border-radius: 10px;
  margin: 5px 0 0 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../images/sideImage.svg");
`;
const LoginSide = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15% 0 0 0;
`;

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  margin: "3px",
  backgroundColor: theme.palette.primary.main,
}));

export { CustomAvatar, SideImage, LoginSide };
