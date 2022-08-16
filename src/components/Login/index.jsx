import * as React from "react";
import { CustomAvatar, SideImage, LoginSide } from "./Login.style";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  return (
    <Box>
      <Grid container>
        <Grid tem sm={8}>
          <LoginSide>
            <CustomAvatar>
              <LockOutlinedIcon />
            </CustomAvatar>
            <Typography variant="h1">Sign in</Typography>
            <Box component="form" noValidate onSubmit={console.log("HELLOW")}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant={"body2"}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </LoginSide>
        </Grid>
        <Grid item sm={4}>
          <SideImage />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
