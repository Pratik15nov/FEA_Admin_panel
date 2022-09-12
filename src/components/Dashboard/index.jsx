import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardFrist, MainBody } from "./Dashboard.style";
export default function Dashboard() {
  return (
    <MainBody>
      {" "}
      <Grid container spacing={2}>
        <Grid xs={8}>
          <CardFrist>
            <Grid container>
              <Grid container xs={8}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    Welcome back!
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Best seller of the month You have done 57.6% more sales
                    today.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">
                    Go now
                  </Button>
                </CardActions>
              </Grid>
              <Grid container xs={4}>
                <img
                  src="/images/banner1.png"
                  alt="baneer"
                  loading="lazy"
                  width="200px"
                  height="200px"
                />
              </Grid>
            </Grid>
          </CardFrist>
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </MainBody>
  );
}
