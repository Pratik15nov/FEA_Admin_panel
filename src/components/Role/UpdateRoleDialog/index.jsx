import React from "react";
import { Dialog, DialogContent} from "@mui/material";
import {
  DialogText,
  InputField,
  AddRoleButton,
  CancelIcon,
  TitleText,
} from "./UpdateRoleDialog.style";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@mui/material";

const UpdateRoleDialog = (props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      roleName: null,
    },
  });

  const handleLogin = (data) => {
    props.onAgree(data);
  };

  return (
    <Dialog
      open={props.updateAddRole}
      onClose={props.addroleclose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <TitleText id="alert-dialog-title">
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item>Update Role</Grid>
          <Grid item>
            <CancelIcon onClick={() => props.updateRoleClose()} />
          </Grid>
        </Grid>
      </TitleText>
      <DialogContent sx={{ background: "#781C68" }}>
        <DialogText>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Grid container sx={{ display: "block" }}>
              <Grid item>
                <Controller
                  name="roleName"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputField
                      hiddenLabel
                      placeholder={`Update name from ${props.updateRoleData?.roleName} to ...`}
                      id="filled-hidden-label-normal"
                      variant="filled"
                      name="roleName"
                      autoFocus
                      // defaultValue={props.updateRoleData?.roleName}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error?.message ?? ""}
                    />
                  )}
                  control={control}
                  rules={{
                    required: "Role name is required",
                  }}
                />
              </Grid>
              <Grid item sx={{ textAlign: "center" }}>
                <AddRoleButton variant="contained" type="submit">
                  Submit
                </AddRoleButton>
              </Grid>
            </Grid>
          </form>
        </DialogText>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoleDialog;
