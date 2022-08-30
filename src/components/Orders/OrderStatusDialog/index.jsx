import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

export function OrderStatusDialog(props) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      RadioGroup: "",
    },
  });

  useEffect(() => {
    reset({ RadioGroup: props.dialogData.orderStatus });
  }, [props.dialogData.orderStatus]);

  console.log("PROPS", props.dialogData.orderStatus);
  const handleClose = (data) => {
    console.log("data: ", data);
    props.onClose(props.selectedValue);
  };
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>OrderStatus</DialogTitle>

      <form onSubmit={handleSubmit(handleClose)}>
        <Controller
          render={({ field }) => (
            <RadioGroup aria-label="orderStatus" {...field}>
              <FormControlLabel
                value="PLACED"
                control={<Radio />}
                label="PLACED"
              />
              <FormControlLabel
                value="DISPATCHED"
                control={<Radio />}
                label="DISPATCHED"
              />
              <FormControlLabel
                value="RECEIVED"
                control={<Radio />}
                label="RECEIVED"
              />
            </RadioGroup>
          )}
          name="RadioGroup"
          control={control}
        />
        <button type="submit">submit</button>
      </form>
    </Dialog>
  );
}
