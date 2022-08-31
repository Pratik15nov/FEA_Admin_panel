import Radio from "@mui/material/Radio";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  DialogBox,
  DialogTitleBar,
  FormLabelControl,
  RadioButtonGroup,
  CustomButton,
  FormContainer,
  CancelIcon,
  Title,
} from "./OrderStatusDialog.style";

export function OrderStatusDialog(props) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      RadioGroup: "",
    },
  });

  useEffect(() => {
    reset({ RadioGroup: props.dialogData.orderStatus }); // eslint-disable-next-line
  }, [props.dialogData.orderStatus]);

  const handleClose = (data) => {
    const body = {
      id: props.dialogData._id,
      orderStatus: data.RadioGroup,
    };
    props.onClose(body);
  };
  return (
    <DialogBox onClose={handleClose} open={props.open}>
      <DialogTitleBar>
        <Title>OrderStatus</Title>
        <CancelIcon onClick={()=>props.handleCancelIcon()} />
      </DialogTitleBar>

      <FormContainer onSubmit={handleSubmit(handleClose)}>
        <Controller
          render={({ field }) => (
            <RadioButtonGroup aria-label="orderStatus" {...field}>
              <FormLabelControl
                value="PLACED"
                control={<Radio />}
                label="PLACED"
              />
              <FormLabelControl
                value="DISPATCHED"
                control={<Radio />}
                label="DISPATCHED"
              />
              <FormLabelControl
                value="RECEIVED"
                control={<Radio />}
                label="RECEIVED"
              />
            </RadioButtonGroup>
          )}
          name="RadioGroup"
          control={control}
        />
        <CustomButton variant={"contained"} type="submit">
          submit
        </CustomButton>
      </FormContainer>
    </DialogBox>
  );
}
