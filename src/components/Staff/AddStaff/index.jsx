import BreadcrumbArea from "../../BreadcrumbArea";
import {
  Container,
  InputBox,
  InputField,
  BottomButton,
} from "./AddStaff.style";
import { Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddStaff = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      phoneNumber: null,
    },
  });
  const handleLogin = (body) => {
    try {
      console.log("body: ", body);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Grid container sx={{ paddingBottom: "20px" }}>
          <BreadcrumbArea />
        </Grid>

        <Grid container sx={{ flexWrap: "nowrap" }}>
          <InputBox item xs={6}>
            <Typography color="text.primary" variant="subtitle2">
              First-Name
            </Typography>
            <Controller
              name="firstName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="firstName"
                  placeholder="Enter you first name"
                  name="firstName"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add firstname",
                maxLength: {
                  value: 12,
                  message: "Cannot be longer than 12 characters",
                },
                pattern: {
                  value:
                    /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
                  message: "Only words are allowed",
                },
                minLength: {
                  value: 4,
                  message: "Cannot be smaller than 4 characters",
                },
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              Last-Name
            </Typography>
            <Controller
              name="lastName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="lastName"
                  placeholder="Enter you last name"
                  name="lastName"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add lastName",
                maxLength: {
                  value: 12,
                  message: "Cannot be longer than 12 characters",
                },
                pattern: {
                  value:
                    /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
                  message: "Only words are allowed",
                },
                minLength: {
                  value: 4,
                  message: "Cannot be smaller than 4 characters",
                },
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              E-mail
            </Typography>
            <Controller
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="email"
                  placeholder="Enter you email"
                  name="email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Add a valid email-address ",
                },
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              Password
            </Typography>
            <Controller
              name="password"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  type={"password"}
                  id="password"
                  placeholder="Enter you password"
                  name="password"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                minLength: {
                  value: 5,
                  message: "Cannot be smaller than 5 characters",
                },

                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                  message:
                    "must include a lowercase , uppercase, digit and a special character!!!!!",
                },
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              Contact
            </Typography>
            <Controller
              name="phoneNumber"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputField
                  margin="normal"
                  fullWidth
                  id="phoneNumber"
                  placeholder="Enter you phonenumber"
                  name="phoneNumber"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                minLength: {
                  value: 10,
                  message: "Cannot be smaller than 10 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Cannot be longer than 10 characters",
                },

                pattern: {
                  value: /^[0-9]/,
                  message: "Enter only 10 digit number",
                },
              }}
            />
          </InputBox>
          <InputBox item xs={6}>
            <BottomButton
              type="submit"
              loadingPosition="end"
              variant="contained"
            >
              Add User
            </BottomButton>
            <BottomButton variant="contained"
             onClick={() => navigate("/staff")}
            >Back</BottomButton>
          </InputBox>
        </Grid>
      </form>
    </Container>
  );
};

export default AddStaff;
