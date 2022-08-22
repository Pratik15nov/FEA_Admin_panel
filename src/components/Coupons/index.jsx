import { Box, Typography, Grid, Breadcrumbs } from "@mui/material";
const Coupons = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: 2 }}>
        <Grid container sx={{ paddingBottom: "20px" }}>
          <Grid xs={7}>
            <Typography variant="h1"> Coupons </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Box underline="hover" color="inherit">
                Coupons
              </Box>
              <Typography>Coupons List</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid xs={3}></Grid>
          <Grid xs={2}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Coupons;
