import * as React from "react";
import "./Login.style.jsx";
import theme from "../../theme"; // import customized theme to use
import { ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
  SideImage,
  LoginSide
} from './Login.style';

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container>
          <Grid item sm={6}>
            <SideImage />
          </Grid>
          <Grid tem sm={6}>
            <LoginSide>
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h1">Sign in</Typography>
              <Box
                component="form"
                noValidate
                onSubmit={console.log("HELLOW")}
                sx={{ mt: 1 }}
              >
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
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {"Copyright © "}
                  <Link color="inherit" href="https://mui.com/">
                    Your Website
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </LoginSide>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
