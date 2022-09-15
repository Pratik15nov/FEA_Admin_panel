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
    var curr = new Date();
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1))
      .toISOString()
      .substring(0, 10);
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 8))
      .toISOString()
      .substring(0, 10);

    getDashboardData(firstday, lastday); // eslint-disable-next-line
  }, []);

  const [dashboardData, setDashboardData] = useState();
  const [value, setValue] = useState(0);
  const [productChartData, setProductChartData] = useState();

  console.log(dashboardData?.orderData);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    switch (newValue) {
      case 0:
        var curr = new Date();
        var firstday = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 1)
        )
          .toISOString()
          .substring(0, 10);
        var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 8))
          .toISOString()
          .substring(0, 10);
        getDashboardData(firstday, lastday, newValue);
        break;
      case 1:
        var date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        var firstDay = new Date(y, m, 2).toISOString().substring(0, 10);
        var lastDay = new Date(y, m + 1, 2).toISOString().substring(0, 10);
        getDashboardData(firstDay, lastDay, newValue);
        break;
      case 2:
        var currentYear = new Date().getFullYear();

        var firstDay = new Date(currentYear, 0, 2)
          .toISOString()
          .substring(0, 10);

        var lastDay = new Date(currentYear + 1, 0, 2)
          .toISOString()
          .substring(0, 10);
        getDashboardData(firstDay, lastDay, newValue);
        break;
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
    labels: productChartData?.map((data) => data.createdAt),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: productChartData?.map((data) => data.totalPrice.toFixed(2)),
        borderColor: "rgb(26, 26, 64)",
        backgroundColor: "rgba(26, 26, 64,0.2)",
      },
    ],
  };

  const getDashboardData = async (startDate, endDate, newValue) => {
    try {
      const body = { startDate: startDate, endDate: endDate };
      const response = await dashboardDataHandler(body);
      if (response.length !== 0) {
        setDashboardData(response.data[0]);

        var obj = response?.data[0].orderData;
        var holder = {};
        let currDate = new Date();
        let week = [];
        let weeks = [];
        obj.forEach(function (d) {
          if (holder.hasOwnProperty(d.createdAt.substring(8, 10))) {
            holder[d.createdAt.substring(8, 10)] =
              holder[d.createdAt.substring(8, 10)] + d.totalPrice;
          } else {
            holder[d.createdAt.substring(8, 10)] = d.totalPrice;
          }
        });
        for (var prop in holder) {
          week.push({ createdAt: prop, totalPrice: holder[prop] });
        }

        for (let i = 1; i <= 7; i++) {
          let first = currDate.getDate() - currDate.getDay() + i;
          let day = new Date(currDate.setDate(first))
            .toISOString()
            .slice(8, 10);
          week.push({ createdAt: day, totalPrice: 0 });
        }

        var weekholders = {};

        week.forEach(function (d) {
          if (weekholders.hasOwnProperty(d.createdAt.substring(0, 10))) {
            weekholders[d.createdAt.substring(0, 10)] =
              weekholders[d.createdAt.substring(0, 10)] + d.totalPrice;
          } else {
            weekholders[d.createdAt.substring(0, 10)] = d.totalPrice;
          }
        });
        for (var prop in weekholders) {
          weeks.push({ createdAt: prop, totalPrice: weekholders[prop] });
        }

        var dt = new Date();
        let months = [];
        let monthss = [];
        let daysInMonth = new Date(
          dt.getFullYear(),
          dt.getMonth() + 1,
          0
        ).getDate();
        for (var prop in holder) {
          months.push({ createdAt: prop, totalPrice: holder[prop] });
        }

        for (let i = 1; i <= daysInMonth; i++) {
          months.push({ createdAt: `${i}`, totalPrice: 0 });
        }
        var monthsholders = {};
        months.forEach(function (d) {
          if (monthsholders.hasOwnProperty(d.createdAt.substring(0, 10))) {
            monthsholders[d.createdAt.substring(0, 10)] =
              monthsholders[d.createdAt.substring(0, 10)] + d.totalPrice;
          } else {
            monthsholders[d.createdAt.substring(0, 10)] = d.totalPrice;
          }
        });
        for (var prop in monthsholders) {
          monthss.push({ createdAt: prop, totalPrice: monthsholders[prop] });
        }

        let year = [];

        var yearholder = {};
        obj.forEach(function (d) {
          if (yearholder.hasOwnProperty(d.createdAt.substring(5, 7))) {
            yearholder[d.createdAt.substring(5, 7)] =
              yearholder[d.createdAt.substring(5, 7)] + d.totalPrice;
          } else {
            yearholder[d.createdAt.substring(5, 7)] = d.totalPrice;
          }
        });
        for (var prop in yearholder) {
          year.push({ createdAt: prop, totalPrice: yearholder[prop] });
        }

        for (let i = 1; i <= 12; i++) {
          year.push({
            createdAt: `${String(i).padStart(2, "0")}`,
            totalPrice: 0,
          });
        }
        var yearholders = {};
        year.forEach(function (d) {
          if (yearholders.hasOwnProperty(d.createdAt.substring(5, 7))) {
            yearholders[d.createdAt.substring(5, 7)] =
              yearholders[d.createdAt.substring(5, 7)] + d.totalPrice;
          } else {
            yearholders[d.createdAt.substring(5, 7)] = d.totalPrice;
          }
        });
        var years = Object.values(
          year.reduce((r, o) => {
            r[o.createdAt] = r[o.createdAt] || {
              createdAt: o.createdAt,
              totalPrice: 0,
            };
            r[o.createdAt].totalPrice += +o.totalPrice;
            return r;
          }, {})
        );
        var newYear = years.sort((a, b) => {
          return a.createdAt - b.createdAt;
        });
        console.log(newYear);

        switch (newValue ? newValue : 0) {
          case 0:
            setProductChartData(weeks);
            break;
          case 1:
            setProductChartData(monthss);
            break;
          case 2:
            setProductChartData(years);
            break;
        }
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
