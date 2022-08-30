import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useForm, Controller } from "react-hook-form";

export function OrderStatusDialog(props) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      RadioGroup: "",
    },
  });

  const handleClose = (data) => {
    console.log("data: ", data);
    props.onClose(props.selectedValue);
  };
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>OrderStatus</DialogTitle>

      <form onSubmit={handleSubmit((data) => console.log("DATA", data))}>
        <Controller
          render={({ field }) => (
            <RadioGroup aria-label="gender" {...field}>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
