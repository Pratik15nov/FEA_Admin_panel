import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function CustomSnackbar() {
  const msg = useSelector((state) => state.staff.msg);
  const [snakBar, setSankBar] = React.useState(false);
  useEffect(() => {
    if (msg !== null) {
      setSankBar(true);
      setTimeout(() => {
        setSankBar(false);
      }, 3000);
    }
  }, [msg]);

  return (
    <Snackbar
      open={snakBar}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity="info" sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
