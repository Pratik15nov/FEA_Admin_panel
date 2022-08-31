import * as React from "react";
import {
  DialogContainer,
  CustomButton,
  Actions,
  ContentBox,
  TitleBox,
  ContentText,
  MasterConatiner,
  TopTextStyle,
  CustomDivider,
  StyledTableCell,
  StyledTableRow,
  TableBox,
  TableTitleGrid,
  TableArea,
  RightBox,
  BoxTable,
  TablePlot,
  BoxTableBody,
  BoxTableRow,
  BoxTableCell,
  CancelIcon,
  TitleContainerBox,
  TitleTag,
} from "./OrderView.style";
import { Box, Divider } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";

function createData(data, answer) {
  return { data, answer };
}

export default function OrderView(props) {
  const rows = [
    createData("Order Subtotal", "₹ LOGICS"),
    createData("Promocode:", `${props.viewdata?.promocodeId?.couponcode}`),
    createData("Discount Price", `₹ ${props.viewdata?.discountPrice}`),
    createData("Tax (SGST+ CGST)	", "₹ LOGICS"),
    createData("Shipping Charge", "₹ LOGICS"),
    createData("Total Amount", `₹ ${props.viewdata?.totalPrice?.toFixed(2)}`),
  ];

  const handleClose = () => {
    props.handleCloseView();
  };
  console.log("PROPS", props.viewdata);

  return (
    <div>
      <DialogContainer
        open={props.view}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <TitleBox id="scroll-dialog-title">
          <TitleContainerBox>
            <TitleTag>Order Details</TitleTag>
            <CancelIcon onClick={() => handleClose()} />
          </TitleContainerBox>
        </TitleBox>
        <ContentBox dividers={"paper"}>
          <ContentText id="scroll-dialog-description" tabIndex={-1}>
            <MasterConatiner>
              <TopTextStyle>
                <b>Date</b> :&nbsp;{props.viewdata?.createdAt?.substring(8, 10)}
                {"/"}
                {props.viewdata?.createdAt?.substring(5, 7)}
                {"/"}
                {props.viewdata?.createdAt?.substring(0, 4)}
                <br />
                <b>Order ID </b>&nbsp;:&nbsp;{props.viewdata?._id} <br />
                <b>Payment-ID</b> :&nbsp;{props.viewdata?.paymentId} <br />
                <b>OrderStatus</b> :&nbsp;{props.viewdata?.orderStatus}
              </TopTextStyle>
              <CustomDivider />
              <TopTextStyle>
                <b>Invoice to</b> :&nbsp;&nbsp;
                {props.viewdata?.userId?.firstName}
                &nbsp;&nbsp;
                {props.viewdata?.userId?.lastName} <br />
                <b>Address_1</b> :&nbsp;&nbsp;
                {props.viewdata?.addressId?.address_1}
                <br />
                <b>Address_2</b> :&nbsp;&nbsp;
                {props.viewdata?.addressId?.address_1
                  ? props.viewdata?.addressId?.address_1
                  : "N/A"}
                <br />
                <b>Address-Type</b> :&nbsp;&nbsp;
                {props.viewdata?.addressId?.type}
                <br />
                <b>Landmark</b> :&nbsp;&nbsp;
                {props.viewdata?.addressId?.landmark?.toUpperCase()}
                <br />
                <b>Pincode</b> :&nbsp;&nbsp;{props.viewdata?.addressId?.pincode}
                <br />
                <b> Label</b> :&nbsp;&nbsp;
                {props.viewdata?.addressId?.label?.toUpperCase()}
                <br />
              </TopTextStyle>
              <TableTitleGrid xs={12}> Cart Details</TableTitleGrid>
              <Divider />
              <TableBox component={Paper}>
                <TableArea>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product Name</StyledTableCell>
                      <StyledTableCell align="right">Quantity</StyledTableCell>
                      <StyledTableCell align="right">
                        Discount Price
                      </StyledTableCell>
                      <StyledTableCell align="right">Price</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.viewdata?.cartdetail?.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.productId?.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.productId?.discountPrice}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.productId?.price}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </TableArea>
              </TableBox>
              <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                <Grid item xs={6}>
                  <b> Additional Information</b>:
                  <br />
                  Dear Consumer, the bill payment will reflect in next 48 hours
                  or in the next billing cycle, at your service provider end.
                  Please contact paytm customer support for any queries
                  regarding this order.
                  <br />
                  <b>Note</b>:<br />
                  This is invoice is only a confirmation of the receipt of the
                  amount paid against for the service as described above.
                  Subject to terms and conditions mentioned at Shoppy
                </Grid>
                <RightBox item xs={6} sx={{ display: "block" }}>
                  <BoxTable component={Paper}>
                    <TablePlot aria-label="simple table">
                      <BoxTableBody>
                        {rows.map((row) => (
                          <BoxTableRow key={row.data}>
                            <BoxTableCell component="th" scope="row">
                              {" "}
                              {row.data}
                            </BoxTableCell>
                            <BoxTableCell align="right">
                              {" "}
                              {row.answer}
                            </BoxTableCell>
                          </BoxTableRow>
                        ))}
                      </BoxTableBody>
                    </TablePlot>
                  </BoxTable>
                </RightBox>
              </Grid>
            </MasterConatiner>
          </ContentText>
        </ContentBox>
        <Actions>
          <CustomButton onClick={handleClose}>Go Back</CustomButton>
        </Actions>
      </DialogContainer>
    </div>
  );
}
