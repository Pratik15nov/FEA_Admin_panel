import React, { useState } from "react";
import {
  Container,
  CustomAvatar,
  SideImage,
  LoginSide,
  LinkBox,
  ButtonLoading,
} from "./Login.style";
import { Alert, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginCheck } from "../../service/Auth.Service";

const Login = () => {
  const navigate = useNavigate();
  const [loadding, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
  });
  const handleLogin = async (info) => {
    setLoading(true);
    setErrMsg(false);
    try {
      const body = {
        email: info.email,
        password: info.password,
      };
      const response = await loginCheck(body);
      if (response.success) {
        localStorage.setItem("dataToken", response.data.token);
        localStorage.setItem("Data", JSON.stringify(response));
        setLoading(false);
        navigate("/dashboard");
      } else {
        setLoading(false);
        setErrMsg(true);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Container>
      <LoginSide>
        <CustomAvatar>
          <LockOutlinedIcon fontSize="large" />
        </CustomAvatar>
        <Typography variant="h1">Sign in Shoppy!</Typography>
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
                  value={value || ""}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ? error.message : ""}
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
                  value={value || ""}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ? error.message : ""}
                />
              )}
              control={control}
              rules={{
                required: "Password is Required",
              }}
            />
            {loadding ? (
              <ButtonLoading loading fullWidth variant="contained">
                Submit
              </ButtonLoading>
            ) : (
              <ButtonLoading type="submit" fullWidth variant="contained">
                Sign In
              </ButtonLoading>
            )}
            <Grid container>
              <Grid item xs>
                <LinkBox onClick={() => navigate("/forgot")} variant={"body2"}>
                  Forgot password?
                </LinkBox>
              </Grid>
            </Grid>
            {errMsg ? (
              <Alert severity="error">
                Incorrect email address or password!
              </Alert>
            ) : (
              <></>
            )}
          </form>
        </Box>
      </LoginSide>
      <SideImage>
        <img width={250} src="/images/sideImage.svg" alt="SIGN_IN" />
      </SideImage>
    </Container>
  );
};
export default Login;
