import { React, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
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
import moment from "moment";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Button } from "@mui/material";
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
    nFormatter(244444444);
    var startDate = moment().clone().startOf("week").format("YYYY-MM-DD");
    var endDate = moment().clone().endOf("week").format("YYYY-MM-DD");
    getDashboardData(startDate, endDate); // eslint-disable-next-line
  }, []);

  const [dashboardData, setDashboardData] = useState();
  const [value, setValue] = useState(0);
  const [productChartData, setProductChartData] = useState();
  const [customStatdate, setCustomStartDate] = useState(null);
  const [customEnddate, setCustomEndDate] = useState(null);
  const [customArea, setCustomArea] = useState(false);
  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    console.log("NUM", num);
    return num;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue); // eslint-disable-next-line
    switch (newValue) {
      case 0:
        setCustomArea(false);
        setCustomStartDate(null);
        setCustomEndDate(null);
        var startDate = moment().clone().startOf("week").format("YYYY-MM-DD");
        var endDate = moment().clone().endOf("week").format("YYYY-MM-DD");
        getDashboardData(startDate, endDate, newValue);
        break;
      case 1:
        setCustomArea(false);
        setCustomStartDate(null);
        setCustomEndDate(null);
        var startOfMonth = moment()
          .clone()
          .startOf("month")
          .format("YYYY-MM-DD");
        var endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");
        getDashboardData(startOfMonth, endOfMonth, newValue);
        break;
      case 2:
        setCustomArea(false);
        setCustomStartDate(null);
        setCustomEndDate(null);
        var startOfYear = moment().clone().startOf("year").format("YYYY-MM-DD");
        var endOfYear = moment().clone().endOf("year").format("YYYY-MM-DD");

        getDashboardData(startOfYear, endOfYear, newValue);

        break;
      case 3:
        setCustomArea(true);
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
        formatter: function (value) {
          var num = nFormatter(value);
          return num;
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
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join(",");
            return value;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(",");
                return value;
              },
            },
          },
        ],
      },
    },
  };
  const datas = {
    labels: productChartData?.map((data) => data.createdAt),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: productChartData?.map((data) => data.totalPrice),
        borderColor: "rgb(26, 26, 64)",
        backgroundColor: "rgba(26, 26, 64,0.2)",
      },
    ],
  };
  const getDateHandler = () => {
    if (customEnddate !== null) {
      var startDate = moment(customStatdate).format("YYYY-MM-DD");
      var endDate = moment(customEnddate).format("YYYY-MM-DD");
      getDashboardData(startDate, endDate, 3);
    }
  };

  const getDashboardData = async (startDate, endDate, newValue) => {
    try {
      const body = { startDate: startDate, endDate: endDate };
      const response = await dashboardDataHandler(body);
      if (response.length !== 0) {
        setDashboardData(response.data[0]); // eslint-disable-next-line
        switch (newValue ? newValue : 0) {
          case 0:
            getWeekData(response.data[0].orderData);

            break;
          case 1:
            getMonthsData(response.data[0].orderData);
            break;
          case 2:
            getYearData(response.data[0].orderData);
            break;
          case 3:
            customDateData(response.data[0].orderData);
            break;
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  const getWeekData = (data) => {
    var holder = {};
    let week = [];
    data.forEach(function (d) {
      if (holder.hasOwnProperty(moment(d.createdAt).format("DD"))) {
        holder[moment(d.createdAt).format("DD")] =
          holder[moment(d.createdAt).format("DD")] + d.totalPrice;
      } else {
        holder[moment(d.createdAt).format("DD")] = d.totalPrice;
      }
    });

    for (var date in holder) {
      week.push({ createdAt: date, totalPrice: holder[date].toFixed(2) });
    }
    [...Array(7)].map((_, i) => {
      let first = new Date().getDate() - new Date().getDay() + i + 1;
      return week.push({ createdAt: first, totalPrice: 0 });
    });

    var weeks = Object.values(
      week.reduce((r, o) => {
        r[o.createdAt] = r[o.createdAt] || {
          createdAt: o.createdAt,
          totalPrice: 0,
        };
        r[o.createdAt].totalPrice += +o.totalPrice;
        return r;
      }, {})
    );
    setProductChartData(weeks);
  };

  const getYearData = (data) => {
    let year = [];
    var yearholder = {};
    data.forEach(function (d) {
      if (yearholder.hasOwnProperty(moment(d.createdAt).format("MM"))) {
        yearholder[moment(d.createdAt).format("MM")] =
          yearholder[moment(d.createdAt).format("MM")] + d.totalPrice;
      } else {
        yearholder[moment(d.createdAt).format("MM")] = d.totalPrice;
      }
    });

    for (var date in yearholder) {
      year.push({ createdAt: date, totalPrice: yearholder[date] });
    }

    [...Array(12)].map((_, i) =>
      year.push({
        createdAt: `${String(i + 1).padStart(2, "0")}`,
        totalPrice: 0,
      })
    );
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
    setProductChartData(newYear);
  };
  const customDateData = (data) => {
    let customDate = [];
    var customDateHolder = {};
    data.forEach(function (d) {
      if (
        customDateHolder.hasOwnProperty(
          moment(d.createdAt).format("DD-MM-YYYY")
        )
      ) {
        customDateHolder[moment(d.createdAt).format("DD-MM-YYYY")] =
          customDateHolder[moment(d.createdAt).format("DD-MM-YYYY")] +
          d.totalPrice;
      } else {
        customDateHolder[moment(d.createdAt).format("DD-MM-YYYY")] =
          d.totalPrice;
      }
    });
    for (var date in customDateHolder) {
      customDate.push({
        createdAt: date,
        totalPrice: customDateHolder[date].toFixed(2),
      });
    }
    setProductChartData(customDate);
  };
  const getMonthsData = (data) => {
    let months = [];
    var monthsHolder = {};
    data.forEach(function (d) {
      if (monthsHolder.hasOwnProperty(moment(d.createdAt).format("DD"))) {
        monthsHolder[moment(d.createdAt).format("DD")] =
          monthsHolder[moment(d.createdAt).format("DD")] + d.totalPrice;
      } else {
        monthsHolder[moment(d.createdAt).format("DD")] = d.totalPrice;
      }
    });
    for (var date in monthsHolder) {
      months.push({
        createdAt: date,
        totalPrice: monthsHolder[date].toFixed(2),
      });
    }
    [...Array(moment().daysInMonth())].map((_, i) =>
      months.push({
        createdAt: `${String(i + 1).padStart(2, "0")}`,
        totalPrice: 0,
      })
    );
    var monthss = Object.values(
      months.reduce((r, o) => {
        r[o.createdAt] = r[o.createdAt] || {
          createdAt: o.createdAt,
          totalPrice: 0,
        };
        r[o.createdAt].totalPrice += +o.totalPrice;
        return r;
      }, {})
    );

    var newMonths = monthss.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    setProductChartData(newMonths);
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
                {customArea ? (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                            value={customStatdate}
                            onChange={(newValue) => {
                              setCustomStartDate(newValue.$d);
                            }}
                            renderInput={(params) => (
                              <TextField size="small" {...params} />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="End Date"
                            value={customEnddate}
                            onChange={(newValue) => {
                              setCustomEndDate(newValue.$d);
                            }}
                            renderInput={(params) => (
                              <TextField size="small" {...params} />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          onClick={() => getDateHandler()}
                        >
                          OK
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                <ProductChartSize options={options} data={datas} />
              </CardContent>
            </CardFrist>
          </Grid>
        </ContainerTwo>
      </MainBody>
    </>
  );
}
