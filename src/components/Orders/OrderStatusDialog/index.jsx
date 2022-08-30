import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { sendOrderUpdation } from "../../../js/actions";

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
    const body = {
      id: props.dialogData._id,
      orderStatus: data.RadioGroup,
    };
    // dispatch(sendOrderUpdation(body));
    // console.log("body: ", body);

    console.log("data: ", data.RadioGroup);
    props.onClose(body);
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
