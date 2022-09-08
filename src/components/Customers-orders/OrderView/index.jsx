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
import { Divider } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

function createData(data, answer) {
  return { data, answer };
}

export default function OrderView(props) {
  const currencyFormat = (num) => {
    return num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const [subTotal, setSubTotal] = useState([]);

  const rows = [
    createData("Order Subtotal", `₹ ${currencyFormat(Number(subTotal))}`),
    createData("Promocode:", `${props.viewdata?.promocodeId?.couponcode}`),
    createData(
      "Discount Price",
      `₹ ${currencyFormat(Number(props.viewdata?.discountPrice))}`
    ),
    createData(
      "Tax (SGST+ CGST)	",
      `₹ ${currencyFormat(Number((subTotal / 100) * 18))}`
    ),
    createData("Shipping Charge", `${subTotal > 500 ? "₹ 0" : "₹ 40"}`),
    createData(
      "Total Amount",
      `₹ ${currencyFormat(Number(props.viewdata?.totalPrice))}`
    ),
  ];

  useEffect(() => {

    let data = 0;
    props.viewdata?.cartdetail?.filter((value) => {
      data = data + value?.productId?.discountPrice * value?.quantity;
    });
    setSubTotal(data);
// eslint-disable-next-line
  }, [props.viewdata]);

  const handleClose = () => {
    props.handleCloseView();
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
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
      <ContentBox ref={componentRef} dividers={"paper"}>
        <ContentText id="scroll-dialog-description" tabIndex={-1}>
          <MasterConatiner>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item xs={7}>
                <TopTextStyle>
                  <b>Date</b> :&nbsp;
                  {props.viewdata?.createdAt?.substring(8, 10)}
                  {"/"}
                  {props.viewdata?.createdAt?.substring(5, 7)}
                  {"/"}
                  {props.viewdata?.createdAt?.substring(0, 4)}
                  <br />
                  <b>Order ID </b>&nbsp;:&nbsp;{props.viewdata?._id} <br />
                  <b>Payment-ID</b> :&nbsp;{props.viewdata?.paymentId} <br />
                  <b>OrderStatus</b> :&nbsp;{props.viewdata?.orderStatus}
                </TopTextStyle>
              </Grid>
              <Grid item xs={3}>
                <img
                  src="/images/LOGOVIEW.png"
                  style={{ height: "50px", marginTop: "-12px" }}
                  alt="logo"
                ></img>
              </Grid>
            </Grid>

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
                    <StyledTableCell align="right">Total</StyledTableCell>
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
                        {"₹"}&nbsp;
                        {currencyFormat(Number(row.productId?.discountPrice))}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {"₹"}&nbsp;
                        {currencyFormat(
                          Number(row?.quantity * row.productId?.discountPrice)
                        )}
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
                Dear Consumer, the bill payment will reflect in next 48 hours or
                in the next billing cycle, at your service provider end. Please
                contact paytm customer support for any queries regarding this
                order.
                <br />
                <b>Note</b>:<br />
                This is invoice is only a confirmation of the receipt of the
                amount paid against for the service as described above. Subject
                to terms and conditions mentioned at Shoppy
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
        <CustomButton onClick={() => handleClose()}>Go Back</CustomButton>
        <CustomButton onClick={() => handlePrint()}>PRINT</CustomButton>
      </Actions>
    </DialogContainer>
  );
}
