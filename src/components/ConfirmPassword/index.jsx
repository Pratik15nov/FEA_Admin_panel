import React from "react";
import {
  Container,
  CustomAvatar,
  SideImage,
  LoginSide,
  //   LinkBox,
} from "./ConfirmPassword.style";
import { Box, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router";

const ConfirmPassword = () => {
  //   const navigate = useNavigate();
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      newPassword: null,
    },
  });

  const handleConfirmPasssword = async (info) => {
    try {
      const body = {
        newPassword: info.newPassword,
      };
      console.log("body: ", body);
    } catch (error) {
      alert(error);
    }
  };

  let pwd = watch("newPassword");

  return (
    <Box>
      <Container>
        <LoginSide>
          <CustomAvatar>
            <LockResetOutlinedIcon fontSize="large" />
          </CustomAvatar>
          <Typography variant="h1">Update your password here</Typography>
          <Box sx={{ marginTop: "5%" }}>
            <form onSubmit={handleSubmit(handleConfirmPasssword)}>
              <Typography variant="h3">New-Password</Typography>
              <Controller
                name="newPassword"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="newPassword"
                    label="Enter your new password"
                    name="newPassword"
                    autoFocus
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error.message ? error.message : ""}
                  />
                )}
                control={control}
                rules={{
                  required: "Please fill  your new Password",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      " Must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character ",
                  },
                }}
              />
              <Typography variant="h3">Confirm New Password</Typography>
              <Controller
                name="confirmPassword"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="confirmPassword"
                    placeholder=" Re-enter your new Password"
                    name="confirmPassword"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error.message ?error.message: ""}
                  />
                )}
                control={control}
                rules={{
                  required: "Please re-enter your new Password",
                  validate: (value) =>
                    value === pwd || "The passwords do not match",
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update&nbsp;&nbsp;&nbsp;&nbsp;Password
              </Button>
            </form>
          </Box>
        </LoginSide>

        <SideImage>
          <img src="/images/ConfirmPassword.svg" alt="SIGN_IN" />
        </SideImage>
      </Container>
    </Box>
  );
};

export default ConfirmPassword;
