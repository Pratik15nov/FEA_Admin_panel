import React from "react";
import {
  Container,
  CustomAvatar,
  SideImage,
  LoginSide,
  LinkBox,
} from "./Forgot.style";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { pwdUpdationLinkMail } from "../../service/Auth.Service";

const Forgot = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: null,
    },
  });

  const handleForgot = async (info) => {
    try {
      const body = {
        email: info.email,
      };

      const response = await pwdUpdationLinkMail(body);
      if (response.success) {
        alert("email sent");
        navigate("/");
      } else {
        alert("email not sent try again");
        navigate("/");
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
            <VpnKeyOutlinedIcon fontSize="large" />
          </CustomAvatar>
          <Typography variant="h1">Forgot Password ?</Typography>
          <Box sx={{ marginTop: "5%" }}>
            <form onSubmit={handleSubmit(handleForgot)}>
              <Typography variant="h3">
                Enter your email to get password reset link
              </Typography>
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
                    helperText={error.message ? error.message:""}
                  />
                )}
                control={control}
                rules={{
                  required: "Please add email ",
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "Enter email properly",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send mail
              </Button>

              <Grid container>
                <Grid item xs>
                  <LinkBox onClick={() => navigate("/")} variant={"body2"}>
                    Back to login ?
                  </LinkBox>
                </Grid>
              </Grid>
            </form>
          </Box>
        </LoginSide>

        <SideImage>
          <img src="/images/Forgot.svg" alt="SIGN_IN" />
        </SideImage>
      </Container>
    </Box>
  );
};

export default Forgot;
