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
  HeadLabel,
} from "./OrderView.style";
import { Box, Divider, Typography } from "@mui/material";
// bjbj
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  width: "20%",
}));

export default function OrderView(props) {
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
          <b>Order Details</b>
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
              <Divider />
              {/* <Typography> DIVEDER HERE </Typography> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product Name</StyledTableCell>
                      <StyledTableCell align="right">Quantity</StyledTableCell>
                      <StyledTableCell align="right">Price</StyledTableCell>
                      <StyledTableCell align="right">
                        Discount Price
                      </StyledTableCell>
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
                          {row.productId?.price}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.productId?.discountPrice}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  Additional Information:
                  <br />
                  Dear Consumer, the bill payment will reflect in next 48 hours
                  or in the next billing cycle, at your service provider end.
                  Please contact paytm customer support for any queries
                  regarding this order.
                </Grid>
                <Grid item xs={6} sx={{ display: "block" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Order-SubTotal</span>
                    <span>"logics"</span>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Promo-code:</span>
                    <span>{props.viewdata?.promocodeId?.couponcode}</span>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Discount-Price</span>
                    <span>{props.viewdata?.discountPrice}</span>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Tax (SGST+ CGST)</span>
                    <span>"logics"</span>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Shipping Charge</span>
                    <span>"logics"</span>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Total Amount</span>
                    <span>{props.viewdata?.totalPrice?.toFixed(2)}</span>
                  </Box>
                </Grid>
              </Grid>
              <Box>
                Note: <br />
                This is invoice is only a confirmation of the receipt of the
                amount paid against for the service as described above. Subject
                to terms and conditions mentioned at Shoppy
              </Box>
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
