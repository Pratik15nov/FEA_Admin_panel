import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function CustomSnackbar(props) {
  // const [message, setMessage] = React.useState(" ");
  // const [msgData, setMsgData] = React.useState(false);
  // const getValue = (open, msg) => {
  //   setMessage(msg);
  //   setMsgData(open);
  //   setTimeout(() => {
  //     setMsgData(false);
  // }, 3000);
  // };
  return (
    <Snackbar
      open={props.open}
      
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        
        severity="success"
        sx={{ width: "100%" }}
      >
        {props.msg}
      </Alert>
    </Snackbar>
   
  );
}
