import React from "react";
import {
  Dialog,
  // DialogTitle,
  DialogContent,
  // DialogActions,
} from "@mui/material";
import { DialogText, MyButton, TitleBox, ActionsBox } from "./Dialog.style";

const DialogBox = (props) => {
  return (
    <Dialog
      open={props.openAlert}
      onClose={props.alertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <TitleBox id="alert-dialog-title">
        {props.titleMsg ? props.titleMsg : "Deletion alert"}
      </TitleBox>
      <DialogContent>
        <DialogText>{props.msg}</DialogText>
      </DialogContent>
      <ActionsBox>
        <MyButton onClick={props.alertClose}>Disagree</MyButton>
        <MyButton onClick={() => props.onAgree()} autoFocus>
          Agree
        </MyButton>
      </ActionsBox>
    </Dialog>
  );
};

export default DialogBox;
