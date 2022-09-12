import * as React from "react";
import { Container, CustomAvatar, SideImage, LoginSide } from "./Login.style";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginCheck } from "../../service/Auth.Service";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const handleLogin = async (info) => {
    try {
      const body = {
        email: info.email,
        password: info.password,
      };

      const response = await loginCheck(body);

      if (response.success) {
        console.log("response: ", response);
        localStorage.setItem("dataToken", response?.data?.token);
        localStorage.setItem("roleId", response?.data?.role?._id);
        localStorage.setItem("firstname", response?.data?.firstName);
        localStorage.setItem("lastname", response?.data?.lastName);
        localStorage.setItem("email", response?.data?.email);

        navigate("/dashboard");
      } else {
        alert("PLEASE ENTER CORRECT CREDENTIALS");
      }
    } catch (error) {
      alert(error);
    }
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
