import { styled, Box, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));
export const ContainerHead = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
}));
