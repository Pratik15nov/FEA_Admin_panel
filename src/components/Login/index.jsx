import * as React from "react";
import {
  Container,
  CustomAvatar,
  SideImage,
  LoginSide,
  LinkBox,
} from "./Login.style";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginCheck } from "../../service/Auth.Service";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const navigate = useNavigate();
  const [loadding, setLoading] = React.useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const handleLogin = async (info) => {
    setLoading(true);
    try {
      const body = {
        email: info.email,
        password: info.password,
      };

      const response = await loginCheck(body);

      if (response.success) {
        console.log("response: ", response);
        localStorage.setItem("dataToken", response?.data?.token);
        localStorage.setItem("Data", JSON.stringify(response));
        setLoading(false);
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
              {loadding ? (
                <LoadingButton
                  loading
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, width: "100%", background: "#ff47df1f" }}
                >
                  Submit
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              )}

              <Grid container>
                <Grid item xs>
                  <LinkBox
                    onClick={() => navigate("/forgot")}
                    variant={"body2"}
                  >
                    Forgot password?
                  </LinkBox>
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
