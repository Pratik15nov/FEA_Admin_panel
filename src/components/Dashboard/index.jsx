import { React, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  CardFrist,
  CardOne,
  CardTwo,
  ContainerTwo,
  CustomIcon,
  MainBody,
  TabText,
} from "./Dashboard.style";
// import { Alert } from "@mui/material";
import {
  fetchCategoryList,
  fetchCustomersList,
  fetchOrderList,
  fetchProductList,
} from "../../js/actions";
import { useDispatch, useSelector } from "react-redux";
import { listBody } from "../../utils/Helper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getDashboardData(); // eslint-disable-next-line
  }, []);
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  // const state = useSelector((state) => state);
  const orderCount = useSelector((state) => state.order.totalCount);
  const orderData = useSelector((state) => state?.order.list);
  const categoryData = useSelector((state) => state?.category.list);
  console.log(categoryData);
  const productCount = useSelector((state) => state.product.totalCount);
  const customerCount = useSelector((state) => state.customers.totalCount);
  const categoryCount = useSelector((state) => state.category.totalCount);
  // console.log("STATE", state);
  const data = {
    labels: categoryData.map((data) => data.categoryName),
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3, 6, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  const datas = {
    labels: orderData.map(
      (data) =>
        data.createdAt.substring(8, 10) +
        "-" +
        data.createdAt.substring(5, 7) +
        "-" +
        data.createdAt.substring(0, 4)
    ),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: orderData.map((data) => data.totalPrice),
        borderColor: "rgb(26, 26, 64)",
        backgroundColor: "rgba(26, 26, 64,0.2)",
      },
    ],
  };

  const getDashboardData = () => {
    try {
      dispatch(fetchOrderList(listBody({ where: null, perPage: 10, page: 1 })));
      dispatch(
        fetchProductList(listBody({ where: null, perPage: 10, page: 1 }))
      );
      dispatch(
        fetchCustomersList(listBody({ where: null, perPage: 10, page: 1 }))
      );
      dispatch(
        fetchCategoryList(listBody({ where: null, perPage: 10, page: 1 }))
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {/* <Alert severity="error">Session token expired!</Alert> */}
      <MainBody>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <CardFrist>
              <Grid container>
                <Grid container xs={10}>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Total Orders
                    </CardTwo>
                    <CardOne variant="h5" component="div">
                      {orderCount}
                    </CardOne>
                    <Typography color="text.secondary">
                      +2.6% than last week
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardFrist>
          </Grid>
          <Grid xs={3}>
            <CardFrist>
              <Grid container>
                <Grid container xs={10}>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Total Products
                    </CardTwo>
                    <CardOne variant="h5" component="div">
                      {productCount}
                    </CardOne>
                    <Typography color="text.secondary">
                      +2.6% than last week
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardFrist>
          </Grid>
          <Grid xs={3}>
            <CardFrist>
              <Grid container>
                <Grid container xs={10}>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Total Customers
                    </CardTwo>
                    <CardOne variant="h5" component="div">
                      {customerCount}
                    </CardOne>
                    <Typography color="text.secondary">
                      +2.6% than last week
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardFrist>
          </Grid>
          <Grid xs={3}>
            <CardFrist>
              <Grid container>
                <Grid container xs={10}>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Total Category
                    </CardTwo>
                    <CardOne variant="h5" component="div">
                      {categoryCount}
                    </CardOne>
                    <Typography color="text.secondary">
                      +2.6% than last week
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardFrist>
          </Grid>
        </Grid>
        <ContainerTwo container spacing={2}>
          <Grid xs={4}>
            <CardFrist>
              <CardContent>
                <CardTwo variant="h6" component="div">
                  Orders by Products
                </CardTwo>
                <Doughnut data={data} />
              </CardContent>
            </CardFrist>
          </Grid>
          <Grid xs={8}>
            <CardFrist>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <CardContent>
                      <CardTwo variant="h6" component="div">
                        Total Sales
                      </CardTwo>
                    </CardContent>
                  </Grid>
                  <Grid xs={6}>
                    <Box sx={{ width: "100%" }}>
                      <Box>
                        <Tabs value={value} onChange={handleChange}>
                          <TabText label="This Week" {...a11yProps(0)} />
                          <TabText label="This Months" {...a11yProps(1)} />
                          <TabText label="This Year" {...a11yProps(2)} />
                          <CustomIcon />
                        </Tabs>
                      </Box>
                      {/* <TabPanel value={value} index={0}>
                        Item One
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        Item Two
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        Item Three
                      </TabPanel> */}
                    </Box>
                  </Grid>
                </Grid>
                <Line options={options} data={datas} />
              </CardContent>
            </CardFrist>
          </Grid>
        </ContainerTwo>
      </MainBody>
    </>
  );
}
