import { Box, styled } from "@mui/material";

const SideImage = styled(Box)`
  width: 70%;
  height: 42rem;
  border-radius: 2rem;
  margin: 5px 0 0 5px;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1660000770751-139e6868287b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ5fENEd3V3WEpBYkV3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60");
`;
const LoginSide = styled(Box)`
  display: flex;
  flex-direction: column;
  alignitems: center;
`;

export { SideImage, LoginSide };
