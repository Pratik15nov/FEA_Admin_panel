import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DialogText, MyButton } from "./Dialog.style";

const DialogBox = (props) => {
  return (
    <Dialog
      open={props.openAlert}
      onClose={props.alertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Deletion alert</DialogTitle>
      <DialogContent>
        <DialogText>{props.msg}</DialogText>
      </DialogContent>
      <DialogActions>
        <MyButton onClick={props.alertClose}>Disagree</MyButton>
        <MyButton
          onClick={() => props.onAgree(props.callBackData)}
          autoFocus
        >
          Agree
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
