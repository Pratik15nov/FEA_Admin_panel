import * as React from "react";
import { Container, CustomAvatar, SideImage, LoginSide } from "./Login.style";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const handleLogin = (body) => {
    console.log(body);
  };

  return (
    <Box>
      <Container>
        <LoginSide>
          <CustomAvatar>
            <LockOutlinedIcon fontSize="large" />
          </CustomAvatar>
          <Typography variant="h1">Sign in</Typography>
          <Box>
            <form onSubmit={handleSubmit(handleLogin)}>
              <Controller
                name="email"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ?? ""}
                  />
                )}
                control={control}
                rules={{
                  required: "Email Addres is Required",
                }}
              />
              <Controller
                name="password"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ?? ""}
                  />
                )}
                control={control}
                rules={{
                  required: "Password is Required",
                }}
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
              </Grid>
            </form>
          </Box>
        </LoginSide>

        <SideImage>
          <img src="/images/sideImage.svg" alt="SIGN_IN" />
        </SideImage>
      </Container>
    </Box>
  );
};

export default Login;
