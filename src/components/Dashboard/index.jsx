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
  DoughnutSize,
  MainBody,
  TabButtons,
  TabMain,
  ProductChartSize,
} from "./Dashboard.style";
// import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { dashboardDataHandler } from "../../service/Auth.Service";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels
);

export default function Dashboard() {
  useEffect(() => {
    getDashboardData(); // eslint-disable-next-line
  }, []);
  const [dashboardData, setDashboardData] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      // console.log(
      //   `${new Date().getDate()}-${
      //     new Date().getMonth() + 1
      //   }-${new Date().getFullYear()}`
      // );
      // console.log(
      //   `${new Date().getDate()}-${
      //     new Date().getMonth() + 1
      //   }-${new Date().getFullYear()}`
      // );
    }
  };
  const OrdersbyProducts = dashboardData?.orderedProducts.filter(
    (data) => data.quantity > 0
  );

  const data = {
    labels: OrdersbyProducts?.map((data) => data.name),
    datasets: [
      {
        data: OrdersbyProducts?.map((data) => data.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
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
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: `${chart.data.labels[i]} ${data}`,
              fillStyle: datasets[0].backgroundColor[i],
            }));
          },
        },
        position: "right",
        font: {
          family: "Public Sans",
        },
      },
      datalabels: {
        anchor: "end",
        align: "start",

        font: {
          weight: "bold",
        },
      },
    },
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",

        font: {
          weight: "bold",
        },
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
    elements: {
      line: {
        tension: 0.5,
      },
    },
  };
  const datas = {
    labels: OrdersbyProducts?.map((data) => data.name),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: OrdersbyProducts?.map((data) => data.quantity),
        borderColor: "rgb(26, 26, 64)",
        backgroundColor: "rgba(26, 26, 64,0.2)",
      },
    ],
  };

  const getDashboardData = async () => {
    try {
      const response = await dashboardDataHandler();
      if (response.length !== 0) {
        setDashboardData(response[0]);
      }
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
                      {dashboardData?.totalOrder}
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
                      {dashboardData?.totalProducts}
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
                      {dashboardData?.totalUser}
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
                      {dashboardData?.totalCategory}
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
          <Grid xs={5}>
            <CardFrist>
              <CardContent>
                <CardTwo variant="h6" component="div">
                  Orders by Products
                </CardTwo>
                <DoughnutSize options={doughnutOptions} data={data} />
              </CardContent>
            </CardFrist>
          </Grid>
          <Grid xs={7}>
            <CardFrist>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <CardContent>
                      <CardTwo variant="h6" component="div">
                        Total Sales
                      </CardTwo>
                    </CardContent>
                  </Grid>
                  <Grid xs={8}>
                    <Box sx={{ width: "100%" }}>
                      <TabMain value={value} onChange={handleChange} centered>
                        <TabButtons label="This Week" />
                        <TabButtons label="This Months" />
                        <TabButtons label="This Year" />
                        <TabButtons label="Custom" />
                      </TabMain>
                    </Box>
                  </Grid>
                </Grid>

                <ProductChartSize options={options} data={datas} />
              </CardContent>
            </CardFrist>
          </Grid>
        </ContainerTwo>
      </MainBody>
    </>
  );
}
